import Loader from "../components/Loader";
import { getBlogPosts } from "../services/api";
import { STORAGE_ID } from "../services/appwrite";
import { storage } from "../services/appwrite/appwrite.config";
import { hide, show } from "../utils/animationUtils";

function Blog() {
  return /*html*/ `
         <section class="animate-fade-in" >
          <div class="mt-30 md:mt-50">
            <title-section data-text="بلاگ"></title-section>
            <div class="container px-4">
              <header class="relative max-w-4xl mx-auto flex items-center mb-20">
                <input data-input type="search" placeholder="جستجوی مقالات..." class="appearance-none duration-200 ease-decelerate pr-12!"/>
                <i class="absolute right-4 top-4 text-2xl text-muted">
                  <ion-icon name="search-outline"></ion-icon>
                </i>
              </header>
             <div data-posts-grid class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20"></div>
          </div> 
        </section>
    `;
}

async function init() {
  const elements = {
    postsGrid: document.querySelector("[data-posts-grid]"),
    searchInput: document.querySelector("[data-input]"),
  };

  function handleSearch(e) {
    const query = e.target.value.trim().toLowerCase();
    const postsTitle = elements.postsGrid.querySelectorAll("[data-post-title]");

    if (!query) {
      postsTitle.forEach((title) => {
        show(title.closest("blog-card"), "fade-in", "fade-out");
      });
    }

    postsTitle.forEach((title) => {
      const match = title.textContent.trim().toLowerCase().includes(query);

      title.closest("blog-card").style.display = match
        ? show(title.closest("blog-card"), "fade-in", "fade-out")
        : hide(title.closest("blog-card"), "fade-in", "fade-out");
    });
  }

  async function initPosts() {
    Loader(document.body, true);
    elements.postsGrid.innerHTML = "";

    const thumbnail = (post) =>
      storage.getFileDownload({
        bucketId: STORAGE_ID,
        fileId: post.file,
      });

    try {
      const posts = await getBlogPosts();

      if (posts.length) {
        elements.postsGrid.innerHTML = posts
          .map(
            (post) => /*html*/ `
                <blog-card
                data-thumbnail="${thumbnail(post)}"
                data-title="${post.title}"
                data-description="${post.description}"
                data-date="${post.$createdAt}"
                data-blog-id="/blog/${post.$id}">
                </blog-card>
        `,
          )
          .join("");
        return;
      }
      elements.postsGrid.innerHTML = /*html*/ `<div class="col-span-full">
        <empty-state message="مقاله ای یافت نشد."></empty-state>
      </div>`;
    } catch {
      elements.postsGrid.innerHTML = /*html*/ `<div class="col-span-full">
        <empty-state message="خطایی در بارگذاری مقالات رخ داد."></empty-state>
      </div>`;
    } finally {
      Loader(document.body, false);
    }
  }

  await initPosts();
  elements.searchInput.addEventListener("input", (e) => handleSearch(e));
}

export default {
  render: Blog,
  setup: init,
};
