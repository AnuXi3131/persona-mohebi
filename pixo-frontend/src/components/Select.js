import { chevronDownSvg } from "../constants/svgs";
import { hide, show } from "../utils/animationUtils";

class Select extends HTMLElement {
  #isOpen = false;
  #events = [];

  connectedCallback() {
    this.render();

    this.displayBtn = this.querySelector("[data-display-button]");
    this.displayText = this.querySelector("[data-display-text]");
    this.arrowIcon = this.querySelector("[data-icon]");
    this.optionsContainer = this.querySelector("[data-options]");
    this.selectInput = this.querySelector("[data-select-input]");

    this.bindEvents();
  }

  disconnectedCallback() {
    this.unbindEvents();
  }

  bindEvents() {
    this.#events = [
      {
        el: this.displayBtn,
        type: "click",
        handler: () => this.toggleDropdown(),
      },
      {
        el: this.optionsContainer,
        type: "click",
        handler: (e) => this.selectOption(e),
      },
      {
        el: this.selectInput,
        type: "change",
        handler: () => this.inputChanged(),
      },
      {
        el: document,
        type: "click",
        handler: (e) => this.handleOnClickDoc(e),
      },
      {
        el: document,
        type: "keydown",
        handler: (e) => this.handleOnKeydown(e),
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

  props() {
    let options = [];

    try {
      options = JSON.parse(this.dataset.options || "[]");
    } catch (e) {
      console.log(e.message);
    }

    return {
      id: this.dataset.id || "",
      placeholder: this.dataset.placeholder || "انتخاب کنید",
      options: options,
      selected: this.dataset.selected || "",
    };
  }

  renderSelectOptions() {
    const { options } = this.props();
    return options
      .map((item, index) => {
        const addBorder =
          index < options.length - 1
            ? "border-b border-solid border-border"
            : "";
        return /*html*/ `
            <li role="option">
              <button data-value="${item.value}" type="button" class="${addBorder} px-4 py-3 w-full text-right bg-surface text-muted duration-200 ease-decelerate hover:text-surface hover:bg-text">
                <span>${item.title}</span>
              </button>
            </li>
          `;
      })
      .join("");
  }

  render() {
    const { id, placeholder, selected } = this.props();

    this.innerHTML = /*html*/ `
        <div role="select" aria-label="select-box" data-select-id="${id}" class="relative">
            <button data-display-button data-input type="button" class="text-muted min-w-50 flex justify-between items-center gap-5 hover:text-text focus-within:text-text">
                <span data-display-text>${placeholder}</span>
                <i data-icon class="duration-200 ease-decelerate">${chevronDownSvg}</i>    
            </button>
            <ul data-options role="options" class="absolute z-[var(--select-options-z-index)] w-full top-[110%] rounded-lg max-h-50 overflow-y-auto border-border
            border-2 border-solid" hidden>${this.renderSelectOptions()}</ul>
            <input data-select-input name="${id}" value="${selected}" hidden/>
        </div>
    `;
  }

  toggleDropdown() {
    const isOpen = !this.#isOpen;
    this.arrowIcon.classList.toggle("rotate-180", isOpen);

    if (isOpen) show(this.optionsContainer, "fade-in", "fade-out");
    else hide(this.optionsContainer, "fade-in", "fade-out");

    this.#isOpen = isOpen;
  }

  selectOption(e) {
    const validTarget = e.target.closest("button");
    if (!validTarget) return;

    this.displayText.textContent = validTarget.textContent;
    this.selectInput.value = validTarget.dataset.value;
    this.toggleDropdown();
    this.inputChanged();
  }

  handleOnClickDoc(e) {
    if (this.#isOpen && !e.target.closest("c-select")) {
      this.toggleDropdown();
    }
  }

  handleOnKeydown(e) {
    if (e.key === "Escape" && this.#isOpen) this.toggleDropdown();
  }

  inputChanged() {
    const customEvent = new CustomEvent("selectChanged", {
      detail: {
        value: this.selectInput.value,
      },
      bubbles: true,
    });
    this.dispatchEvent(customEvent);
  }

  reset() {
    const { placeholder } = this.props();
    this.displayText.textContent = placeholder;
    this.selectInput.value = "";
    this.inputChanged();
  }
}

customElements.define("c-select", Select);

export default Select;
