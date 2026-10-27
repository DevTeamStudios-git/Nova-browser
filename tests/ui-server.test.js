const {test} = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const http = require('node:http');
const {startUIServer} = require('../ui-server');

test('UI server provides a loopback origin and serves only public UI assets', async () => {
  const ui = await startUIServer(path.join(__dirname, '..'), 0);
  try {
    assert.match(ui.origin, /^http:\/\/localhost:\d+$/);
    const page = await fetch(ui.origin + '/index.html');
    assert.equal(page.status, 200);
    assert.match(await page.text(), /Nova Browser/);
    assert.equal((await fetch(ui.origin + '/i18n.js')).status, 200);
    for (const file of ['main.js','preload.js','package.json','../main.js','storage-migration.html']) {
      assert.equal((await fetch(ui.origin + '/' + file)).status, 404);
    }
    assert.equal((await fetch(ui.origin, {method:'POST'})).status, 405);
    const badHostStatus = await new Promise((resolve, reject) => {
      http.get(ui.origin, {headers:{Host:'evil.example'}}, response => {
        response.resume(); resolve(response.statusCode);
      }).on('error', reject);
    });
    assert.equal(badHostStatus, 403);
  } finally { ui.close(); }
});
