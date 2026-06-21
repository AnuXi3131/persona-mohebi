class ScrollLine extends HTMLElement {
  connectedCallback() {
    this.render();
    this.scrollLine = this.querySelector("[data-scroll-line]");

    this.bindEvents();
  }

  disconnectedCallback() {
    this.unbindEvents();
  }

  render() {
    this.innerHTML = /*html*/ `
        <div
        data-scroll-line
        class="from-background to-text fixed top-0 right-0 z-[var(--scroll-line-z-index)] h-0.5 bg-linear-to-l duration-200">
        </div>
    `;
  }

  bindEvents() {
    this.scrollDetecator = () => {
      const scrollPercent =
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
        100;
      this.scrollLine.style.width = `${scrollPercent}%`;
    };

    window.addEventListener("scroll", this.scrollDetecator);
  }

  unbindEvents() {
    window.removeEventListener("scroll", this.scrollDetecator);
  }
}

customElements.define("scroll-line", ScrollLine);

export default ScrollLine;
