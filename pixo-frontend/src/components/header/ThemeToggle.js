import { themeIcons } from "../../constants";
import { hide, show } from "../../utils/animationUtils";
import ThemeSwitcher from "../../features/themeSwitcher";

const renderThemeOptions = () => {
  return themeIcons
    .map(
      ({ name, icon }) => /*html*/ `
          <li class="w-full">
            <button data-theme="${name}" class="p-4 flex justify-center items-center w-full duration-400 ease-decelerate focus-within:text-primary hover:text-primary">
              ${icon}
            </button>
          </li>
        `,
    )
    .join("");
};

const renderThemeSelector = () => {
  return /*html*/ `
        <div class="relative toggle-theme">
            <!---->
            <button data-switch-toggle-btn data-theme="${themeIcons[1].name}" aria-label="${themeIcons[1].name}" class="bg-surface border-2 border-solid border-border p-4 rounded-lg ease-decelerate duration-200 focus-within:bg-background hover:bg-background">
                ${themeIcons[1].icon}
            </button>
            <!---->
            <ul data-switch-dropdown class="w-36 bg-surface absolute top-[110%] left-0 flex flex-col justify-center items-center rounded-lg border-2 border-solid border-border" hidden>
              ${renderThemeOptions()}
            </ul>
            <!---->
        </div>
    `;
};

class ThemeToggle extends HTMLElement {
  #isOpen = false;
  #events = [];

  connectedCallback() {
    this.render();

    this.switchThemeBtn = this.querySelector("[data-switch-toggle-btn]");
    this.themeOptionsDropdown = this.querySelector("[data-switch-dropdown]");

    this.themeSwitcher = new ThemeSwitcher(
      localStorage.getItem("theme") || "system",
    );

    this.bindEvents();
  }

  disconnectedCallback() {
    this.unbindEvents();
  }

  render() {
    this.innerHTML = renderThemeSelector();
  }

  bindEvents() {
    this.#events = [
      {
        el: this.switchThemeBtn,
        type: "click",
        handler: () => this.toggleDropdown(),
      },
      {
        el: this.themeOptionsDropdown,
        type: "click",
        handler: (e) => this.themeSelector(e),
      },
      {
        el: document,
        type: "click",
        handler: (e) => this.onDocClick(e),
      },
      {
        el: document,
        type: "keydown",
        handler: (e) => this.onKeyDown(e),
      },
    ];

    this.#events.forEach(({ el, type, handler }) => {
      el.addEventListener(type, handler);
    });
  }

  unbindEvents() {
    this.#events.forEach(({ el, type, handler }) => {
      el.removeEventListener(type, handler);
    });
  }

  toggleDropdown() {
    const isOpen = !this.#isOpen;
    this.switchThemeBtn.classList.toggle("active", isOpen);

    if (isOpen) show(this.themeOptionsDropdown, "fade-in", "fade-out");
    else hide(this.themeOptionsDropdown, "fade-in", "fade-out");

    this.#isOpen = isOpen;
  }

  themeSelector(e) {
    const validTarget = e.target.closest("button");
    if (!validTarget) return;

    this.themeSwitcher.applyTheme(validTarget.dataset.theme);
    this.toggleDropdown();
  }

  onDocClick(e) {
    if (this.#isOpen && !e.target.closest(".toggle-theme")) {
      this.toggleDropdown();
    }
  }

  onKeyDown(e) {
    if (e.key === "Escape" && this.#isOpen) this.toggleDropdown();
  }
}

customElements.define("switch-theme", ThemeToggle);

export default ThemeToggle;
