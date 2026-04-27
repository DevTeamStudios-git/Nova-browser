const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('novaBridge', {
  // ── Tabs ──────────────────────────────────────────────────────────────────
  tabCreated:          d => ipcRenderer.send('tab-created',         d),
  tabSelected:         d => ipcRenderer.send('tab-selected',        d),
  tabClosed:           d => ipcRenderer.send('tab-closed',          d),
  navigate:            d => ipcRenderer.send('navigate',            d),
  goBack:              d => ipcRenderer.send('go-back',             d),
  goForward:           d => ipcRenderer.send('go-forward',          d),
  reload:              d => ipcRenderer.send('reload',              d),
  reloadHard:          d => ipcRenderer.send('reload-hard',         d),
  stopLoading:         d => ipcRenderer.send('stop-loading',        d),

  // ── Window ────────────────────────────────────────────────────────────────
  winMinimize:         () => ipcRenderer.send('win-minimize'),
  winMaximize:         () => ipcRenderer.send('win-maximize'),
  winClose:            () => ipcRenderer.send('win-close'),
  newWindow:           d  => ipcRenderer.send('new-window',         d),
  resizeView:          d  => ipcRenderer.send('resize-view',        d),
  setChromeHeight:     d  => ipcRenderer.send('set-chrome-height',  d),
  detachTab:           d  => ipcRenderer.send('detach-tab',         d),
  toggleFullscreen:    () => ipcRenderer.send('toggle-fullscreen'),
  openExternal:        d  => ipcRenderer.send('open-external',      d),

  // ── Tab features ──────────────────────────────────────────────────────────
  muteTab:             d => ipcRenderer.send('mute-tab',            d),
  screenshot:          d => ipcRenderer.send('screenshot',          d),
  readerMode:          d => ipcRenderer.send('reader-mode',         d),
  pictureInPicture:    d => ipcRenderer.send('picture-in-picture',  d),
  printPage:           d => ipcRenderer.send('print-page',          d),
  savePage:            d => ipcRenderer.send('save-page',           d),
  executeScript:       d => ipcRenderer.invoke('execute-script',    d),
  openDevTools:        d => ipcRenderer.send('open-devtools',       d),

  // ── History ───────────────────────────────────────────────────────────────
  getHistory:          () => ipcRenderer.invoke('get-history'),
  clearHistory:        () => ipcRenderer.send('clear-history'),
  deleteHistoryItem:   d  => ipcRenderer.send('delete-history-item', d),

  // ── Bookmarks ─────────────────────────────────────────────────────────────
  getBookmarks:        () => ipcRenderer.invoke('get-bookmarks'),
  addBookmark:         d  => ipcRenderer.send('add-bookmark',       d),
  removeBookmark:      d  => ipcRenderer.send('remove-bookmark',    d),

  // ── Find ──────────────────────────────────────────────────────────────────
  findInPage:          d => ipcRenderer.send('find-in-page',        d),
  stopFinding:         d => ipcRenderer.send('stop-finding',        d),

  // ── Zoom ──────────────────────────────────────────────────────────────────
  setZoom:             d => ipcRenderer.send('set-zoom',            d),

  // ── Downloads ─────────────────────────────────────────────────────────────
  openDownloadsFolder: () => ipcRenderer.send('open-downloads-folder'),
  openFile:            d  => ipcRenderer.send('open-file',          d),
  getDownloads:        () => ipcRenderer.invoke('get-downloads'),

  // ── Extensions ───────────────────────────────────────────────────────────
  pickExtensionFolder: () => ipcRenderer.invoke('pick-extension-folder'),
  loadExtension:       d  => ipcRenderer.invoke('load-extension',   d),
  removeExtension:     d  => ipcRenderer.send('remove-extension',   d),

  // ── Site info / suggestions ───────────────────────────────────────────────
  getSiteInfo:         d => ipcRenderer.invoke('get-site-info',     d),
  getSuggestions:      d => ipcRenderer.invoke('get-suggestions',   d),

  // ── Split screen ──────────────────────────────────────────────────────────
  // Shortcuts
  openLocalFile:    () => ipcRenderer.invoke('open-local-file'),
  getTaskManager:   () => ipcRenderer.invoke('get-task-manager'),
  toggleCaretBrowsing: () => ipcRenderer.send('toggle-caret-browsing'),
  // Security — safeStorage key encryption
  encryptKey:   text     => ipcRenderer.invoke('encrypt-key', text),
  decryptKey:   cipher   => ipcRenderer.invoke('decrypt-key', cipher),
  // App control
  quitApp:      ()       => ipcRenderer.send('quit-app'),
  // Settings — image + JS toggle
  setImageBlocking: d => ipcRenderer.send('set-image-blocking', d),
  setJavaScript:    d => ipcRenderer.send('set-javascript', d),
  // DoH + Privacy
  setDoh:              d => ipcRenderer.invoke('set-doh',             d),
  getDoh:              () => ipcRenderer.invoke('get-doh'),
  setHttpsOnly:        d => ipcRenderer.invoke('set-https-only',      d),
  getHttpsOnly:        () => ipcRenderer.invoke('get-https-only'),
  // Developer tools
  setThrottle:         d => ipcRenderer.invoke('set-throttle',        d),
  setDeviceEmulation:  d => ipcRenderer.invoke('set-device-emulation',d),
  // Cookie manager
  getCookies:          d => ipcRenderer.invoke('get-cookies',         d),
  deleteCookie:        d => ipcRenderer.invoke('delete-cookie',       d),
  clearCookies:        d => ipcRenderer.invoke('clear-cookies',       d),
  // Permission manager
  getSitePermissions:  d => ipcRenderer.invoke('get-site-permissions',d),
  setSitePermission:   d => ipcRenderer.invoke('set-site-permission', d),
  clearSitePermissions:d => ipcRenderer.invoke('clear-site-permissions',d),
  // Downloads
  chooseDownloadFolder: () => ipcRenderer.invoke('choose-download-folder'),
  // Passkey / WebAuthn
  passkeyCheckSupport:  () => ipcRenderer.invoke('passkey-check-support'),
  // Sidebar
  resizeSidebar:       d => ipcRenderer.send('resize-sidebar',     d),
  // Google OAuth
  openGoogleAuth:      () => ipcRenderer.invoke('open-google-auth'),
  // Overlay (hides BrowserView when dialogs/modals open)
  overlayShow:         () => ipcRenderer.send('overlay-show'),
  overlayHide:         () => ipcRenderer.send('overlay-hide'),
  // VPN
  vpnConnect:          d => ipcRenderer.invoke('vpn-connect',         d),
  vpnDisconnect:       () => ipcRenderer.invoke('vpn-disconnect'),
  vpnGetState:         () => ipcRenderer.invoke('vpn-get-state'),
  onVpnStateChanged:   cb => ipcRenderer.on('vpn-state-changed',     (e,d)=>cb(d)),
  // Panel overlay
  panelOpen:           d => ipcRenderer.send('panel-open',          d),
  panelClose:          () => ipcRenderer.send('panel-close'),
  splitOpen:           d => ipcRenderer.send('split-open',          d),
  splitClose:          d => ipcRenderer.send('split-close',         d),
  splitResize:         d => ipcRenderer.send('split-resize',        d),
  splitNavigate:       d => ipcRenderer.send('split-navigate',      d),

  // ── Tab sleep ────────────────────────────────────────────────────────────
  suspendTab:          d => ipcRenderer.send('suspend-tab',         d),
  wakeTab:             d => ipcRenderer.send('wake-tab',            d),

  // ── Listeners ─────────────────────────────────────────────────────────────
  onInit:              cb => ipcRenderer.on('init',                  (e,d)=>cb(d)),
  onTabNavigated:      cb => ipcRenderer.on('tab-navigated',         (e,d)=>cb(d)),
  onTabTitleUpdated:   cb => ipcRenderer.on('tab-title-updated',     (e,d)=>cb(d)),
  onTabFavicon:        cb => ipcRenderer.on('tab-favicon-updated',   (e,d)=>cb(d)),
  onTabLoading:        cb => ipcRenderer.on('tab-loading',           (e,d)=>cb(d)),
  onTabAudio:          cb => ipcRenderer.on('tab-audio',             (e,d)=>cb(d)),
  onTabLoadError:      cb => ipcRenderer.on('tab-load-error',        (e,d)=>cb(d)),
  onNavState:          cb => ipcRenderer.on('nav-state',             (e,d)=>cb(d)),
  onKeyboardShortcut:  cb => ipcRenderer.on('keyboard-shortcut',     (e,d)=>cb(d)),
  onHistoryUpdated:    cb => ipcRenderer.on('history-updated',       (e,d)=>cb(d)),
  onBookmarksUpdated:  cb => ipcRenderer.on('bookmarks-updated',     (e,d)=>cb(d)),
  onDownloadStarted:   cb => ipcRenderer.on('download-started',      (e,d)=>cb(d)),
  onDownloadProgress:  cb => ipcRenderer.on('download-progress',     (e,d)=>cb(d)),
  onDownloadComplete:  cb => ipcRenderer.on('download-complete',     (e,d)=>cb(d)),
  onFindResult:        cb => ipcRenderer.on('find-result',           (e,d)=>cb(d)),
  onZoomChanged:       cb => ipcRenderer.on('zoom-changed',          (e,d)=>cb(d)),
  onBlockedCount:      cb => ipcRenderer.on('blocked-count',         (e,d)=>cb(d)),
  onWinState:          cb => ipcRenderer.on('win-state',             (e,d)=>cb(d)),
  onOpenUrlNewTab:     cb => ipcRenderer.on('open-url-new-tab',      (e,d)=>cb(d)),
  onOpenUrlPrivateTab: cb => ipcRenderer.on('open-url-private-tab',  (e,d)=>cb(d)),
  onScreenshotSaved:   cb => ipcRenderer.on('screenshot-saved',      (e,d)=>cb(d)),
  onReaderModeChanged: cb => ipcRenderer.on('reader-mode-changed',   (e,d)=>cb(d)),
  onExtensionsUpdated: cb => ipcRenderer.on('extensions-updated',    (e,d)=>cb(d)),
  onFullscreenChange:  cb => ipcRenderer.on('fullscreen-change',     (e,d)=>cb(d)),
  onPermissionRequest: cb => ipcRenderer.on('permission-request',   (e,d)=>cb(d)),
  onCertificateError:  cb => ipcRenderer.on('certificate-error',    (e,d)=>cb(d)),
  onCursorChanged:     cb => ipcRenderer.on('cursor-changed',        (e,d)=>cb(d)),
  permissionResponse:  d  => ipcRenderer.send('permission-response', d),
  onDialog:            cb => ipcRenderer.on('page-dialog-show',      (e,d)=>cb(d)),
  dialogResponse:      d  => ipcRenderer.send('dialog-response',     d),

  // ── Crash recovery ──────────────────────────────────────────────────────
  getCrashSession:     () => ipcRenderer.invoke('get-crash-session'),
  clearCrashSession:   () => ipcRenderer.invoke('clear-crash-session'),

  // ── Split screen divider ─────────────────────────────────────────────────
  splitDividerDrag:    d  => ipcRenderer.send('split-divider-drag',  d),

  // ── Print ────────────────────────────────────────────────────────────────
  printPage:           () => ipcRenderer.invoke('print-page'),

  // ── Dev mode ─────────────────────────────────────────────────────────────
  getNetworkLog:       () => ipcRenderer.invoke('get-network-log'),
  clearNetworkLog:     () => ipcRenderer.invoke('clear-network-log'),
  getStorageData:      d  => ipcRenderer.invoke('get-storage-data',  d),
  setStorageData:      d  => ipcRenderer.invoke('set-storage-data',  d),
  deleteStorageItem:   d  => ipcRenderer.invoke('delete-storage-item', d),
  getMemoryStats:      () => ipcRenderer.invoke('get-memory-stats'),

  // ── Session & settings ───────────────────────────────────────────────────
  getCrashSession:     () => ipcRenderer.invoke('get-crash-session'),
  clearCrashSession:   () => ipcRenderer.invoke('clear-crash-session'),
  isDefaultBrowser:    () => ipcRenderer.invoke('is-default-browser'),
  setDefaultBrowser:   () => ipcRenderer.invoke('set-default-browser'),
  removeDefaultBrowser:() => ipcRenderer.invoke('remove-default-browser'),
  getSiteZoom:         d  => ipcRenderer.invoke('get-site-zoom',     d),
  setSiteZoom:         d  => ipcRenderer.invoke('set-site-zoom',     d),
  checkPwaInstallable: () => ipcRenderer.invoke('check-pwa-installable'),
  setFocusMode:        d  => ipcRenderer.send('set-focus-mode',      d),
  getReadingList:      () => ipcRenderer.invoke('get-reading-list'),
  addToReadingList:    d  => ipcRenderer.invoke('add-to-reading-list', d),
  removeFromReadingList:d => ipcRenderer.invoke('remove-from-reading-list', d),
  clearReadingList:    () => ipcRenderer.invoke('clear-reading-list'),
  onReadingListUpdated:cb => ipcRenderer.on('reading-list-updated',  (e,d)=>cb(d)),
  encryptKey:          d  => ipcRenderer.invoke('encrypt-key',       d),
  decryptKey:          d  => ipcRenderer.invoke('decrypt-key',       d),
  quitApp:             () => ipcRenderer.send('quit-app'),
  hardReload:          d  => ipcRenderer.invoke('hard-reload',       d),
  saveBookmarks:       d  => ipcRenderer.invoke('save-bookmarks',    d),
  onDownloadDone:      cb => ipcRenderer.on('download-done',         (e,d)=>cb(d)),
  onDownloadError:     cb => ipcRenderer.on('download-error',        (e,d)=>cb(d)),
  onNewDownload:       cb => ipcRenderer.on('new-download',          (e,d)=>cb(d)),
  onHelpMeWrite:       cb => ipcRenderer.on('help-me-write',         (e,d)=>cb(d)),
  helpMeWrite:         d  => ipcRenderer.send('help-me-write',       d),
  openLocalFile:       () => ipcRenderer.invoke('open-local-file'),
  getTaskManager:      () => ipcRenderer.invoke('get-task-manager'),
  toggleCaretBrowsing: () => ipcRenderer.send('toggle-caret-browsing'),
  setImageBlocking:    d  => ipcRenderer.send('set-image-blocking',  d),
  setJavaScript:       d  => ipcRenderer.send('set-javascript',      d),
  setDoh:              d  => ipcRenderer.invoke('set-doh',           d),
  getDoh:              () => ipcRenderer.invoke('get-doh'),
  setHttpsOnly:        d  => ipcRenderer.invoke('set-https-only',    d),
  getHttpsOnly:        () => ipcRenderer.invoke('get-https-only'),
  setThrottle:         d  => ipcRenderer.invoke('set-throttle',      d),
  setDeviceEmulation:  d  => ipcRenderer.invoke('set-device-emulation', d),
  getCookies:          d  => ipcRenderer.invoke('get-cookies',       d),
  deleteCookie:        d  => ipcRenderer.invoke('delete-cookie',     d),
  clearCookies:        d  => ipcRenderer.invoke('clear-cookies',     d),
  getSitePermissions:  d  => ipcRenderer.invoke('get-site-permissions', d),
  setSitePermission:   d  => ipcRenderer.invoke('set-site-permission', d),
  clearSitePermissions:d  => ipcRenderer.invoke('clear-site-permissions', d),
  chooseDownloadFolder:() => ipcRenderer.invoke('choose-download-folder'),
  passkeyCheckSupport: () => ipcRenderer.invoke('passkey-check-support'),
});
