/* main.js: starts every part of the site. Load this file last. */
window.Site = window.Site || {};

document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
  Site.ui?.init();
  Site.motion?.init();
});
