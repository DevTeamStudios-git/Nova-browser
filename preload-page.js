/**
 * Web pages use Chromium's native alert, confirm and prompt implementations.
 * These methods are synchronous: asynchronous replacements return before the
 * user answers and can break forms, navigation and page state.
 * Keep this preload isolated from the page's JavaScript world.
 */
