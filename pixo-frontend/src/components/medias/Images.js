import { useInfiniteMedia } from "../../services/api";
import { GALLERY_IMAGES_ID } from "../../services/appwrite";
import { show, hide } from "../../utils/animationUtils";
import { getFileUrl } from "../../utils/getFileUrl";
import Loader from "../Loader";

let imagesManager;

const renderImages = (images, startIndex = 0) => {
  return images
    .map(({ file }, i) => {
      const index = startIndex + i;
      const imgSrc = getFileUrl(file);

      return /*html*/ `
          <figure data-gallery-figure data-index="${index}" class="size-full flex justify-center items-center rounded-lg relative overflow-hidden group">
            <img src="${imgSrc}" alt="Gallery image ${index + 1}" loading="lazy" class="border border-solid border-border rounded-lg duration-200 ease-decelerate group-hover:scale-150 group-hover:rotate-15 group-hover:grayscale-100" />
            <!---->            
            <div class="absolute flex items-center inset-0 bg-black/60 translate-y-full duration-200 ease-decelerate group-hover:translate-y-0">
                <div class="w-full flex flex-col gap-1 pr-4 translate-y-full duration-200 ease-decelerate group-hover:translate-y-0">
                    <button class="text-2xl text-white font-semibold text-right">مشاهده</button>
                    <span class="w-0 h-0.5 bg-accent delay-200 duration-600 ease-decelerate group-hover:w-full"></span>
                </div>
                <div class="[clip-path:circle(0%_at_0%_0%)] absolute z-[-1] inset-0 bg-black/50 duration-600 ease-soft group-hover:[clip-path:circle(100%_at_100%_100%)]"></div>
            </div>
          </figure>
        `;
    })
    .join("");
};

function Images() {
  return /*html*/ `
    <div data-images-container class="columns-2 space-y-4 md:columns-3 lg:columns-4">
    </div>
  `;
}

async function init() {
  imagesManager = useInfiniteMedia(GALLERY_IMAGES_ID);

  const elements = {
    container: document.querySelector("[data-images-container]"),
    figures: () => document.querySelectorAll("[data-gallery-figure]"),
    modal: document.querySelector("[data-gallery-modal]"),
    modalImg: document.querySelector("[data-modal-image]"),
    closeModalBtn: document.querySelector("[data-close-modal]"),
    navsBtns: document.querySelector("[data-navs-btns]"),
    navBtnRight: document.querySelector("[data-nav-slide-right]"),
    navBtnLeft: document.querySelector("[data-nav-slide-left]"),
  };

  let imgIndex = null;
  let observer;

  Loader(document.body, true);

  try {
    const images = await imagesManager.fetchInitial();
    if (images.length === 0) {
      elements.container.parentElement.innerHTML = /*html*/ `<empty-state message='هیچ عکسی آپلود نشده'></empty-state>`;
    } else {
      elements.container.innerHTML = renderImages(images, 0);
      setupFigures();
      setupObserver();
    }
  } catch (error) {
    elements.container.parentElement.innerHTML = /*html*/ `<empty-state message='خطا در بارگذاری تصاویر'></empty-state>`;
  } finally {
    Loader(document.body, false);
  }

  function setupFigures() {
    elements.figures().forEach((item) => {
      item.addEventListener("click", () => {
        imgIndex = +item.dataset.index;
        setNavsVisibility();
        openGalleryModal();
        const imgSrc = getFileUrl(imagesManager.getData()[imgIndex].file);
        elements.modalImg.src = imgSrc;
        elements.modalImg.addEventListener("load", () => {
          Loader(elements.modal, false);
        });
      });
    });
  }

  function setupObserver() {
    const lastItem = elements.container.lastElementChild;
    if (!lastItem || !imagesManager.hasMore()) return;

    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && imagesManager.hasMore()) {
          Loader(document.body, true);
          imagesManager
            .fetchMore()
            .then((newImages) => {
              if (newImages.length > 0) {
                const startIndex = elements.figures().length;
                elements.container.innerHTML += renderImages(
                  newImages,
                  startIndex,
                );
                setupFigures();
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

  const openGalleryModal = () => {
    Loader(elements.modal, true);
    show(elements.modal, "fade-in", "fade-out");
    document.body.classList.add("overflow-hidden");
  };

  const closeGalleryModal = () => {
    hide(elements.modal, "fade-in", "fade-out");
    document.body.classList.remove("overflow-hidden");
  };

  elements.navsBtns.addEventListener("click", (e) => {
    const targetBtn = e.target.closest("button");
    if (!targetBtn) return;
    Loader(elements.modal, true);
    if (targetBtn.hasAttribute("data-nav-slide-right")) prevImg();
    else nextImg();
  });

  const setModalImg = (index) => {
    const imgSrc = getFileUrl(imagesManager.getData()[index].file);
    elements.modalImg.src = imgSrc;
    elements.modalImg.onload = () => Loader(elements.modal, false);
  };

  const setNavsVisibility = () => {
    if (imgIndex <= 0) elements.navBtnRight.hidden = true;
    else elements.navBtnRight.hidden = false;
    if (imgIndex >= imagesManager.getData().length - 1)
      elements.navBtnLeft.hidden = true;
    else elements.navBtnLeft.hidden = false;
  };

  const prevImg = () => {
    if (imgIndex <= 0) return;
    imgIndex--;
    setModalImg(imgIndex);
    setNavsVisibility();
  };

  const nextImg = async () => {
    if (imgIndex >= imagesManager.getData().length - 1) {
      if (imagesManager.hasMore()) {
        await imagesManager.fetchMore();
      } else {
        return;
      }
    }
    imgIndex++;
    setModalImg(imgIndex);
    setNavsVisibility();
  };

  elements.modal.addEventListener("click", (e) => {
    const validTargets = ["[data-modal-image]", "[data-navs-btns]"];
    if (!e.target.closest(validTargets)) closeGalleryModal();
  });
  elements.closeModalBtn.addEventListener("click", closeGalleryModal);
  document.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
      closeGalleryModal();
    }
  });
}

export default {
  render: Images,
  setup: init,
};
