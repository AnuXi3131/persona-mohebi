import { checkSvg } from "../../../constants/svgs";
import { getServices } from "../../../services/api/getServices";
import { getFileUrl } from "../../../utils/getFileUrl";
import { gsap, ScrollTrigger } from "../../../utils/gsapSetup";

const renderServiceOptions = (options, isFullView) => {
  return options
    .split(",")
    .filter((text) => text.trim() !== "")
    .map((opt, index) => {
      const visibilityClass = index > 3 && !isFullView ? "hidden" : "flex";
      return /*html*/ `
          <li class="${visibilityClass} gap-3 items-center">
            ${checkSvg}
            <span>${opt}</span>
          </li>`;
    })
    .join("");
};

const renderServices = async (isFullView) => {
  const services = await getServices(isFullView ? 100 : 3);

  if (services.length) {
    return services
      .map(
        ({
          file,
          background_color,
          title,
          options,
          price,
          order_text,
          order_link,
        }) => {
          const serviceImgSrc = getFileUrl(file);

          return /*html*/ `
        <div data-service-card class="flex p-0.5 rounded-lg bg-linear-to-b from-text/30 to-transparent z-1 relative h-full">
              <div class="relative rounded-lg p-4 bg-border z-1 flex flex-col h-full w-full">
                <square-bg></square-bg>
                <div class="flex justify-center items-center rounded-lg h-36 relative overflow-hidden mb-5" style="background:${background_color}">
                    <img src="./images/backgrounds/noisy.jfif" alt="plan background" class="mix-blend-multiply absolute inset-0 w-full scale-130"/>
                    <img src="${serviceImgSrc}" alt="${title}" loading="lazy" class="size-24 object-cover drop-shadow-[-6px_10px_0_black]"/>
                </div>
                <div class="flex flex-col gap-10 flex-1">
                  <div class="mb-auto">
                    <h3 class="text-2xl md:text-3xl lg:text-4xl mb-5 md:mb-10">${title}</h3>
                    <ul class="flex flex-col gap-6 text-sm md:text-base text-muted">
                      ${renderServiceOptions(options, isFullView)}
                      <p class="${isFullView ? "hidden" : ""}">..........</p>
                    </ul>
                  </div>
                  <div class="flex flex-row-reverse justify-center text-center items-center gap-4 border-3 border-dashed border-text/20 rounded-full p-4">
                        <p class="text-left text-2xl sm:text-3xl font-semibold">${parseInt(price).toLocaleString("fa-IR")} تــ</p>
                        <span class="text-xs text-muted">شروع از</span>
                  </div>
                </div>
                <div class="flex justify-end items-center md:justify-center mt-10">
                    <c-button data-tag="a" data-href="${order_link}" data-text="${order_text || "سفارش دهید"}" data-label="${title}"
                    data-icon="rocket-outline"
                    data-background="var(--color-surface)"></c-button>
                </div>
              </div>  
          </div>
      `;
        },
      )
      .join("");
  }

  return /*html*/ `
    <div class="col-span-full">
      <empty-state message="خدماتی وارد نشده"></empty-state>
    </div>
  `;
};

class Services extends HTMLElement {
  async connectedCallback() {
    this.isFullView = this.dataset.fullView || false;
    await this.render();
    this.allCards = this.querySelectorAll("[data-service-card]");
    this.cardTimeline = [];
    this.animateCards();

    // signal page-level that this section finished loading
    try {
      this.dataset.ready = "true";
      this.dispatchEvent(new CustomEvent("section-ready", { bubbles: true }));
    } catch (e) {
      /* ignore */
    }
  }

  disconnectedCallback() {
    this.cardTimeline.forEach((tl) => {
      tl.scrollTrigger.kill();
      tl.kill();
    });
  }

  renderCTA() {
    return this.isFullView
      ? ""
      : /*html*/ `<cta-section data-title="برای مشاهده همه خدمات و آپشن ها وارد شوید" data-label="مشاهده همه خدمات ها" data-href="/services"><cta-section>`;
  }

  async render() {
    this.innerHTML = /*html*/ `
        <section id="services" class="mt-30 md:mt-50">
            <title-section data-text="خدمات"></title-section>
            <div class="relative z-1">
                <div class="container px-4">
                    <!---->
                    <div class="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch mb-30">
                        ${await renderServices(this.isFullView)}
                    </div>
                    <!---->
                    ${this.renderCTA()}
                    <!---->
                </div>
            </div>
        </section>
    `;
  }

  animateCards() {
    // create animations on next frame so layout (images/fonts) settles
    requestAnimationFrame(() => {
      this.allCards.forEach((item, index) => {
        const tl = gsap.fromTo(
          item,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: index * 0.2,
            scrollTrigger: {
              trigger: item,
            },
          },
        );

        this.cardTimeline.push(tl);
      });

      ScrollTrigger.refresh();
    });
  }
}

customElements.define("services-section", Services);

export default Services;
