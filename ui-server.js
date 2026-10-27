const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');

// Serve only public UI assets, never application code, profiles or credentials.
async function startUIServer(root, port = 47531) {
  const assets = new Map([
    ['/', ['index.html', 'text/html; charset=utf-8']],
    ['/index.html', ['index.html', 'text/html; charset=utf-8']],
    ['/i18n.js', ['i18n.js', 'text/javascript; charset=utf-8']],
  ]);
  const server = http.createServer(async (request, response) => {
    const boundPort = server.address().port;
    if (![`localhost:${boundPort}`, `127.0.0.1:${boundPort}`].includes(request.headers.host)) {
      response.writeHead(403).end(); return;
    }
    if (!['GET', 'HEAD'].includes(request.method)) { response.writeHead(405).end(); return; }
    const asset = assets.get(new URL(request.url, 'http://localhost').pathname);
    if (!asset) { response.writeHead(404).end(); return; }
    try {
      const data = await fs.readFile(path.join(root, asset[0]));
      response.writeHead(200, {
        'Content-Type': asset[1], 'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff', 'X-Frame-Options': 'DENY',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      });
      response.end(request.method === 'HEAD' ? undefined : data);
    } catch { response.writeHead(500).end('Unable to load Nova interface.'); }
  });
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(port, '127.0.0.1', resolve);
  });
  server.unref();
  return {
    origin: `http://localhost:${server.address().port}`,
    close() { server.close(); server.closeAllConnections(); },
  };
}

module.exports = { startUIServer };
