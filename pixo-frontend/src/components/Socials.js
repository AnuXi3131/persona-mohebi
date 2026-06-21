// import { socials } from "../constants";
import { getSettings } from "../services/api";
import { gsap } from "../utils/gsapSetup";

const SOCIALS_ICONS_MAP = {
  facebook: "logo-facebook",
  instagram: "logo-instagram",
  twitter: "logo-twitter",
  linkedin: "logo-linkedin",
  github: "logo-github",
  telegram: "paper-plane-outline",
  codepen: "logo-codepen",
  twitch: "logo-twitch",
};

const socialsList = async () => {
  const { socials } = await getSettings();

  if (socials) {
    const socialsArray = JSON.parse(socials);
    return Object.entries(socialsArray).map(([key, value]) => ({
      key,
      value,
      icon: SOCIALS_ICONS_MAP[key] || "globe-outline",
    }));
  }

  return [];
};

const renderSocials = async () => {
  const socials = await socialsList();

  if (socials.length) {
    return /*html*/ `
          <ul class="md:grid flex flex-wrap md:grid-cols-[repeat(auto-fill,minmax(60px,1fr))] justify-center items-center gap-3 md:gap-6">
              ${socials
                .map(
                  ({ key, value, icon }) => /*html*/ `
                    <li data-social-button class="justify-self-center">
                      <c-button 
                        data-tag="a" 
                        data-href="${value}"  
                        data-label="${key} social"
                        data-icon="${icon}"
                        data-background="var(--color-surface)">
                      </c-button>
                    </li>
                  `,
                )
                .join("")}
          </ul>
      `;
  }

  return /*html*/ `
    <empty-state message="آیتمی وارد نشده"></empty-state>
  `;
};

class Socials extends HTMLElement {
  async connectedCallback() {
    await this.render();
    this.dispatchEvent(
      new CustomEvent("socials-ready", {
        bubbles: true,
        composed: true,
      }),
    );

    this.socialButtons = this.querySelectorAll("[data-social-button]");
    this.buttonsTimeline = [];

    this.animateButtons();
  }

  disconnectedCallback() {
    this.buttonsTimeline.forEach((tl) => tl.kill());
  }

  async render() {
    this.innerHTML = await renderSocials();
  }

  animateButtons() {
    this.socialButtons.forEach((item, index) => {
      const tl = gsap.fromTo(
        item,
        { x: 200, opacity: 0 },
        { scale: 1, x: 0, opacity: 1, ease: "power3.out", delay: index * 0.2 },
      );

      this.buttonsTimeline.push(tl);
    });
  }
}

customElements.define("c-socials", Socials);

export default Socials;
