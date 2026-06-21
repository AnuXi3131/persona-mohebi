import { routes } from "../../constants";
import { getSettings } from "../../services/api";
import { filterRoutesBySettings } from "../../utils/filterRoutesBySettings";
import {
  footerDivider,
  footerVector,
  copyRightIcon,
  locationSvg,
  phoneSvg,
  emailSvg,
} from "../../constants/svgs";

async function getContactInformation() {
  const { location, address, email, phone_number } = await getSettings();

  return [
    {
      title: "location",
      link: `${location || ""}`,
      text: `${address || ""}`,
      icon: locationSvg,
    },
    {
      title: "tel",
      link: `tel:${phone_number || ""}`,
      text: `${phone_number || ""}`,
      icon: phoneSvg,
    },
    {
      title: "email",
      link: `mailto:${email || ""}`,
      text: `${email || ""}`,
      icon: emailSvg,
    },
  ];
}

async function renderContactList() {
  const contactInformation = await getContactInformation();

  if (contactInformation.length) {
    return contactInformation
      .filter(({ text }) => text.trim() !== "")
      .map(
        ({ title, link, text, icon }) => /*html*/ `
        <li class="flex items-center gap-3">
          <span>${icon}</span>
          <a href="${link}" aria-label="${title}" target="_blank" class="text-lg duration-200 transition-colors hover:text-primary focus:text-primary font-semibold">
            ${text}
          </a>
        </li>
      `,
      )
      .join("");
  }

  return /*html*/ `
    <empty-state message="آیتمی وارد نشده"></empty-state>
  `;
}

const renderNavLinks = async () => {
  const { visible_pages } = await getSettings();
  const routesToRender = filterRoutesBySettings(routes, visible_pages);

  return routesToRender
    .map(({ name, path, hidden }) => {
      return hidden
        ? ""
        : `
        <li class="list-disc list-inside">
          <a href="${path}" data-link class="text-lg duration-200 transition-colors hover:text-primary focus:text-primary">
            ${name}
          </a>
        </li>
        `;
    })
    .join("");
};

const renderFooterTemplate = async () => {
  const { footer_text } = await getSettings();

  return /*html*/ `
      <div class="mt-50 mb-30 relative z-1">${footerDivider}</div>
      <!---->
      <footer id="footer" class="relative py-10 z-1">
        <!---->
        <div class="absolute inset-0 z-[-2] opacity-5 md:opacity-10">${footerVector}</div>
        <!---->
        <div class="container px-4">
          <div class="flex flex-col gap-30">
            <div class="grid gap-20 md:gap-10 justify-center grid-cols-1 md:grid-cols-3 md:divide-x divide-border/50">
              <div class="flex flex-col gap-10">
                <h5 class="text-xl ">اطلاعات تماس</h5>
                  <ul class="flex flex-col gap-5 text-muted">${await renderContactList()}</ul>
              </div>
              <div class="flex flex-col gap-10">
                <h5 class="text-xl">بخش های سایت</h5>
                <nav>
                  <ul class="flex flex-col gap-5 text-muted">${await renderNavLinks()}</ul>
                </nav>
              </div>
              <div class="flex flex-col gap-10">
                <h5 class="text-xl justify-self-start">شبکه های اجتماعی</h5>
                <c-socials class="text-muted"></c-socials>
              </div>
            </div>
            <div class="flex justify-center text-center bg-background py-2">
              <div class="flex max-sm:flex-col items-center gap-3">
                <div class="flex gap-1">
                  <span>
                    ${footer_text || "تمامی حقوق محفوظ است."}
                  </span>
                  <div class="flex gap-1 items-center font-montserrat">
                    <i>${copyRightIcon}</i> 
                    <span>${new Date().getFullYear()}</span>
                  </div>
                </div>
                <a href="/" data-link class="text-primary font-semibold font-montserrat">${location.host}</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
   `;
};

class Footer extends HTMLElement {
  async connectedCallback() {
    await this.render();

    document.addEventListener("socials-ready", () => {
      const socials = this.querySelector("c-socials ul");
      if (!socials) return;

      socials.style.justifyContent = "space-between";
      const buttons = socials.querySelectorAll("[data-social-button]");
      buttons.forEach(
        (btn) => (btn.querySelector("ion-icon").style.fontSize = "1.5rem"),
      );
    });
  }

  async render() {
    this.innerHTML = await renderFooterTemplate();
  }
}

customElements.define("c-footer", Footer);

export default Footer;
