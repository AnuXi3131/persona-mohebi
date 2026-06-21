class EmptyState extends HTMLElement {
  connectedCallback() {
    this.message = this.getAttribute("message") || "هیچ موردی موجود نیست";
    this.render();
  }

  render() {
    this.innerHTML = /*html*/ `
      <div class="border border-solid border-border rounded-lg">
        <p class="text-center py-10 text-lg text-text/70">
            ${this.message}
        </p>
      </div>
    `;
  }
}

customElements.define("empty-state", EmptyState);

export default EmptyState;
