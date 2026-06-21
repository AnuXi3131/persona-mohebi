import { contactQuestions } from "../../../constants";
import { cmdIcon, checkSvg, successSvg } from "../../../constants/svgs";
import formSender from "../../../utils/formSender";
import { getContactInfo } from "../../../services/api";
import toast from "../../../utils/toast";
import Loader from "../../Loader";
import { gsap } from "../../../utils/gsapSetup";

const { title, options } = await getContactInfo();

const renderSelectOptions = () => {
  if (options && options.length) {
    return options
      .split(",")
      .filter((opt) => opt.trim() !== "")
      .map(
        (opt, i) => /*html*/ `
        <button data-opt-index="${i}" data-opt-value="${opt}">
          <i>${checkSvg}</i>
          <span>${opt}</span>
        </button>
      `,
      )
      .join("");
  }

  return /*html*/ `
    <empty-state message="گزینه ای برای انتخاب وجود ندارد"></empty-state>
 `;
};

const renderContactTemplate = () => {
  return /*html*/ `
            <section id="contact" class="mt-30 md:mt-50">
                <!---->
                <div class="relative select-none">
                  <!-- polygon gradient background -->
                  <div class="absolute bg-background z-[-1] bottom-0 right-1/2 translate-x-1/2 rotate-20 hidden md:block blur-3xl">
                    <div style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" class="aspect-video w-288.75 bg-linear-to-b from-primary to-accent opacity-10"></div>
                  </div>
                  <!---->
                  <div data-terminal class="max-w-4xl mx-auto px-4">
                    <div class="rounded-lg bg-surface/50 overflow-hidden shadow-2xl shadow-black/10">
                      <div class="sticky top-0 text-green-600 bg-neutral-950 p-2 font-mono text-center border border-solid border-border/50 rounded-t-lg flex justify-between items-center">
                        <p>contact/$</p>
                        <div class="flex">
                          <span>Command prompt</span>
                          ${cmdIcon}
                        </div>
                      </div>
                      <div data-terminal-container class="bg-surface/10 p-2 h-96 overflow-y-auto backdrop-blur-2xl">
                        <div class="mb-2">
                          <p class="py-2 font-mono font-semibold">
                            ${title || `اگر پروژه ای دارید لطفا فرم زیر را پر کنید.`}
                          </p>
                          <div class="overflow-hidden whitespace-nowrap font-mono text-muted">----------------------------------------------------------------------------------------------</div>
                        </div>
                        <!---->
                        <div data-terminal-content class="flex flex-col gap-3"></div>
                        <!---->
                        <ul data-terminal-select hidden>
                          <p class="text-muted">موضوع پیام:</p>
                          ${renderSelectOptions()}
                        </ul>
                        <!---->
                        <div data-terminal-actions hidden>
                          <button data-button-restart-terminal-form type="button">ریست</button>
                          <button data-button-send-terminal-form type="button">ارسال</button>
                        </div>
                        <!---->
                        <form onsubmit="return false">
                            <input data-terminal-input type="text" id="terminal-form-input" class="sr-only" autocomplete="off"/>
                        </form>
                        <!---->
                      </div>
                    </div>
                  </div>
                </div>
                <!---->
            </section>
        `;
};

class Contact extends HTMLElement {
  #isFocused = false;
  #currentInputText = "";
  #formSent = false;
  #formData = new Map();
  #events = [];
  #currentSelected = 0;

  connectedCallback() {
    this.render();

    this.questions = structuredClone(contactQuestions);
    this.terminal = this.querySelector("[data-terminal]");
    this.terminalContainer = this.querySelector("[data-terminal-container]");
    this.terminalContent = this.querySelector("[data-terminal-content]");
    this.terminalSelect = this.querySelector("[data-terminal-select]");
    this.terminalActions = this.querySelector("[data-terminal-actions]");
    this.terminalInput = this.querySelector("[data-terminal-input]");

    this.tl = null;
    this.animateTerminal();

    this.onInput = (e) => this.handleInputChange(e);
    this.onFocus = () => {
      this.#isFocused = true;
      this.updateTerminalContent();
    };
    this.onBlur = () => {
      this.#isFocused = false;
      this.updateTerminalContent();
    };
    this.onKeydown = (e) => {
      if (e.key === "Enter") this.handleSubmit();
    };
    this.onTerminalClick = () => this.terminalInput.focus();
    this.onOptionClick = (e) => this.handleOptionClick(e);
    this.onActionsClick = (e) => this.handleFormActions(e);

    // terminal contact events attached
    this.bindEvents();

    // reload terminal display when el connected
    this.updateTerminalContent();
  }

  disconnectedCallback() {
    this.unbindEvents();
    this.resetQuestions();

    if (this.tl) {
      this.tl.kill();

      if (this.tl.scrollTrigger) {
        this.tl.scrollTrigger.kill();
      }
    }
  }

