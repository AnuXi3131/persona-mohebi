const renderMenuButton = () => {
  return /*html*/ `
      <button data-menu-toggle class="menu-toggle" aria-controls="main-navigation" aria-expanded="false" aria-label="toggle menu button" aria-labelledby="navigation" title="toggle menu">
        <!---->
        <svg class="hamburger" viewBox="0 0 100 100" width="40">
            <line class="line top" x1="90" x2="10" y1="40" y2="40" stroke-width="10" stroke-linecap="round" stroke-dasharray="80" stroke-dashoffset="0">
            </line>
            <line class="line bottom" x1="10" x2="90" y1="60" y2="60" stroke-width="10" stroke-linecap="round" stroke-dasharray="80" stroke-dashoffset="0">
            </line>
        </svg>
        <!---->
      </button>
      `;
};

class MenuToggle extends HTMLElement {
  #isOpen = false;

  async connectedCallback() {
    this.render();
    this.navToggleBtn = this.querySelector("[data-menu-toggle]");

    document.addEventListener("nav-ready", () => {
      const nav = document.querySelector("c-header [data-main-navigation]");
      if (!nav) return;

      this.navigation = nav;
      this.navLinks = this.navigation.querySelectorAll("[data-nav-links] li");
      this.navLogo = this.navigation.querySelector(".logo-container");
    });

    this.bindEvents();
  }

  disconnectedCallback() {
    this.unbindEvents();
  }

  bindEvents() {
    this.expandNavHandler = () => {
      const isOpen = !this.#isOpen;
      this.navLogo.classList.toggle("fade-in", isOpen);
      this.navLinks.forEach((li) => li.classList.toggle("fade-in", isOpen));
      this.navigation.classList.toggle("active", isOpen);
      this.navToggleBtn.dataset.state = isOpen;
      this.navToggleBtn.ariaExpanded = isOpen;
      document.body.classList.toggle("overflow-hidden", isOpen);
      this.#isOpen = isOpen;
    };

    this.navToggleBtn.addEventListener("click", this.expandNavHandler);
  }

  unbindEvents() {
    this.navToggleBtn.removeEventListener("click", this.expandNavHandler);
  }

  expandNav() {
    this.expandNavHandler();
  }

  render() {
    this.innerHTML = renderMenuButton();
  }
}

customElements.define("toggle-menu", MenuToggle);

export default MenuToggle;
