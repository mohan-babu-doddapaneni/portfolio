/* Sets the saved / preferred colour theme before first paint so there is no
   flash of the wrong theme. External file so the strict CSP (script-src 'self')
   does not need 'unsafe-inline'. */
(function () {
  var t = null;
  try {
    t = window.localStorage.getItem("theme");
  } catch (e) {}
  if (t !== "light" && t !== "dark") {
    t = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  document.documentElement.setAttribute("data-theme", t);
})();
