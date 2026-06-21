class SectionTitle extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  props() {
    return {
      text: this.dataset.text || "",
    };
  }

  render() {
    const { text } = this.props();

    this.innerHTML = /*html*/ `
        <div class="mb-20 md:mb-30 relative z-[1] w-full">
          <div class="container px-4 flex flex-col items-center justify-center text-center relative">
            <h2 class="dark:text-white text-7xl md:text-8xl lg:text-9xl bg-linear-to-t from-background to-text/30 text-transparent bg-clip-text py-10">${text}</h2>
          </div>
        </div>
    `;
  }
}

customElements.define("title-section", SectionTitle);

export default SectionTitle;
