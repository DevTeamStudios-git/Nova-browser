const { app, BrowserWindow, ipcMain, net } = require('electron');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const http = require('node:http');
const Module = require('node:module');
const root = path.resolve(__dirname, '..');
process.on('uncaughtException', error => { console.error(error); app.exit(1); });
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'nova-render-test-'));
app.setPath('userData', profile);
app.commandLine.appendSwitch('disable-gpu');
let server;
const timer = setTimeout(() => { console.error('Rendering smoke test timed out'); app.exit(1); }, 70000);
const delay = ms => new Promise(r => setTimeout(r, ms));
async function until(predicate) {
  for (let i = 0; i < 200; i++) {
    if (await predicate()) return;
    await delay(100);
  }
  throw Error('Timed out waiting for browser state');
}
const source = fs.readFileSync(path.join(root, 'main.js'), 'utf8');
const main = new Module(path.join(root, 'main.js'), module);
main.filename = path.join(root, 'main.js');
main.paths = Module._nodeModulePaths(root);
main._compile(source + '\nmodule.exports = { windowContexts, createWindow, readLegacyPreferences, createView, showView, getContentBounds, CHROME_UA };', main.filename);
const api = main.exports;

app.whenReady().then(async () => {
  // Keep the fixture independent of network availability and third-party SDKs.
  await until(() => api.windowContexts.size > 0);
  const ctx = [...api.windowContexts.values()][0];
  const win = ctx.mainWindow;
  const rendererErrors = [];
  win.webContents.on('console-message', (_event, level, message, line, source) => {
    if (level >= 3 && message.includes('Uncaught')) rendererErrors.push(`${message} at ${source}:${line}`);
  });
  await until(() => !win.webContents.isLoading());
  await until(() => win.webContents.executeJavaScript('typeof addTab === "function"'));
  assert.ok(win.webContents.getURL().endsWith('/index.html'));
  const origin = await win.webContents.executeJavaScript('({origin:location.origin,secure:isSecureContext})');
  assert.match(origin.origin, /^http:\/\/localhost:\d+$/);
  assert.equal(origin.secure, true, 'sign-in must run on a secure loopback origin');
  assert.equal(await win.webContents.executeJavaScript('!!window.novaBridge'), true);
  assert.ok(await win.webContents.executeJavaScript('tabs.length > 0'), 'startup initialization creates a tab');
  if (process.env.NOVA_LIVE_AUTH_CHECK === '1') {
    // Optional manual check: open the real providers' sign-in pages, then cancel.
    // Never supplies credentials or completes account authentication.
    await win.webContents.executeJavaScript('(async () => { await _loadPuter(); return true; })()');
    let popup;
    win.webContents.once('did-create-window', child => { popup = child; });
    await win.webContents.executeJavaScript("document.getElementById('ai-model-sel').value='puter-gpt4o';_refreshPuterSignIn();document.getElementById('ai-puter-signin').click();void 0");
    await until(() => popup && !popup.isDestroyed() && popup.webContents.getURL().startsWith('https:'));
    console.log('LIVE PASS: Puter accepted the loopback origin and opened its sign-in window at ' + new URL(popup.webContents.getURL()).hostname);
    popup.destroy();
    popup = null;
    win.webContents.once('did-create-window', child => { popup = child; });
    await win.webContents.executeJavaScript('showAuthModal();signInGoogle();void 0');
    await until(() => popup && !popup.isDestroyed() && popup.webContents.getURL().startsWith('https:'));
    console.log('LIVE PASS: Firebase SDK opened its Google sign-in window at ' + new URL(popup.webContents.getURL()).hostname);
    await delay(1500);
    if (!popup.isDestroyed()) {
      const text = await popup.webContents.executeJavaScript('document.body?.innerText || ""');
      assert.doesNotMatch(text, /The requested action is invalid/i);
      popup.destroy();
    }
    clearTimeout(timer);
    BrowserWindow.getAllWindows().forEach(window => window.destroy());
    app.exit(0); return;
  }
  const send = (channel, data) => ipcMain.emit(channel, { sender: win.webContents }, data);
  server = http.createServer((req, res) => {
    if (req.url === '/broken-frame') { req.socket.destroy(); return; }
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    res.setHeader('Content-Type', 'text/html');
    res.end(`<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1"><title>Layout fixture</title>
      <style>body{margin:0}.grid{display:grid;grid-template-columns:1fr 1fr}.flex{display:flex}.flex div{width:50%}.fixed{position:fixed;right:0;bottom:0}</style>
      <main><div class="grid"><div>A</div><div>B</div></div><div class="flex"><div>C</div><div>D</div></div><input type="text"><select><option>Option</option></select><div class="fixed">Fixed</div><iframe src="/broken-frame"></iframe></main>`);
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const url = `http://127.0.0.1:${server.address().port}/`;
  await win.webContents.executeJavaScript(`addTab(${JSON.stringify(url)})`);
  await until(() => ctx.activeViewId && ctx.views.get(ctx.activeViewId));
  const view = ctx.views.get(ctx.activeViewId);
  const preferences = view.webContents.getLastWebPreferences();
  assert.equal(preferences.contextIsolation, true);
  assert.equal(preferences.webSecurity, true);
  assert.equal(preferences.sandbox, true);
  await until(() => !view.webContents.isLoading());
  send('overlay-hide');
  await delay(300);
  const metrics = await view.webContents.executeJavaScript(`(() => ({
    title:document.title, width:innerWidth, height:innerHeight,
    grid:document.querySelector('.grid').children[0].getBoundingClientRect().width,
    flex:document.querySelector('.flex').children[0].getBoundingClientRect().width,
    isolated:crossOriginIsolated, nativeConfirm:confirm.toString().includes('[native code]'),
    ua:navigator.userAgent, fixed:document.querySelector('.fixed').getBoundingClientRect().right
  }))()`);
  assert.equal(metrics.title, 'Layout fixture', 'failed iframe must leave its parent intact');
  assert.equal(metrics.width, view.getBounds().width);
  assert.ok(Math.abs(metrics.height - view.getBounds().height) <= 1, 'viewport height matches native bounds within DIP rounding');
  assert.equal(metrics.grid, metrics.width / 2);
  assert.equal(metrics.flex, metrics.width / 2);
  assert.ok(Math.abs(metrics.fixed - metrics.width) < 0.01);
  assert.equal(metrics.isolated, true, 'COOP and COEP must be preserved');
  assert.equal(metrics.nativeConfirm, true);
  assert.match(metrics.ua, new RegExp(`Chrome/${process.versions.chrome.replaceAll('.', '\\.')}`));
  assert.doesNotMatch(metrics.ua, /Electron/);
  view.webContents.emit('did-navigate-in-page', {}, url + '#iframe-navigation', false);
  await delay(100);
  assert.equal(await win.webContents.executeJavaScript('curTab().url'), url, 'iframe navigation must not change the address bar');
  console.log('PASS: real Chromium grid, flex, controls, fixed positioning, failed iframe, isolation and native dialogs');

  send('set-zoom', { tabId: ctx.activeViewId, factor: 1.25 });
  assert.equal(view.webContents.getZoomFactor(), 1.25);
  send('set-zoom', { tabId: ctx.activeViewId, zoom: 90 });
  assert.equal(view.webContents.getZoomFactor(), 0.9);
  send('set-zoom', { tabId: ctx.activeViewId, factor: NaN });
  assert.equal(view.webContents.getZoomFactor(), 0.9);
  send('set-zoom', { tabId: ctx.activeViewId, factor: 1 });
  await win.webContents.executeJavaScript(`document.getElementById('sp-default-zoom').value='125';document.getElementById('sp-default-zoom').dispatchEvent(new Event('change'))`);
  await until(() => view.webContents.getZoomFactor() === 1.25);
  assert.equal(await win.webContents.executeJavaScript(`document.getElementById('sp-default-zoom-accessibility').value`), '125');
  await win.webContents.executeJavaScript(`applyDefaultZoom(100, true)`);
  await until(() => view.webContents.getZoomFactor() === 1);
  console.log('PASS: percentage/factor zoom, invalid zoom rejection and settings synchronization');

  const beforePopup = view.getBounds();
  const beforeViewport = await view.webContents.executeJavaScript('({width:innerWidth,height:innerHeight,scroll:scrollY})');
  await win.webContents.executeJavaScript("document.getElementById('privbtn').click()");
  await until(() => ctx._popupOpen && win.getBrowserViews().length === 0);
  assert.deepEqual(view.getBounds(), beforePopup, 'Privacy Dashboard must not push or shrink the web page');
  assert.deepEqual(await view.webContents.executeJavaScript('({width:innerWidth,height:innerHeight,scroll:scrollY})'), beforeViewport);
  const popup = await win.webContents.executeJavaScript(`(() => {
    const image = document.querySelector('#browser-popup-frame img');
    const rect = image.getBoundingClientRect();
    return {x:rect.x,y:rect.y,width:rect.width,height:rect.height,painted:image.complete && image.naturalWidth > 0,
      panelVisible:document.getElementById('privpanel').classList.contains('show'),
      bodyColor:getComputedStyle(document.body).color};
  })()`);
  assert.equal(popup.painted, true);
  assert.equal(popup.panelVisible, true);
  assert.equal(popup.x, beforePopup.x);
  assert.equal(popup.y, beforePopup.y);
  assert.equal(popup.width, beforePopup.width);
  assert.equal(popup.height, beforePopup.height);
  assert.notEqual(popup.bodyColor, 'rgb(0, 0, 0)');
  const output = path.join(root, 'tests', 'output');
  fs.mkdirSync(output, {recursive:true});
  fs.writeFileSync(path.join(output, 'privacy-popup.png'), (await win.webContents.capturePage()).toPNG());
  await win.webContents.executeJavaScript("document.querySelector('#browser-popup-frame img').click()");
  await until(() => !ctx._popupOpen && win.getBrowserViews().includes(view));
  assert.deepEqual(view.getBounds(), beforePopup);
  await until(() => win.webContents.executeJavaScript("!document.querySelector('#browser-popup-frame img')"));
  // Exercise both capture cancellation and switching directly between toolbar panels.
  await win.webContents.executeJavaScript("document.getElementById('privbtn').click();closePanels()");
  await delay(150);
  assert.ok(win.getBrowserViews().includes(view));
  await win.webContents.executeJavaScript("document.getElementById('privbtn').click()");
  await until(() => ctx._popupOpen && win.getBrowserViews().length === 0);
  await win.webContents.executeJavaScript("document.getElementById('histbtn').click()");
  await delay(150);
  assert.deepEqual(view.getBounds(), beforePopup);
  await win.webContents.executeJavaScript('closePanels()');
  await until(() => !ctx._popupOpen && win.getBrowserViews().includes(view));
  console.log('PASS: actual Privacy Dashboard open/close, painted page preview, stable viewport, outside click and panel switching');

  await win.webContents.executeJavaScript("openSettings('general')");
  await until(() => ctx._overlayOpen && win.getBrowserViews().length === 0);
  send('overlay-hide'); // An unrelated dialog must not uncover Settings.
  api.showView(ctx, ctx.activeViewId);
  assert.equal(win.getBrowserViews().length, 0, 'Settings owns page visibility until it closes');
  await win.webContents.executeJavaScript('openAI();closeAI()');
  await delay(250);
  assert.equal(win.getBrowserViews().length, 0, 'closing the AI sidebar must not uncover Settings');
  fs.writeFileSync(path.join(output, 'settings.png'), (await win.webContents.capturePage()).toPNG());
  await win.webContents.executeJavaScript('closeSettings();openAI()');
  await until(() => win.getBrowserViews().includes(view) && view.getBounds().width === win.getContentSize()[0] - 360);
  assert.equal(ctx._overlayOpen, false);

  const originalFetch = net.fetch;
  const aiRequests = [];
  let aiStatus = 200;
  net.fetch = async (url, options) => {
    aiRequests.push({url,options,body:JSON.parse(options.body)});
    const data = aiStatus !== 200 ? {error:{message:'Synthetic provider rejection'}} :
      url.includes('anthropic.com') ? {content:[{text:'**Transport verified**'}]} :
      url.includes('googleapis.com') ? {candidates:[{content:{parts:[{text:'**Transport verified**'}]}}]} :
      {choices:[{message:{content:'**Transport verified**'}}]};
    return {ok:aiStatus === 200,status:aiStatus,json:async () => data};
  };
  await win.webContents.executeJavaScript(`(async () => {
    for (const provider of ['groq','anthropic','openai','google','openrouter','together']) {
      localStorage.setItem('novaAIKey_' + provider, await bridge.encryptKey('test-only-' + provider));
    }
    localStorage.setItem('novaAIModel_together','test-only-model');
    await _restoreAIKeyInputs();
  })()`);
  for (const provider of ['groq','anthropic','openai','google','openrouter','together','together-free']) {
    const reply = await win.webContents.executeJavaScript(`_aiCallProvider(${JSON.stringify(provider)}, [{role:'system',content:'Be helpful'},{role:'user',content:'Hello'}])`);
    assert.equal(reply, '**Transport verified**');
    const req = aiRequests.at(-1);
    const keyProvider = provider === 'together-free' ? 'together' : provider;
    if (provider === 'google') assert.ok(req.url.includes('key=test-only-google'));
    else if (provider === 'anthropic') {
      assert.equal(req.options.headers['x-api-key'], 'test-only-anthropic');
      assert.equal(req.body.system, 'Be helpful');
      assert.equal(req.body.messages[0].role, 'user');
    } else assert.equal(req.options.headers.Authorization, 'Bearer test-only-' + keyProvider);
    if (keyProvider === 'together') assert.ok(req.url.includes('api.together.xyz'), 'Together must not route to Groq');
  }
  assert.equal(await win.webContents.executeJavaScript("document.getElementById('ai-key-openai').value"), 'test-only-openai');
  await win.webContents.executeJavaScript("openSettings('ai');document.getElementById('ai-key-openai').value='test-only-openai';document.getElementById('ai-key-openai').parentElement.querySelector('button').click()");
  await until(() => win.webContents.executeJavaScript("document.getElementById('nova-dialog-overlay').classList.contains('show')"));
  assert.equal(await win.webContents.executeJavaScript("getAIKey('openai')"), 'test-only-openai');
  await win.webContents.executeJavaScript("document.querySelector('#nova-dialog-overlay .ndlg-btn.primary').click()");
  await delay(100);
  assert.equal(win.getBrowserViews().length, 0, 'dismissing the key-saved dialog must keep Settings above the page');
  await win.webContents.executeJavaScript('closeSettings()');
  await until(() => win.getBrowserViews().includes(view));
  const beforeSend = aiRequests.length;
  await win.webContents.executeJavaScript(`document.getElementById('ai-model-sel').value='openai';document.getElementById('ai-input').value='Test the Send button';document.getElementById('ai-send-btn').click()`);
  await until(() => win.webContents.executeJavaScript('!_aiTyping'));
  assert.equal(aiRequests.length, beforeSend + 1, 'one click sends one provider request');
  assert.equal(await win.webContents.executeJavaScript("document.querySelectorAll('#ai-messages .ai-msg-wrap.user').length"), 1);
  assert.equal(await win.webContents.executeJavaScript("document.querySelector('#ai-messages .ai-msg-wrap.assistant strong')?.textContent"), 'Transport verified');
  aiStatus = 401;
  await win.webContents.executeJavaScript("document.getElementById('ai-input').value='Fail cleanly';aiSend()");
  assert.equal(await win.webContents.executeJavaScript("document.getElementById('ai-send-btn').disabled"), false);
  assert.match(await win.webContents.executeJavaScript("document.querySelector('#ai-messages .ai-msg.error').textContent"), /Synthetic provider rejection/);
  await win.webContents.executeJavaScript("localStorage.removeItem('novaAIKey_openai');document.getElementById('ai-input').value='Missing key';aiSend()");
  assert.match(await win.webContents.executeJavaScript("[...document.querySelectorAll('#ai-messages .ai-msg.error')].at(-1).textContent"), /No OpenAI API key/);
  await win.webContents.executeJavaScript(`(() => {
    let signedIn = false;
    window.puter = {auth:{isSignedIn:() => signedIn,signIn:async () => { signedIn = true; }},
      ai:{chat:async (messages) => {window.testPuterMessages=messages;return {message:{content:[{text:'Puter transport verified'}]}};}}};
    document.getElementById('ai-model-sel').value='puter-gpt4o';
    document.getElementById('ai-model-sel').dispatchEvent(new Event('change'));
  })()`);
  assert.equal(await win.webContents.executeJavaScript("document.getElementById('ai-puter-signin').hidden"), false);
  const noSignIn = await win.webContents.executeJavaScript("_aiCallProvider('puter-gpt4o',[{role:'user',content:'Hello'}]).catch(e => e.message)");
  assert.match(noSignIn, /Sign in to Puter/);
  await win.webContents.executeJavaScript("document.getElementById('ai-puter-signin').click()");
  await until(() => win.webContents.executeJavaScript("!document.getElementById('ai-puter-signin').disabled"));
  assert.equal(await win.webContents.executeJavaScript("_aiCallProvider('puter-gpt4o',[{role:'system',content:'Instructions'},{role:'user',content:'Question'},{role:'assistant',content:'Previous answer'},{role:'user',content:'Follow-up'}])"), 'Puter transport verified');
  assert.equal(await win.webContents.executeJavaScript('window.testPuterMessages.length'), 4, 'Puter must receive conversation history');
  await win.webContents.executeJavaScript("document.getElementById('ai-model-sel').value='groq-free';document.getElementById('ai-model-sel').dispatchEvent(new Event('change'))");
  net.fetch = originalFetch;
  await win.webContents.executeJavaScript('closeAI()');
  await until(() => view.getBounds().width === win.getContentSize()[0]);
  console.log('PASS: Settings visibility ownership, live AI sidebar, encrypted keys, all keyed providers, single Send handler and actionable failures (mocked API)');

  const beforeOverlay = view.getBounds();
  send('overlay-show');
  assert.equal(win.getBrowserViews().length, 0);
  assert.deepEqual(view.getBounds(), beforeOverlay, 'overlay must not resize the document');
  api.showView(ctx, ctx.activeViewId);
  assert.equal(win.getBrowserViews().length, 0, 'tab selection must respect overlays');
  send('overlay-hide');
  assert.ok(win.getBrowserViews().includes(view));
  await win.webContents.executeJavaScript('applyVerticalTabs(true)');
  await until(() => view.getBounds().x === 220);
  let chrome = await win.webContents.executeJavaScript(`({left:document.getElementById('navbar').getBoundingClientRect().left,bottom:document.getElementById('navbar').getBoundingClientRect().bottom})`);
  assert.equal(view.getBounds().x, chrome.left);
  assert.ok(view.getBounds().y >= chrome.bottom);
  await win.webContents.executeJavaScript(`document.body.classList.add('compact');sendChromeHeight()`);
  await delay(150);
  chrome = await win.webContents.executeJavaScript(`({bottom:document.getElementById('navbar').getBoundingClientRect().bottom})`);
  assert.equal(view.getBounds().y, Math.ceil(chrome.bottom));
  send('resize-sidebar', { sidebarWidth: 380 });
  const secondary = api.createView(ctx, 999, url);
  send('split-open', { primaryTabId: ctx.activeViewId, secondaryTabId: 999 });
  const left = view.getBounds(), right = secondary.getBounds();
  assert.equal(left.x, 220);
  assert.equal(left.x + left.width + 4, right.x);
  assert.equal(right.x + right.width, win.getContentSize()[0] - 380);
  send('overlay-show');
  send('split-divider-drag', { ratio: 0.7 });
  assert.equal(win.getBrowserViews().length, 0);
  send('overlay-hide');
  assert.equal(win.getBrowserViews().length, 2);
  send('split-close');
  assert.equal(win.getBrowserViews().length, 1);
  send('resize-sidebar', { sidebarWidth: 0 });
  await win.webContents.executeJavaScript('applyVerticalTabs(false)');
  await until(() => view.getBounds().x === 0);
  win.setSize(1050, 700);
  await delay(250);
  assert.equal(view.getBounds().width, win.getContentSize()[0]);
  ctx.splitActive = true;
  const fakeFullscreen = { ...ctx, mainWindow: { getContentSize: () => [1050,700], isFullScreen: () => true } };
  const fl = api.getContentBounds(fakeFullscreen, 'left'), fr = api.getContentBounds(fakeFullscreen, 'right');
  assert.equal(fl.width + 4 + fr.width, 1050);
  assert.equal(fl.y, 0);
  assert.equal(fr.height, 700);
  ctx.splitActive = false;
  await win.webContents.executeJavaScript("openSettings('languages')");
  const translatedLanguageLabels = {en:'Browser Language',fr:'Langue du navigateur',es:'Idioma del navegador',de:'Browsersprache',ja:'ブラウザーの言語',pt:'Idioma do navegador'};
  for (const [language, label] of Object.entries(translatedLanguageLabels)) {
    await win.webContents.executeJavaScript(`document.getElementById('sp-browser-lang').value=${JSON.stringify(language)};document.getElementById('sp-browser-lang').dispatchEvent(new Event('change'))`);
    const translated = await win.webContents.executeJavaScript(`({language:document.documentElement.lang,stored:localStorage.getItem('novaBrowserLang'),text:document.getElementById('sp-languages').textContent})`);
    assert.equal(translated.language, language);
    assert.equal(translated.stored, language);
    assert.ok(translated.text.includes(label), `settings text translates to ${language}`);
    assert.equal(win.getBrowserViews().length, 0, 'translation must not uncover the web page');
  }
  await win.webContents.executeJavaScript("novaI18n.setLanguage('fr')");
  await delay(200);
  fs.writeFileSync(path.join(output, 'settings-fr.png'), (await win.webContents.capturePage()).toPNG());
  const translatedWindow = api.createWindow(false);
  await until(() => !translatedWindow.mainWindow.webContents.isLoading());
  assert.equal(await translatedWindow.mainWindow.webContents.executeJavaScript('document.documentElement.lang'), 'fr');
  assert.equal(await translatedWindow.mainWindow.webContents.executeJavaScript("document.getElementById('sp-browser-lang').value"), 'fr');
  translatedWindow.mainWindow.destroy();
  await win.webContents.executeJavaScript("novaI18n.setLanguage('unsupported');closeSettings()");
  assert.equal(await win.webContents.executeJavaScript('document.documentElement.lang'), 'en');
  await until(() => win.getBrowserViews().includes(view));

  const legacyWindow = new BrowserWindow({show:false,webPreferences:{nodeIntegration:false,contextIsolation:true}});
  await legacyWindow.loadFile(path.join(root, 'storage-migration.html'));
  await legacyWindow.webContents.executeJavaScript("localStorage.setItem('novaMigrationProbe','preserved')");
  assert.equal((await api.readLegacyPreferences()).novaMigrationProbe, 'preserved');
  legacyWindow.destroy();

  await win.webContents.executeJavaScript(`window.testOriginalAuth = auth;window.testOriginalFirebase = window.firebase;
    window.firebase = {auth:{GoogleAuthProvider:class {addScope(){} setCustomParameters(){}}}};
    auth = {signInWithPopup:async () => {window.testGooglePopupUsed = true;return {additionalUserInfo:{isNewUser:false}};}};
    signInGoogle();`);
  await until(() => win.webContents.executeJavaScript('window.testGooglePopupUsed === true'));
  await win.webContents.executeJavaScript("auth = window.testOriginalAuth;window.firebase = window.testOriginalFirebase;void 0");
  console.log('PASS: usable sign-in origin, legacy preference migration, Firebase SDK popup routing, six UI languages and persisted language in a new window');
  await win.webContents.executeJavaScript("navTo('nova://newtab')");
  await until(() => ctx.activeViewId === null);
  assert.equal(win.getBrowserViews().length, 0, 'new tab page must not be covered by an old web view');
  await win.webContents.executeJavaScript(`navTo(${JSON.stringify(url)})`);
  await until(() => ctx.activeViewId !== null);
  assert.equal(ctx.views.get(ctx.activeViewId), view, 'returning from the new tab page reuses the web view');
  await until(() => !view.webContents.isLoading());
  assert.deepEqual(rendererErrors, [], 'renderer must initialize and navigate without uncaught errors');
  console.log('PASS: overlays, tab selection, vertical/compact layout, sidebars, split panes, window resizing and fullscreen bounds');
  console.log('Rendering checks passed');
  clearTimeout(timer);
  server.close();
  BrowserWindow.getAllWindows().forEach(w => w.destroy());
  app.exit(0);
}).catch(error => { console.error(error); clearTimeout(timer); server?.close(); app.exit(1); });
