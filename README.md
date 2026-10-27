# Nova Browser

Electron browser with tabs, split panes and sidebar apps.

The desktop interface uses a loopback-only HTTP server at `http://localhost:47531`
so authentication SDKs receive a usable origin. The port must be available when
Nova starts. Existing `nova*` preferences are imported once from the earlier file
origin; bookmarks and history continue using the existing profile files.

Settings → Languages switches the interface immediately between English, French,
Spanish, German, Japanese and Portuguese, and remembers the selection. Settings
labels/descriptions, core menus and tooltips are translated; web pages, user data
and AI responses keep their original language.

```powershell
npm ci
npm start
```

Run the rendering regression checks with `npm test`. They launch the installed
Electron runtime with a temporary profile and a local HTTP fixture, and cover
startup, CSS grid/flex layout, iframe failures/navigation, page isolation,
native dialogs, zoom settings, overlays, vertical tabs, compact mode, sidebars,
split panes, resizing, fullscreen bounds and New Tab navigation.

AI Assistant: select a provider under Settings → AI Assistant and save its API
key. You can override its model ID there. Together requires an explicit model ID
because its previous free model was retired. Puter uses the **Sign in to Puter**
button in the assistant instead of an API key. Provider access, quotas and billing
depend on your account.

AI regression checks use synthetic keys and mocked provider responses, covering
encrypted key save/restore, provider routing, chat submission, Puter sign-in,
errors and timeouts. They do not make billable inference requests.

Google account sign-in uses Firebase's popup SDK rather than a hand-built OAuth
URL. The Firebase project must enable Google sign-in and authorize `localhost`
under Authentication → Settings → Authorized domains (the bundled project already
lists localhost). Login completion still requires the user's provider account.

The checks use the project's Chromium engine; they do not establish compatibility
with every website or with APIs introduced in newer Chrome/Edge versions.
