import { getExperience } from "../../../services/api";
import { getFileUrl } from "../../../utils/getFileUrl";
import { gsap, ScrollTrigger } from "../../../utils/gsapSetup";

const renderExpCards = async () => {
  const experiences = await getExperience();

  if (experiences && experiences.length) {
    return experiences
      .map(({ title, description, file, options }) => {
        const logoSrc = getFileUrl(file);
        const responsibilitiesHtml = options
          .split(",")
          .map((res) => /*html*/ `<li class="text-lg">${res}</li>`)
          .join("");

        return /*html*/ `
          <div class="exp-card-wrapper">
            <div class="flex-1">
              <div data-timeline-card class="border border-solid border-border bg-surface rounded-lg p-10 shadow-2xl shadow-muted/5">
                <div class="mb-5">
                  <p class="text-lg text-pretty leading-10">${description}</p>
                </div>
                <div>
                  <img src="${logoSrc}" alt="${title} logo" loading="lazy" class="max-w-32" />
                </div>
              </div>
            </div>
            <!---->
            <div class="flex-1">
              <div class="flex items-start">
                <div class="timeline-wrapper">
                  <div data-timeline class="timeline"></div>
                  <div class="gradient-line w-1 h-full"></div>
                </div>
                <div data-timeline-text class="flex xl:gap-20 md:gap-10 gap-5 relative z-20">
                  <div class="timeline-logo">
                    <img src="${logoSrc}" alt="${title} logo" />
                  </div>
                  <div>
                    <h1 class="font-semibold text-3xl mb-8">${title}</h1>
                    <div class="grid gap-3">
                      <p class="text-muted italic">مسئولیت ها</p>
                      <ul class="list-disc ms-5 flex flex-col gap-5 text-white-50">
                        ${responsibilitiesHtml}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      `;
      })
      .join("");
  }
  return /*html*/ `
    <empty-state message="هیچ سابقه ای وارد نشده"></empty-state>
  `;
};

const renderExpTemplate = async () => {
  return /*html*/ `
      <section id="experience" class="mt-30 md:mt-50">
        <title-section data-text="سوابق کاری"></title-section>
        <div class="container px-4">
          <div class="relative">
            <div class="relative z-50 xl:space-y-32 space-y-10">
              ${await renderExpCards()}
            </div>
          </div>
        </div>
      </section>
    `;
};

class Experience extends HTMLElement {
  async connectedCallback() {
    await this.render();

    this.timelineCards = this.querySelectorAll("[data-timeline-card]");
    this.timeline = this.querySelectorAll("[data-timeline]");
    this.timelineTexts = this.querySelectorAll("[data-timeline-text]");
    this.tweens = [];

    this.bindEvents();
  }

  disconnectedCallback() {
    this.tweens.forEach((tl) => {
      tl.scrollTrigger?.kill();
      tl.kill();
    });

    this.tweens = [];
  }

  bindEvents() {
    this.timelineCards.forEach((card) => {
      const tl = gsap.from(card, {
        xPercent: 100,
        opacity: 0,
        transformOrigin: "right right",
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
        },
      });

      this.tweens.push(tl);
    });

    const tl = gsap.to("[data-timeline]", {
      transformOrigin: "bottom bottom",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".timeline",
        start: "top center",
        end: "70% center",
        onUpdate: (self) => {
          gsap.to("[data-timeline]", {
            scaleY: 1 - self.progress,
          });
        },
      },
    });
    this.tweens.push(tl);

    this.timelineTexts.forEach((text) => {
      const tl = gsap.from(text, {
        opacity: 0,
        xPercent: 0,
        duration: 0.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: text,
          start: "top 60%",
        },
      });
      this.tweens.push(tl);
    });

    // ensure ScrollTrigger recalculates positions after setup
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }

  async render() {
    this.innerHTML = await renderExpTemplate();
  }
}

customElements.define("experience-section", Experience);

export default Experience;
