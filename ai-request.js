const ENDPOINTS = new Map([
  ['api.groq.com', /^\/openai\/v1\/chat\/completions$/],
  ['api.openai.com', /^\/v1\/chat\/completions$/],
  ['api.anthropic.com', /^\/v1\/messages$/],
  ['generativelanguage.googleapis.com', /^\/v1beta\/models\/[\w.-]+:generateContent$/],
  ['api.together.xyz', /^\/v1\/chat\/completions$/],
  ['openrouter.ai', /^\/api\/v1\/chat\/completions$/],
]);

// Keep provider traffic in the main process: file-origin CORS rules must not
// prevent requests from the browser's own assistant.
async function requestAI(request, fetchProvider, timeoutMs = 45000) {
  const url = new URL(request.url);
  if (url.protocol !== 'https:' || url.username || url.password || url.port ||
      !ENDPOINTS.get(url.hostname)?.test(url.pathname)) {
    throw new Error('Unsupported AI provider endpoint.');
  }
  if (typeof request.body !== 'string' || request.body.length > 1_000_000) {
    throw new Error('AI request is too large or invalid.');
  }
  const headers = { 'Content-Type': 'application/json' };
  const allowedHeaders = new Set(['authorization', 'x-api-key', 'anthropic-version', 'http-referer', 'x-title']);
  for (const [name, value] of Object.entries(request.headers || {})) {
    if (allowedHeaders.has(name.toLowerCase()) && typeof value === 'string') headers[name] = value;
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetchProvider(url.href, {
      method: 'POST', headers, body: request.body, signal: controller.signal,
      credentials: 'omit', redirect: 'error',
    });
    const data = await response.json().catch(() => {
      throw new Error(`AI provider returned an invalid response (HTTP ${response.status}).`);
    });
    return { ok: response.ok, status: response.status, data };
  } catch (error) {
    if (controller.signal.aborted) throw new Error('AI request timed out. Please try again.');
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

module.exports = { requestAI };
