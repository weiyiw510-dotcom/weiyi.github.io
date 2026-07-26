const revealTargets = document.querySelectorAll(
  ".section-heading, .architecture, .challenge-grid, .split-copy, .code-window, .pcb-figure, .hardware-grid, .timeline, .closing"
);

revealTargets.forEach((element) => element.classList.add("reveal"));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealTargets.forEach((element) => revealObserver.observe(element));

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll("nav a")];

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const active = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!active) return;
    navLinks.forEach((link) => {
      link.toggleAttribute("aria-current", link.hash === `#${active.target.id}`);
    });
  },
  { rootMargin: "-25% 0px -60% 0px", threshold: [0.1, 0.4] }
);

sections.forEach((section) => sectionObserver.observe(section));
