import { galleryCategories } from "../constants";
import Images from "../components/medias/Images";
import Videos from "../components/medias/Videos";
import Audios from "../components/medias/Audios";

const gallerySections = [
  {
    value: "images",
    render: Images.render,
    init: Images.setup,
  },
  {
    value: "videos",
    render: Videos.render,
    init: Videos.setup,
  },
  {
    value: "audios",
    render: Audios.render,
    init: Audios.setup,
  },
];

const renderGalleryModal = () => {
  return /*html*/ `
    <div data-gallery-modal role="dialog" class="fixed inset-0 flex justify-center items-center bg-black/90 z-[var(--gallery-modal-z-index)]" hidden>
      <button data-close-modal aria-label="close gallery modal" class="absolute top-3 right-4 flex justify-center items-center bg-accent text-white p-3 rounded-lg duration-200 ease-decelerate hover:bg-danger">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>
        <!---->
      <ul data-navs-btns class="max-w-5xl w-full h-max mx-auto px-2 absolute inset-0 top-1/2 -translate-y-1/2 flex justify-between items-center">
        <li>
          <button data-nav-slide-right title="رفتن به عکس قبلی" class="bg-surface border border-solid border-text/50 p-2 rounded-lg duration-200 ease-decelerate hover:bg-primary-blue hover:text-white active:scale-95">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right-icon lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>
        </li>
        <!---->
        <li>
          <button data-nav-slide-left title="رفتن به عکس بعدی" class="bg-surface border border-solid border-text/50 p-2 rounded-lg duration-200 ease-decelerate hover:bg-primary-blue hover:text-white active:scale-95">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left-icon lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
            </button>
        </li>
      </ul> 
      <!---->
      <div class="flex justify-center items-center pt-20 md:pt-0">
        <img data-modal-image src="" class="rounded-lg max-w-3xl w-[90vw] h-auto" loading="lazy" />
      </div>
    </div>
  `;
};

function Gallery() {
  return /*html*/ `
      <section class="animate-fade-in">
        <div class="mt-30 md:mt-50">
            <title-section data-text="گالری"></title-section>
            <div class="container px-4">
                <header class="mb-10 flex max-md:flex-col items-center gap-5 border-b-2 border-solid border-border pb-5">
                  <h3 class="font-semibold text-lg md:text-xl lg:text-2xl">ترتیب نمایش: </h3>
                  <c-select data-options='${JSON.stringify(galleryCategories)}' data-selected="images" data-placeholder="عکس ها" data-id="gallery_category"></c-select>
                </header>
                <!---->
                <main data-gallery-main-content></main>
            </div>
        </div>
      </section>
      <!---->
      <div>${renderGalleryModal()}</div>
      <!---->
    `;
}

function init() {
  let lastSelectedValue = null;

  customElements.whenDefined("c-select").then(async () => {
    const elements = {
      select: document.querySelector("c-select"),
      selectInput: document.querySelector("[data-select-input]"),
      container: document.querySelector("[data-gallery-main-content]"),
    };

    const initDefaultData = gallerySections.find(
      (c) => c.value === elements.selectInput.value,
    );

    elements.container.innerHTML = initDefaultData.render();
    await initDefaultData.init();
    lastSelectedValue = initDefaultData.value;

    elements.select.addEventListener("selectChanged", async (e) => {
      const selectedValue = e.detail.value;

      if (selectedValue === lastSelectedValue) return;

      const targetSection = gallerySections.find(
        (c) => c.value === selectedValue,
      );

      elements.container.innerHTML = targetSection.render();
      await targetSection.init();

      lastSelectedValue = selectedValue;
    });
  });
}

export default {
  render: Gallery,
  setup: init,
};
