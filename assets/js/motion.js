/* motion.js: scroll driven motion.

   1. Hero marquees: the "visual designer" rows slide sideways as the page
      scrolls, each in its own direction, looping seamlessly.
   2. Reveals: elements marked data-reveal fade up once when they enter the
      viewport. Siblings inside a [data-reveal-group] get a short stagger.
   Everything else in the motion plan is pure CSS (assets/css/motion.css).

   If this file fails to load, the marquees stay in their Figma composition,
   the "motion-ready" class is never added and all content stays visible. */
window.Site = window.Site || {};

Site.motion = {
  init() {
    this.marquees();
    if (!("IntersectionObserver" in window)) return;
    const items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;

    this.stagger();
    document.documentElement.classList.add("motion-ready");
    this.observe(items);
  },

  // Hero rows: each scrolled pixel moves the rows by --marquee-speed pixels.
  // The offset wraps every word width, so the rows never run out of text.
  marquees() {
    const hero = document.querySelector(".hero-marquees");
    if (!hero) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rows = [...hero.querySelectorAll(".marquee-track")].map((track) => {
      const style = getComputedStyle(track);
      return {
        track,
        start: parseFloat(style.getPropertyValue("--marquee-start")) || 0,
        direction: parseFloat(style.getPropertyValue("--marquee-direction")) || 1,
        word: 0,
      };
    });
    const speed =
      parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--marquee-speed")) || 0.6;

    // One word = a quarter of the track (four copies). Fonts and breakpoints
    // change it, so measure again on resize and once the fonts are in.
    const measure = () => {
      rows.forEach((row) => { row.word = row.track.scrollWidth / 4; });
      update();
    };

    let frame = 0;
    const update = () => {
      frame = 0;
      const scrolled = window.scrollY;
      if (hero.getBoundingClientRect().bottom < 0) return; // hero out of view
      rows.forEach(({ track, start, direction, word }) => {
        if (!word) return;
        const travel = start * word + direction * scrolled * speed;
        const x = (((travel % word) + word) % word) - word;
        track.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0)`;
      });
    };

    window.addEventListener("scroll", () => {
      if (!frame) frame = requestAnimationFrame(update);
    }, { passive: true });
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    measure();
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