  bindEvents() {
    this.#events = [
      {
        el: this.terminalContainer,
        type: "click",
        handler: () => this.onTerminalClick(),
      },
      {
        el: this.terminalSelect,
        type: "click",
        handler: (e) => this.onOptionClick(e),
      },
      {
        el: this.terminalActions,
        type: "click",
        handler: (e) => this.onActionsClick(e),
      },
      {
        el: this.terminalInput,
        type: "input",
        handler: (e) => this.onInput(e),
      },
      {
        el: this.terminalInput,
        type: "focus",
        handler: () => this.onFocus(),
      },
      {
        el: this.terminalInput,
        type: "blur",
        handler: () => this.onBlur(),
      },
      {
        el: this.terminalInput,
        type: "keydown",
        handler: (e) => this.onKeydown(e),
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

  render() {
    this.innerHTML = renderContactTemplate();
  }

  animateTerminal() {
    this.tl = gsap.fromTo(
      this.terminal,
      { y: 200, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: this,
        },
      },
    );
  }

  scrollToBottom() {
    this.terminalContainer.scrollTop = this.terminalContainer.scrollHeight;
  }

  createElement(tag, className, text) {
    const elm = document.createElement(tag);
    if (className) elm.className = className;
    if (text != null) elm.textContent = text;
    return elm;
  }

  handleOptionClick(e) {
    const validTarget = e.target.closest("button");
    if (!validTarget) return;

    const value = validTarget.dataset.optValue;
    this.#currentSelected = validTarget.dataset.optIndex;

    this.terminalSelect.querySelector(".active")?.classList.remove("active");
    const targetOpt = this.terminalSelect.querySelector(
      `[data-opt-index="${this.#currentSelected}"]`,
    );
    targetOpt.classList.add("active");
    this.#formData.set("subject", value);

    this.renderSummary();
    this.scrollToBottom();
  }

  renderCompletedQuestions() {
    this.questions.forEach((question) => {
      if (!question.complete) return;

      const pTag = this.createElement("p", "");
      pTag.innerHTML = `${question.text || ""}
      ${
        question.postfix
          ? `<span class="text-muted/70">${question.postfix}</span>`
          : ""
      }`;

      const inputP = this.createElement("p", "text-success");
      inputP.innerHTML = `<span class="flex items-center gap-1">${checkSvg} ${question.value}</span> `;

      this.terminalContent.append(pTag, inputP);
    });
  }

  renderCurrentQuestion() {
    const current = this.questions.find((q) => !q.complete);
    if (!current) return;

    const pTag = this.createElement("p", "");
    pTag.innerHTML = `${current.text || ""}${current.postfix ? `<span class="text-accent">${current.postfix}</span>` : ""}`;
    this.terminalContent.append(pTag);
  }

  renderInputLine() {
    const current = this.questions.find((q) => !q.complete);
    const inputP = this.createElement("p", "flex gap-1");

    const cursorElement = this.#isFocused
      ? '<span class="bg-muted animate-blink h-5 w-2"></span>'
      : "";

    inputP.innerHTML = /*html*/ `
      ${successSvg}
      <span class="text-primary-blue">~</span>
      <p class="text-muted/70">${current.postfix}:</p>
      ${this.#currentInputText}${cursorElement}
    `;

    return inputP;
  }

  updateTerminalContent() {
    this.terminalContent.innerHTML = "";
    this.renderCompletedQuestions();

    if (this.#formSent) {
      const pTag = this.createElement(
        "p",
        "text-success mt-5",
        "پیام شما با موفقیت ارسال شد.",
      );
      this.terminalContent.append(pTag);
      return;
    }

    this.renderCurrentQuestion();

    const currentQuestion = this.questions.find((q) => !q.complete);

    if (currentQuestion) {
      const inputLine = this.renderInputLine();
      this.terminalContent.append(inputLine);
    } else {
      this.terminalSelect.hidden = false;
      this.terminalInput.disabled = true;
    }

    this.scrollToBottom();
  }

  renderSummary() {
    const intro = this.createElement(
      "p",
      "mt-5",
      "اطلاعاتی که شما وارد کردید:",
    );
    this.terminalContent.append(intro);

    for (const [key, value] of this.#formData) {
      const pTag = this.createElement("p", "flex justify-end flex-row-reverse");
      pTag.innerHTML = `${value} <span class="text-accent ml-2">${key}:</span> `;
      this.terminalContent.append(pTag);
    }

    const ask = this.createElement("p", "", "ارسالش کنم؟");
    this.terminalContent.append(ask);

    this.terminalSelect.hidden = true;
    this.terminalActions.hidden = false;
  }

  handleFormActions(e) {
    const target = e.target.closest("button");
    if (!target) return;

    if (target.hasAttribute("data-button-restart-terminal-form")) {
      this.resetQuestions();
    } else if (target.hasAttribute("data-button-send-terminal-form")) {
      this.sendForm();
    }
  }

  handleInputChange(e) {
    this.#currentInputText = e.target.value;
    this.updateTerminalContent();
  }

  handleSubmit() {
    const currentQuestion = this.questions.find((q) => !q.complete);
    if (currentQuestion && this.#currentInputText.trim()) {
      currentQuestion.value = this.#currentInputText;
      this.#formData.set(currentQuestion.key, currentQuestion.value);
      currentQuestion.complete = true;
      this.#currentInputText = "";
      this.terminalInput.value = "";
      this.updateTerminalContent();
    } else {
      toast(`لطفا تمامی مقادیر را پر کنید`, "bg-danger");
    }
  }

  resetQuestions() {
    this.questions.forEach((q) => {
      q.complete = false;
      q.value = "";
    });

    this.#currentInputText = "";
    this.#formSent = false;
    this.#formData.clear();
    this.#currentSelected = 0;
    this.terminalSelect.querySelector(".active")?.classList.remove("active");
    this.terminalSelect.hidden = true;
    this.terminalActions.hidden = true;
    this.terminalInput.disabled = false;
    this.terminalInput.value = "";
    this.terminalInput.focus();
    this.updateTerminalContent();
  }

  async sendForm() {
    const formData = Object.fromEntries(this.#formData);
    Loader(this.terminal, true);

    try {
      const sendFormRequest = await formSender(formData);

      if (sendFormRequest.success) {
        this.#formSent = true;
        this.terminalActions.hidden = true;
        this.updateTerminalContent();
      }
    } catch (error) {
      toast("خطایی هنگام ارسال اطلاعات رخ داد", "bg-danger");
      console.log(error.message);
    } finally {
      Loader(this.terminal, false);
    }
  }
}

customElements.define("contact-section", Contact);

export default Contact;
