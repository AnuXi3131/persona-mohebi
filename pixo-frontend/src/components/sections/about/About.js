import { getAbout, getSkills } from "../../../services/api";
import { getFileUrl } from "../../../utils/getFileUrl";
import { ScrollTrigger } from "../../../utils/gsapSetup";

const renderAboutText = async (isFullView) => {
  const { title, description } = await getAbout();
  return /*html*/ `
    <h3 class="mb-10 text-4xl font-base-bold">${title || "خلاصه ای از خودم"}</h3>
    <p class="mb-10 text-lg text-muted text-pretty leading-10 max-w-5xl ${isFullView ? "" : "line-clamp-3"}">
      ${description || `<empty-state message="توضیحاتی وارد نشده"></empty-state>`}
    </p>
  `;
};

const renderSkillTooltip = (title) => {
  return /*html*/ `
        <span data-tooltip class="ghost-btn absolute -top-1/2 text-sm font-semibold p-1 text-center rounded-lg pointer-events-none select-none duration-400 ease-snappy translate-y-10 scale-0 opacity-0 max-md:group-hover:-translate-y-3 group-hover:-translate-y-0.5 group-hover:opacity-100 group-hover:scale-100 z-2">${title}</span>
    `;
};

const renderSkills = async () => {
  const skills = await getSkills();
  if (skills.length) {
    return skills
      .map(({ title, file }) => {
        const skillImgSrc = getFileUrl(file);

        return /*html*/ `
            <li class="flex justify-center items-center relative md:p-2 group z-4">
                ${title !== "" ? renderSkillTooltip(title) : ""}
                <figure class="p-2 md:px-4 border-3 border-solid border-border z-3 relative flex justify-center w-full">
                    <img src="${skillImgSrc}" alt="${title || ""}" loading="lazy" class="object-contain size-16 duration-200 ease-decelerate group-hover:scale-110"/>
                    <div class="absolute inset-0 bg-background scale-x-80 scale-y-110 z-[-1]"></div>
                </figure>
            </li>
        `;
      })
      .join("");
  }
  return /*html*/ `
    <empty-state message="هیچ مهارتی آپلود نشده"></empty-state>
  `;
};

class About extends HTMLElement {
  async connectedCallback() {
    this.isFullView = this.dataset.fullView || false;
    await this.render();

    // ensure ScrollTrigger recalculates after content and images render
    requestAnimationFrame(() => ScrollTrigger.refresh());

    // signal page-level that this section finished loading
    try {
      this.dataset.ready = "true";
      this.dispatchEvent(new CustomEvent("section-ready", { bubbles: true }));
    } catch (e) {
      /* ignore */
    }
  }

  async render() {
    this.innerHTML = /*html*/ `
                    <section id="about" class="mt-30 md:mt-50">
                        <!---->
                        <title-section title-section data-text="درباره من"></title-section>
                        <!---->
                        <div class="container px-4 relative">
                            <div class="flex flex-col gap-10 md:gap-20">
                                <!---->
                                <div class="relative max-w-5xl">
                                    ${await renderAboutText(this.isFullView)}
                                    <div class="flex justify-end" ${this.isFullView ? "hidden" : ""}>
                                        <c-button 
                                          data-tag="a" 
                                          data-href="/about" 
                                          data-text="ادامه" 
                                          data-label="رفتن به صفحه درباره من" 
                                          data-icon="arrow-forward-outline" 
                                          data-background="var(--color-primary)" 
                                          data-border="var(--color-border)" 
                                          data-target="_self"
                                          class="text-white">
                                        </c-button>
                                    </div>
                                     <!-- polygon gradient background -->
                                    <div class="absolute bg-background z-[-1] -top-1/2 right-1/5 hidden md:block rotate-25 blur-3xl">
                                      <div style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" class="aspect-video w-200 bg-linear-to-b from-primary to-accent opacity-10"></div>
                                    </div>
                                </div>
                                <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
                                    <!----> 
                                    <div class="md:col-span-1 flex justify-center items-center h-full">
                                      <h3 class="text-4xl text-center w-full md:w-70 px-4 py-3 rounded-xl shadow-2xl shadow-black/10 ghost-btn">مهارت ها</h3>
                                    </div>
                                    <ul class="md:col-span-2 text-lg w-full mx-auto grid place-content-center gap-x-3 gap-y-10 md:gap-5 grid-cols-[repeat(auto-fit,minmax(120px,1fr))]">
                                        ${await renderSkills()}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!---->
                </section>
        `;
  }
}

customElements.define("about-section", About);

export default About;
