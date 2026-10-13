/* ui.js: interface behavior. Menu overlay and language menus. */
window.Site = window.Site || {};

Site.ui = {
  init() {
    this.menu();
    this.languageMenus();
  },

  // Menu overlay: a native <dialog>, so focus is trapped and Escape closes it.
  menu() {
    const dialog = document.getElementById("site-menu");
    const openButton = document.querySelector("[data-menu-open]");
    if (!dialog || !openButton || typeof dialog.showModal !== "function") return;

    const close = () => dialog.close();

    openButton.addEventListener("click", () => {
      dialog.showModal();
      openButton.setAttribute("aria-expanded", "true");
    });

    dialog.addEventListener("close", () => {
      openButton.setAttribute("aria-expanded", "false");
    });

    dialog.querySelector("[data-menu-close]")?.addEventListener("click", close);

    // A click on the empty area below the sheet closes it.
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) close();
    });

    // Links to a section of the current page: close first, then scroll.
    dialog.querySelectorAll("a[href*='#']").forEach((link) => {
      link.addEventListener("click", () => {
        const url = new URL(link.href);
        if (url.pathname === location.pathname) close();
      });
    });
  },

  // Language menus: button toggles the list, Escape or a click outside closes it.
  languageMenus() {
    document.querySelectorAll("[data-lang-toggle]").forEach((toggle) => {
      const menu = document.getElementById(toggle.getAttribute("aria-controls"));
      if (!menu) return;

      const setOpen = (open) => {
        toggle.setAttribute("aria-expanded", String(open));
        menu.hidden = !open;
      };

      toggle.addEventListener("click", (e) => {
        e.stopPropagation();
        setOpen(menu.hidden);
      });

      menu.addEventListener("click", (e) => {
        if (e.target.closest("[aria-current='true']")) setOpen(false);
      });

      document.addEventListener("click", (e) => {
        if (!menu.hidden && !menu.contains(e.target)) setOpen(false);
      });

      document.addEventListener("keydown", (e) => {
        if (e.key !== "Escape" || menu.hidden) return;
        e.preventDefault();
        e.stopPropagation();
        setOpen(false);
        toggle.focus();
      }, true);
    });
  },
};
