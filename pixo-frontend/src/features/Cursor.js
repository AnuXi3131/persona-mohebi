import { cursorIcon } from "../constants/svgs";
import { gsap } from "../utils/gsapSetup";

class Cursor extends HTMLElement {
  connectedCallback() {
    this.render();
    this.mouseTl = null;
    this.customCursor = this.querySelector("#cursor");

    this.bindEvents();
  }

  disconnectedCallback() {
    this.unbindEvents();
    this.mouseTl.kill();
  }

  render() {
    this.innerHTML = `${cursorIcon}`;
  }

  bindEvents() {
    this.cursorTracker = (e) => {
      this.mouseTl = gsap.to(this.customCursor, {
        x: e.clientX - 10,
        y: e.clientY - 10,
        duration: 0.1,
        ease: "power3.out",
      });

      e.clientY <= 0
        ? this.classList.add("opacity-0")
        : this.classList.remove("opacity-0");
    };

    window.addEventListener("mousemove", this.cursorTracker);
  }

  unbindEvents() {
    window.removeEventListener("mousemove", this.cursorTracker);
  }
}

customElements.define("c-cursor", Cursor);

export default Cursor;
