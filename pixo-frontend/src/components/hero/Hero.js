import { brandName } from "../../constants";
import { gsap, ScrollTrigger } from "../../utils/gsapSetup";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { getHero } from "../../services/api";
import { getFileUrl } from "../../utils/getFileUrl";
gsap.registerPlugin(ScrollToPlugin);

const renderHeroImage = async () => {
  const { file } = await getHero();
  const heroImgSrc = getFileUrl(file);
  return /*html*/ `
    <img src="${heroImgSrc || "./images/placeholder/no-image.jpg"}" alt="${brandName.fa}" loading="lazy" class="rounded-full object-cover lg:rounded-lg size-full md:w-full md:max-h-[80svh]"/>
  `;
};

const renderBioTitle = async () => {
  const { title } = await getHero();
  return /*html*/ `
    <h1 class="text-pretty mb-10 text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-relaxed">
      ${title || `سلام من ${brandName.fa} هستم`}
    </h1>
  `;
};

const renderJobs = async () => {
  const { jobs } = await getHero();
  if (jobs) {
    return jobs
      .split(",")
      .filter((job) => job.trim() !== "")
      .map(
        (item) => /*html*/ `
          <li data-job-item>
            <span>${item}</span>
          </li>
      `,
      )
      .join("");
  }
  return "شغلی وارد نشده";
};

const renderHeroTemplate = async () => {
  return /*html*/ `
            <section id="hero" class="pt-10 md:pt-20 relative z-1">
                <!---->
                <square-bg></square-bg>
                <!---->
                <div class="container px-4">
                    <div class="grid md:grid-cols-2 items-center gap-10">
                        <!----> 
                        <div class="text-center lg:text-right">
                            <!---->
                            <div class="mb-10 md:mb-20">
                                ${await renderBioTitle()}
                                <!---->
                                <div class="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-pretty text-xl font-normal md:text-2xl text-muted lg:flex-nowrap">
                                    <!----> 
                                    <span>فعالیت های من در حوزه</span>
                                    <div class="flex flex-col overflow-hidden max-h-9 ghost-btn text-white py-1 px-4 rounded-lg text-2xl text-center">
                                      <ul data-job-list class="font-semibold -mt-1">${await renderJobs()}</ul>
                                    </div>
                                    <span>می باشد.</span>
                                    <!----> 
                                </div>
                                <!---->
                            </div>
                            <!----> 
                            <div class="mt-10 mb-20 md:mt-20 flex justify-center items-center gap-5 md:justify-start flex-col md:flex-row">
                                <p class="text-nowrap">شبکه های اجتماعی:</p>
                                <c-socials></c-socials>
                            </div>
                            <!----> 
                            <button data-scroll-down-btn class="font-montserrat cursor-pointer relative size-32 lg:size-42 flex items-center justify-center mx-auto bg-background group" aria-label="scroll to down">
                                <!----> 
                                <svg viewBox="0 0 200 200" id="circle-text" class="w-full h-full text-white">
                                    <defs>
                                        <path id="circlePath" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0"/>
                                    </defs>
                                    <text dy="5" class="uppercase tracking-widest text-sm font-bold">
                                        <textPath href="#circlePath" class="text-xl fill-muted/70 tracking-[5px]" startOffset="100%">
                                            Scroll Down - Scroll Down -
                                        </textPath>
                                    </text>
                                </svg>
                                <!----> 
                                <span class="absolute text-xl duration-200 ease-decelerate group-hover:translate-y-2 group-focus:translate-y-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-down-icon lucide-arrow-down"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
                                </span>
                                <!----> 
                            </button>
                        </div>
                        <!----> 
                        <div class="flex justify-center items-center max-md:-order-1">
                            <figure class="relative size-70 lg:size-full flex justify-center items-center lg:p-0.5">
                                ${await renderHeroImage()}
                            </figure>
                        </div>
                       <!---->                       
                    </div>
                </div>
            </section>
        `;
};

class Hero extends HTMLElement {
  async connectedCallback() {
    await this.render();

    this.words = this.querySelectorAll("[data-job-list] [data-job-item]");
    this.circleText = this.querySelector("#circle-text");

    this.wordTimeline = null;
    this.wordTrigger = null;
    this.textTimeline = null;
    this.textTrigger = null;

    this.animateWords();
    this.rotateText();

    this.scrollDownBtn = this.querySelector("[data-scroll-down-btn]");
    this.scrollDownBtn.addEventListener("click", this.scrollToHandler);
  }

  disconnectedCallback() {
    this.wordTimeline.kill();
    this.wordTrigger.kill();
    this.textTimeline.kill();
    this.textTrigger.kill();

    this.scrollDownBtn.removeEventListener("click", this.scrollToHandler);
  }

  async render() {
    this.innerHTML = await renderHeroTemplate();
  }

  animateWords() {
    this.wordTimeline = gsap.timeline({
      repeat: -1,
      repeatDelay: 1,
      paused: true,
    });

    this.words.forEach((_, i) => {
      this.wordTimeline
        .to(this.words, {
          yPercent: -100 * i,
          duration: 1,
          ease: "none",
        })
        .to({}, { duration: 1.5 });
    });

    this.wordTrigger = ScrollTrigger.create({
      trigger: this,
      start: "top bottom",
      end: "bottom top",
      onEnter: () => this.wordTimeline.play(),
      onLeave: () => this.wordTimeline.pause(),
      onEnterBack: () => this.wordTimeline.play(),
      onLeaveBack: () => this.wordTimeline.pause(),
    });
  }

  rotateText() {
    this.textTimeline = gsap.timeline({ paused: true });

    this.textTimeline.to(this.circleText, {
      rotation: 360,
      duration: 20,
      ease: "none",
      repeat: -1,
      transformOrigin: "center center",
    });

    this.textTrigger = ScrollTrigger.create({
      trigger: this,
      start: "top bottom",
      end: "bottom top",
      onEnter: () => this.textTimeline.play(),
      onLeave: () => this.textTimeline.pause(),
      onEnterBack: () => this.textTimeline.play(),
      onLeaveBack: () => this.textTimeline.pause(),
    });
  }

  scrollToHandler() {
    gsap.to(window, { scrollTo: "#about" });
  }
}

customElements.define("hero-section", Hero);

export default Hero;
