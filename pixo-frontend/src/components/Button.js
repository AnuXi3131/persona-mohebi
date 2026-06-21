class Button extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  props() {
    return {
      tag: this.dataset.tag || "button",
      href: this.dataset.href || "",
      text: this.dataset.text || "",
      label: this.dataset.label || "",
      icon: this.dataset.icon || "",
      background: this.dataset.background || "",
      border: this.dataset.border || "",
      btnPos: this.dataset.pos || "0 auto",
      width: this.dataset.width || "max-content",
      target: this.dataset.target || "_blank",
    };
  }

  render() {
    const {
      tag,
      href,
      text,
      label,
      icon,
      background,
      border,
      btnPos,
      width,
      target,
    } = this.props();

    const tagName = `${tag}`;
    const attributes = `data-button aria-label="${label}"`;
    const isLink = `${tag === "a" ? `href="${href}" target="${target}" rel="noopener noreferrer"` : ""}`;
    const hoverEffect = `<span class="btn-hover-effect"></span>`;
    const renderInnerText = `${text !== "" ? `<span class="hidden md:block">${text}</span>` : ""}`;
    const renderInnerIcon = `${icon !== "" ? `<ion-icon name="${icon}" class="text-3xl"></ion-icon>` : ""}`;

    this.style.setProperty("--btn-margin", btnPos);
    this.style.setProperty("--btn-width", width);
    this.style.setProperty("--btn-bg", background);
    this.style.setProperty("--border-color", border);

    this.innerHTML = /*html*/ `
      <${tagName} ${attributes} ${isLink}>
        ${hoverEffect}
        ${renderInnerText}
        ${renderInnerIcon}
      </${tagName}
    `;
  }
}

customElements.define("c-button", Button);

export default Button;
