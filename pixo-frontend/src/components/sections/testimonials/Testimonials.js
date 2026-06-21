import { brandName } from "../../../constants";
import { dotsSvg } from "../../../constants/svgs";
import { getComments, getSettings } from "../../../services/api";
import { getFileUrl } from "../../../utils/getFileUrl";
import { gsap, ScrollTrigger } from "../../../utils/gsapSetup";

const renderContactInfo = async () => {
  const { email } = await getSettings();

  if (email) {
    return /*html*/ `
      <a href="mailto:${email}" aria-label="${email} ${brandName.fa}" class="font-montserrat duration-200 ease-decelerate hover:opacity-80">${email}</a>
    `;
  }

  return /*html*/ `
    <span>ایمیلی وارد نشده</span>
  `;
};

const renderTestimonials = async (repeatCount) => {
  const comments = await getComments();

  if (comments.length) {
    return comments
      .map(({ comment, file, title, social_name, social_link }) => {
        const profileSrc = getFileUrl(file);
        return /*html*/ `
          <article data-testimonial-card class="w-full bg-surface border-2 border-solid border-border rounded-lg p-4 md:p-8 flex flex-col gap-5 relative z-1 overflow-hidden">
            <div class="absolute inset-0 z-[-1] bg-linear-to-l from-surface via-surface to-transparent"></div>
            <div class="fill-accent absolute inset-0 z-[-2] opacity-10 left-10 rotate-45">${dotsSvg}</div>
            <p class="leading-10 text-muted">${comment}</p>
            <div class="flex gap-3">
              <figure class="size-14">
                <img src="${profileSrc}" alt="${title}" loading="lazy" class="rounded-full object-cover size-full"/>
              </figure>
              <div class="flex flex-1 flex-col overflow-hidden whitespace-nowrap text-ellipsis max-sm:max-w-40">
                <span class="font-semibold text-lg">${title}</span>
                <a href="${social_link}" target="_blank" title="${title} social" aria-label="${title} social link" class="font-medium text-muted duration-200 ease-decelerate hover:text-accent">${social_name}@</a>
              </div>
            </div>
          </article>
        `;
      })
      .join("")
      .repeat(repeatCount);
  }

  return /*html*/ `
    <empty-state message="نظری ثبت نشده"></empty-state>
  `;
};

const renderTestimonialTemplate = async () => {
  return /*html*/ `
        <section id="testimonial" class="mt-30 md:mt-50">
                <title-section data-text="نظرات"></title-section>
                <div class="container px-4">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-10 items-center mb-30">
                        <div class="md:col-span-2 relative py-10">
                          <div class="absolute inset-0 bg-linear-to-b from-background via-transparent to-background z-2 pointer-events-none"></div>
                          <div class="flex max-md:flex-col gap-5">
                            <div class="flex flex-col gap-5 h-150 overflow-hidden w-full">
                                <div data-auto-scrolling class="flex flex-col gap-5">
                                  ${await renderTestimonials(2)}
                                </div>
                            </div>
                            <!---->
                            <div class="hidden flex-col gap-5 h-150 overflow-hidden md:flex w-full">
                                <div data-auto-scrolling-reverse data-auto-scrolling class="flex flex-col gap-5" >
                                  ${await renderTestimonials(2)}
                                </div>
                            </div>
                          </div>
                        </div>
                        <div class="md:col-span-1 relative">
                          <!-- polygon gradient background -->
                          <div class="absolute bg-background z-[-1] top-0 left-1/2 hidden md:block rotate-25 blur-3xl">
                            <div style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" class="aspect-video w-200 bg-linear-to-b from-primary to-accent opacity-10"></div>
                          </div>
                          <!---->
                        <div class="flex flex-col gap-10 text-center">
                          <h3 class="text-xl md:text-2xl lg:text-3xl font-semibold text-balance leading-12 mb-5">اگر تجربه‌ای از کار با من داشتید، خیلی خوشحال میشم برام بنویسید.✍</h3>
                          <div class="flex flex-col">
                              <ul class="flex flex-col gap-5">
                                <li class="ghost-btn bg-surface p-4 rounded-full mx-auto relative overflow-hidden w-full">
                                  <p class="flex justify-between items-center gap-3 overflow-x-auto overflow-y-hidden">
                                    <span class="font-semibold">ایمیل:</span>
                                    ${await renderContactInfo()}
                                  </p>
                                </li>
                              </ul>
                              <div class="flex justify-center items-center my-10 gap-5">
                                <div class="w-full h-px bg-text/20"></div>
                                <p>یا</p>
                                <div class="w-full h-px bg-text/20"></div>
                              </div>
                              <div class="mx-auto">
                                <div class="flex items-center gap-3 text-2xl font-semibold">
                                  <span class="block md:hidden">ثبت نظر</span>
                                  <cta-section data-text="ثبت نظر" data-href="/testimonials" data-label="ثبت نظر"></cta-section>
                                </div>
                              </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
        </section>
        `;
};

class Testimonials extends HTMLElement {
  async connectedCallback() {
    await this.render();

    this.allCards = this.querySelectorAll("[data-testimonial-card]");

    this.autoScrollTimeline = [];
    this.autoScrollTrigger = [];
    this.cardHandlers = new Map();

    this.bindEvents();
    this.initScrolling();

    // ensure ScrollTrigger calculates positions after render
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }

  disconnectedCallback() {
    this.autoScrollTimeline.forEach((tl) => tl.kill());
    this.autoScrollTrigger.forEach((st) => st.kill());
    this.unbindEvents();
  }

  initScrolling() {
    const autoScrollEls = this.querySelectorAll("[data-auto-scrolling]");

    autoScrollEls.forEach((item) => {
      const isReverse = item.hasAttribute("data-auto-scrolling-reverse");
      const contentHeight = item.scrollHeight;
      const parentHeight = item.parentElement.clientHeight;

      const distance = contentHeight - parentHeight;

      if (distance <= 0) return;

      const tl = gsap.fromTo(
        item,
        {
          y: isReverse ? distance * -1 : 0,
        },
        {
          y: isReverse ? 0 : distance * -1,
          duration: 10,
          ease: "none",
          repeat: -1,
          paused: true,
        },
      );

      this.autoScrollTimeline.push(tl);

      item.addEventListener("mouseenter", () => tl.pause());
      item.addEventListener("mouseleave", () => tl.resume());

      const st = ScrollTrigger.create({
        trigger: this,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => tl.play(),
        onLeave: () => tl.pause(),
        onEnterBack: () => tl.play(),
        onLeaveBack: () => tl.pause(),
      });

      this.autoScrollTrigger.push(st);
    });
  }

  bindEvents() {
    this.allCards.forEach((card) => {
      const handler = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        gsap.to(card, {
          "--x": `${x}px`,
          "--y": `${y}px`,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      this.cardHandlers.set(card, handler);
      card.addEventListener("mousemove", handler);
    });
  }

  unbindEvents() {
    this.allCards.forEach((card) => {
      const handler = this.cardHandlers.get(card);
      if (handler) card.removeEventListener("mousemove", handler);
    });

    this.cardHandlers.clear();
  }

  async render() {
    this.innerHTML = await renderTestimonialTemplate();
  }
}

customElements.define("testimonial-section", Testimonials);

export default Testimonials;
