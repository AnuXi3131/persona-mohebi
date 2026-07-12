import { initPlyrPlayers, videoControls } from "../../../helpers/player";

const videosList = [
  {
    title: "مصاحبه علیرضا محبی",
    src: "/videos/mohebi-introduction.mp4",
    poster: "/images/logo.png",
  },
  {
    title: "سمینار موسسه قسطکا",
    src: "/videos/seminar.mp4",
    poster: "/images/logo.png",
  },
  {
    title: "معرفی مهندس علیرضا محبی",
    src: "/videos/introduction.mp4",
    poster: "/images/logo.png",
  },
  {
    title: "تبلیغات سفیر برند قسطکا",
    src: "/videos/instagram-ads.mov",
    poster: "/images/logo.png",
  },
];

const renderVideos = () => {
  initPlyrPlayers("[data-video-plyr]", videoControls);

  return videosList
    .map(({ poster, src, title }, index) => {
      return /*html*/ `
      <div class="border border-solid border-border rounded-lg overflow-hidden">
          <video 
            data-video-plyr
            data-poster="${poster || "./images/placeholder/no-image.jpg"}"
            id="player-${index}" 
            class="plyr__video-embed w-full rounded-t-lg overflow-hidden" 
            playsinline 
            controls
            style="--plyr-color-main: var(--color-accent);"
            >
            <source src="${src}" />
          </video>
          <p class="bg-surface p-4 text-center text-lg">${title || "بدون عنوان"}</p>
      </div>
    `;
    })
    .join("");
};

export class Videos extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = /*html*/ `
      <title-section title-section data-text="ویدیو ها"></title-section>
      <section id="videos" class="mt-20">
        <div class="container px-4 relative">
          <div class="grid sm:grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            ${renderVideos()}
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define("videos-section", Videos);
