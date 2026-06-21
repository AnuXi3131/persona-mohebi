import { logo, routes } from "../../constants";
import { getSettings } from "../../services/api";
import { isAnimationActive } from "../../utils/animationUtils";
import { filterRoutesBySettings } from "../../utils/filterRoutesBySettings";

const renderNavLinks = async () => {
  const { visible_pages } = await getSettings();
  const routesToRender = filterRoutesBySettings(routes, visible_pages);

  return routesToRender
    .map(({ name, path, hidden }, index) => {
      const addAnimateClass = !isAnimationActive ? "opacity-0 scale-100" : "";
      return hidden
        ? ""
        : `<li class="${addAnimateClass} md:opacity-100 md:scale-100" style="animation-delay:${(index + 12) * 100}ms">
            <a href="${path}" data-link class="p-2 duration-200 transition-colors text-nowrap hover:text-primary focus:text-primary">${name}</a>
          </li>`;
    })
    .join("");
};

const renderNavigation = async () => {
  const addAnimateClass = !isAnimationActive ? "opacity-0 scale-100" : "";
  return /*html*/ `
        <nav data-main-navigation class="flex items-center">
            <!---->
            <div data-mobile-logo class="logo-container block md:hidden ${addAnimateClass} md:opacity-100 md:scale-100 ml-0 mb-12 md:ml-10 md:mb-0" style="animation-delay:1s">
                <a href="${logo.path}" data-link class="flex justify-center items-center rounded-lg h-14 aspect-auto p-0.5">
                    <img src="${logo.src}" alt="logo" data-logo class="size-full object-cover"/>
                </a>
            </div>
            <!---->
            <ul data-nav-links class="flex max-md:flex-col items-center gap-6 text-lg font-semibold relative">
              <div data-tracker class="tracker"></div>
              ${await renderNavLinks()}
            </ul>
            <!---->
        </nav>
    `;
};

class Navigation extends HTMLElement {
  getIsMobile() {
    return window.matchMedia("(max-width: 48rem)").matches;
  }

  async connectedCallback() {
    await this.render();

    this.dispatchEvent(
      new CustomEvent("nav-ready", {
        bubbles: true,
        composed: true,
      }),
    );

    this.navLinksContainer = this.querySelector("[data-nav-links]");
    this.tracker = this.querySelector("[data-tracker]");
    this.links = this.querySelectorAll("[data-link]");

    this.bindEvents();
  }

  disconnectedCallback() {
    this.unbindEvents();
  }

  async render() {
    this.innerHTML = await renderNavigation();
  }

  bindEvents() {
    this.trackerHandler = async (e) => {
      const link = e.currentTarget;
      const linkRect = await link.getBoundingClientRect();
      const navRect = this.navLinksContainer.getBoundingClientRect();

      if (link.getAttribute("href") === "/") return;

      this.tracker.style.width = `${linkRect.width}px`;
      this.tracker.style.left = `${linkRect.left - navRect.left}px`;
      this.tracker.classList.add("active");
    };

    this.trackerRemover = () => {
      this.tracker.classList.remove("active");
    };

    this.links.forEach((link) => {
      link.addEventListener("mousemove", this.trackerHandler, true);
      link.addEventListener("click", () => {
        this.getIsMobile() ? this.expandNavHandler() : "";
      });
    });

    this.navLinksContainer.addEventListener(
      "mouseleave",
      this.trackerRemover,
      true,
    );
  }

  unbindEvents() {
    this.links.forEach((link) => {
      link.removeEventListener("mousemove", this.trackerHandler, true);
      link.removeEventListener("click", this.expandNavHandler);
    });

    this.navLinksContainer.removeEventListener(
      "mouseleave",
      this.trackerRemover,
      true,
    );
  }

  expandNavHandler() {
    customElements.whenDefined("toggle-menu").then(() => {
      document.querySelector("toggle-menu").expandNav();
    });
  }
}

customElements.define("c-navigation", Navigation);

export default Navigation;
