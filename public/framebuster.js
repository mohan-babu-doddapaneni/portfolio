/* Anti-clickjacking frame-buster.
   GitHub Pages can't send X-Frame-Options / CSP frame-ancestors HTTP headers,
   so this same-origin script (allowed by "script-src 'self'") refuses to run
   inside a frame it doesn't own. Loaded early in <head> for fast protection. */
(function () {
  if (window.top !== window.self) {
    try {
      window.top.location = window.self.location;
    } catch (e) {
      // Cross-origin parent blocks the redirect — hide content as a fallback.
      document.documentElement.style.display = "none";
      window.addEventListener("DOMContentLoaded", function () {
        document.body.innerHTML = "";
      });
    }
  }
})();
