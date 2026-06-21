function About() {
  return /*html*/ `
        <div class="animate-fade-in">
          <about-section data-full-view="true"></about-section>
        </div>
    `;
}

async function setup() {
  const section = document.querySelector("about-section");
  if (!section) return;
  if (section.dataset.ready === "true") return;

  await new Promise((resolve) => {
    const onReady = () => resolve();
    section.addEventListener("section-ready", onReady, { once: true });
  });
}

export { setup };

export default About;
