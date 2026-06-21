import { initPlyrPlayers, audioControls } from "../../helpers/player";
import { useInfiniteMedia } from "../../services/api";
import { GALLERY_AUDIOS_ID } from "../../services/appwrite";
import { getFileUrl } from "../../utils/getFileUrl";
import Loader from "../Loader";

let audiosManager;

const renderAudios = (audios, startIndex = 0) => {
  return audios
    .map(({ title, file, thumbnail }, i) => {
      const index = startIndex + i;
      const audioSrc = getFileUrl(file);
      const thumbnailSrc = getFileUrl(thumbnail);

      return /*html*/ `
        <div class="border border-solid border-border rounded-lg overflow-hidden">
          <figure style="background-image:url(${thumbnailSrc || "./images/placeholder/no-image.jpg"})" class="relative bg-surface bg-center bg-contain bg-no-repeat w-full aspect-video rounded-t-lg overflow-hidden">
            <span class="absolute -bottom-15 inset-0 bg-linear-to-b from-transparent via-transparent to-black/50"></span>
          </figure>
          <audio 
            data-audio-plyr
            id="audio-${index}"
            class="plyr__audio-embed w-full overflow-hidden"
            controls
            style="--plyr-color-main: var(--color-accent)"
            >
            <source src="${audioSrc}" />
          </audio>
          <p class="bg-surface p-4 text-center text-lg border-t border-solid border-border">${title || "بدون عنوان"}</p>
        </div>
        `;
    })
    .join("");
};

function Audios() {
  return /*html*/ `
    <div data-audios-container class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"></div>
  `;
}

async function init() {
  audiosManager = useInfiniteMedia(GALLERY_AUDIOS_ID);

  const elements = {
    container: document.querySelector("[data-audios-container]"),
  };

  Loader(document.body, true);

  try {
    const audios = await audiosManager.fetchInitial();
    if (audios.length === 0) {
      elements.container.innerHTML = /*html*/ `<empty-state message="هیچ صوتی آپلود نشده" class="col-span-full"></empty-state>`;
    } else {
      elements.container.innerHTML = renderAudios(audios, 0);
      initPlyrPlayers("[data-audio-plyr]", audioControls);
      setupObserver();
    }
  } catch (error) {
    elements.container.innerHTML = /*html*/ `<empty-state message='خطا در بارگذاری صوت‌ها'></empty-state>`;
  } finally {
    Loader(document.body, false);
  }

  function setupObserver() {
    const lastItem = elements.container.lastElementChild;
    if (!lastItem || !audiosManager.hasMore()) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && audiosManager.hasMore()) {
          Loader(document.body, true);
          audiosManager
            .fetchMore()
            .then((newAudios) => {
              if (newAudios.length > 0) {
                const startIndex = elements.container.children.length;
                elements.container.innerHTML += renderAudios(
                  newAudios,
                  startIndex,
                );
                initPlyrPlayers("[data-audio-plyr]", audioControls);
                observer.disconnect();
                setupObserver();
              }
              Loader(document.body, false);
            })
            .catch(() => {
              Loader(document.body, false);
            });
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(lastItem);
  }
}

export default {
  render: Audios,
  setup: init,
};
