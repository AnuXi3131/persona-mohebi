function Services() {
  return /*html*/ `
        <div class="animate-fade-in">
          <services-section data-full-view="true" class="fade-in"></services-section>
        </div>
    `;
}

export default Services;

async function setup() {
  const section = document.querySelector("services-section");
  if (!section) return;
  if (section.dataset.ready === "true") return;

  await new Promise((resolve) => {
    const onReady = () => resolve();
    section.addEventListener("section-ready", onReady, { once: true });
  });
}

export { setup };
