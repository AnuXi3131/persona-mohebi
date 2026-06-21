class CTA extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  props() {
    return {
      title: this.dataset.title || "",
      text: this.dataset.text || "",
      label: this.dataset.label || "",
      href: this.dataset.href || "/",
    };
  }

  render() {
    const { title, text, label, href } = this.props();

    this.innerHTML = /*html*/ `
        <div class="flex justify-between items-center">
            <h4 class="text-xl md:text-2xl lg:text-3xl relative flex-1 z-1">
                <span class="block text-pretty -translate-y-8 md:-translate-y-6">${title}</span>
                <div class="absolute top-1/2 right-0 w-full h-1 border-2 border-dashed border-border z-[-1]"></div>
            </h4>
            <c-button data-tag="a" data-href="${href}" data-text="${text}" data-label="${label}" data-icon="arrow-forward-outline" data-background="var(--color-primary)" data-target="_self" class="text-white"></c-button>
        </div>`;
  }
}

customElements.define("cta-section", CTA);

export default CTA;
