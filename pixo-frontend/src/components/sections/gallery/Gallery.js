import { getMedia } from "../../../services/api";
import { GALLERY_IMAGES_ID } from "../../../services/appwrite";
import { getFileUrl } from "../../../utils/getFileUrl";
import { gsap, ScrollTrigger } from "../../../utils/gsapSetup";

let homeImages = [];

async function loadHomeImages() {
  homeImages = await getMedia({
    collectionId: GALLERY_IMAGES_ID,
  });
}

const renderImages = (repeatCount) => {
  if (homeImages.length) {
    return homeImages
      .map(({ file }, index) => {
        const imgSrc = getFileUrl(file);
        const rotateImg = index % 2 ? "rotate-4" : "-rotate-4";

        return /*html*/ `
          <div data-gallery-slide-item class="size-42 md:size-70 select-none duration-300 ease-bouncy ${rotateImg} hover:rotate-0">
            <img
              src="${imgSrc}"
              alt="Gallery Image ${index + 1}"
              loading="lazy"
              class="size-full object-contain rounded-lg"
            />
          </div>`;
      })
      .join("")
      .repeat(repeatCount);
  }
  return /*html*/ `
    <empty-state message="هیچ عکسی آپلود نشده"></empty-state>
  `;
};

const renderGalleryTemplate = () => {
  return /*html*/ `
        <section id="gallery" class="mt-30 md:mt-50"> 
            <title-section data-text="گالری"></title-section>
            <div class="container px-4 relative">
              <!-- polygon gradient background -->
              <div class="absolute bg-background z-[-1] bottom-0 right-1/2 translate-x-1/2 rotate-20 hidden md:block blur-3xl">
                <div style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" class="aspect-video w-288.75 bg-linear-to-b from-surface to-text opacity-10"></div>
              </div>
              <!---->
              <div class="relative mb-40">
                <div data-gallery-wrapper class="flex gap-10 md:gap-20 w-max">
                    ${renderImages(2)}
                </div>
                <!---->
                <div class="absolute top-0 -left-full h-full w-full bg-background scale-y-200 blur-2xl"></div>
                <div class="absolute top-0 -right-full h-full w-full bg-background scale-y-200 blur-2xl"></div>
              </div>
              <!---->
              <cta-section data-title="برای مشاهده گالری وارد شوید" data-label="مشاهده گالری" data-href="/gallery"></cta-section>
            </div>
        </section>
    `;
};

class Gallery extends HTMLElement {
  async connectedCallback() {
    await loadHomeImages();
    this.render();
    this.galleryWrapper = this.querySelector("[data-gallery-wrapper]");
    this.tl = null;
    this.st = null;

    // wait a frame so images/fonts/layout settle, then init animation
    await new Promise((r) => requestAnimationFrame(r));
    this.animateGallery();

    // refresh ScrollTrigger after animation setup
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }

  disconnectedCallback() {
    this.tl.kill();
    this.st.kill();
  }

  animateGallery() {
    const width = this.galleryWrapper.getBoundingClientRect().width;
    const speed = 50;
    const duration = width / speed;

    this.tl = gsap.fromTo(
      this.galleryWrapper,
      {
        x: 0,
      },
      {
        x: width / 2,
        ease: "none",
        duration: duration,
        repeat: -1,
        paused: true,
      },
    );

    this.st = ScrollTrigger.create({
      trigger: this,
      onEnter: () => this.tl.play(),
      onLeave: () => this.tl.pause(),
      onEnterBack: () => this.tl.play(),
      onLeaveBack: () => this.tl.pause(),
    });
  }

  render() {
    this.innerHTML = renderGalleryTemplate();
  }
}

customElements.define("gallery-section", Gallery);

export default Gallery;
