/* motion.js: scroll reveals.

   Elements marked data-reveal fade up once when they enter the viewport.
   Siblings inside a [data-reveal-group] get a short stagger.
   Everything else in the motion plan is pure CSS (assets/css/motion.css).

   If this file fails to load, the "motion-ready" class is never added and
   all content stays visible. */
window.Site = window.Site || {};

Site.motion = {
  init() {
    if (!("IntersectionObserver" in window)) return;
    const items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;

    this.stagger();
    document.documentElement.classList.add("motion-ready");
    this.observe(items);
  },

  // Children of a reveal group enter one after another, 70ms apart.
  stagger() {
    document.querySelectorAll("[data-reveal-group]").forEach((group) => {
      group.querySelectorAll("[data-reveal]").forEach((el, i) => {
        el.style.setProperty("--reveal-delay", `${i * 70}ms`);
      });
    });
  },

  observe(items) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.dataset.state = "visible";
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px" }
    );
    items.forEach((el) => observer.observe(el));
  },
};
