function headerTracker() {
  customElements.whenDefined("c-header").then(() => {
    const header = document.querySelector("[data-main-header]");
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 120) {
        header.classList.add("-translate-y-full", "opacity-0");
      } else {
        header.classList.remove("-translate-y-full", "opacity-0");
      }

      lastScrollY = currentScrollY;
    });
  });
}

export default headerTracker;
