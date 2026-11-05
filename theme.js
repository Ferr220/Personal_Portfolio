// Loaded in <head> so the saved theme applies before the page paints.
(function () {
  var KEY = "theme";
  var COLORS = { light: "#f1f1f1", dark: "#101218" };
  var root = document.documentElement;

  function readSaved() {
    try {
      return localStorage.getItem(KEY);
    } catch (e) {
      return null;
    }
  }

  function save(theme) {
    try {
      localStorage.setItem(KEY, theme);
    } catch (e) {
      // The choice still applies until the page is closed.
    }
  }

  function initialTheme() {
    var saved = readSaved();
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function apply(theme, button) {
    root.setAttribute("data-theme", theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", COLORS[theme]);
    if (button) {
      var labels = root.lang === "es"
        ? { dark: "Cambiar a modo claro", light: "Cambiar a modo oscuro" }
        : { dark: "Switch to light mode", light: "Switch to dark mode" };
      var label = labels[theme];
      button.setAttribute("aria-label", label);
      button.title = label;
    }
  }

  apply(initialTheme());

  document.addEventListener("DOMContentLoaded", function () {
    var button = document.querySelector(".theme-toggle");
    if (!button) return;
    apply(root.getAttribute("data-theme"), button);
    document.addEventListener("langchange", function () {
      apply(root.getAttribute("data-theme"), button);
    });
    button.hidden = false;
    button.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      save(next);
      apply(next, button);
    });
  });
})();
