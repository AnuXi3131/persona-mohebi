import { initPlyrPlayers, videoControls } from "../../helpers/player";
import { useInfiniteMedia } from "../../services/api";
import { GALLERY_VIDEOS_ID } from "../../services/appwrite";
import { getFileUrl } from "../../utils/getFileUrl";
import Loader from "../Loader";

let videosManager;

const renderVideos = (videos, startIndex = 0) => {
  return videos
    .map(({ title, file, thumbnail }, i) => {
      const index = startIndex + i;
      const videoSrc = getFileUrl(file);
      const thumbnailSrc = getFileUrl(thumbnail);

      return /*html*/ `
        <div class="border border-solid border-border rounded-lg overflow-hidden">
          <video 
            data-video-plyr
            data-poster="${thumbnailSrc || "./images/placeholder/no-image.jpg"}"
            id="player-${index}" 
            class="plyr__video-embed w-full rounded-t-lg overflow-hidden" 
            playsinline 
            controls
            style="--plyr-color-main: var(--color-accent);"
            >
            <source src="${videoSrc}" />
          </video>
          <p class="bg-surface p-4 text-center text-lg">${title || "بدون عنوان"}</p>
        </div>`;
    })
    .join("");
};

function Videos() {
  return /*html*/ `
        <div data-videos-container class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"></div>
    `;
}

async function init() {
  videosManager = useInfiniteMedia(GALLERY_VIDEOS_ID);

  const elements = {
    container: document.querySelector("[data-videos-container]"),
  };

  Loader(document.body, true);

  try {
    const videos = await videosManager.fetchInitial();
    if (videos.length === 0) {
      elements.container.innerHTML = /*html*/ `<empty-state message="هیچ ویدیویی آپلود نشده" class="col-span-full"></empty-state>`;
    } else {
      elements.container.innerHTML = renderVideos(videos, 0);
      initPlyrPlayers("[data-video-plyr]", videoControls);
      setupObserver();
    }
  } catch (error) {
    elements.container.innerHTML = /*html*/ `<empty-state message='خطا در بارگذاری ویدیو ها'></empty-state>`;
  } finally {
    Loader(document.body, false);
  }

  function setupObserver() {
    const lastItem = elements.container.lastElementChild;
    if (!lastItem || !videosManager.hasMore()) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && videosManager.hasMore()) {
          Loader(document.body, true);
          videosManager
            .fetchMore()
            .then((newVideos) => {
              if (newVideos.length > 0) {
                const startIndex = elements.container.children.length;
                elements.container.innerHTML += renderVideos(
                  newVideos,
                  startIndex,
                );
                initPlyrPlayers("[data-video-plyr]", videoControls);
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
  render: Videos,
  setup: init,
};
