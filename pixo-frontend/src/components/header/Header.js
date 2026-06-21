import { brandName, logo } from "../../constants";
import "./Navigation";
import "./ThemeToggle";
import "./MenuToggle";
import headerTracker from "../../features/headerTracker";

class Header extends HTMLElement {
  getIsDesktop() {
    return window.matchMedia("(max-width: 48rem)").matches;
  }

  connectedCallback() {
    this.render();
    headerTracker();
  }

  render() {
    this.innerHTML = /*html*/ `
        <header data-main-header class="bg-background duration-200 ease-decelerate">
            <!---->
            <div class="absolute bottom-0 right-0 w-full h-px bg-linear-to-r from-transparent via-text/50 to-transparent"></div>
            <!---->
            <div data-main-header-inner class="container py-2 px-4">
                <!---->
                <div class="flex justify-between items-center gap-4 md:flex-wrap md:gap-8">
                    <!---->
                    <toggle-menu></toggle-menu>
                    <!---->
                    <div class="logo-container ml-auto">
                        <a href="${logo.path}" data-link class="flex justify-center items-center rounded-lg aspect-auto h-14 overflow-hidden p-0.5">
                            <img src="${logo.src}" alt="${brandName.fa}" data-logo class="size-full object-cover rounded-lg"/>
                        </a>
                    </div>
                    <!---->
                    <c-navigation class="flex-1"></c-navigation>
                    <!---->
                    <switch-theme></switch-theme>   
                </div>
                <!---->
            </div>
        </header>
    `;
  }
}

customElements.define("c-header", Header);

export default Header;
