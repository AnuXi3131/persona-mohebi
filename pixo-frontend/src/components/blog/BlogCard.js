export class BlogCard extends HTMLElement {
  connectedCallback() {
    const thumbnail = this.dataset.thumbnail;
    const title = this.dataset.title || "";
    const description = this.dataset.description || "";
    const date = this.dataset.date || "";
    const blogId = this.dataset.blogId || "";

    this.render({ thumbnail, title, description, date, blogId });
  }

  shortDescription(description, maxLength = 200) {
    return description.slice(0, maxLength) + "...";
  }

  render({ thumbnail, title, description, date, blogId }) {
    this.innerHTML = /*html*/ `
        <article class="bg-surface border border-solid border-border p-4 bg-light rounded-lg shadow-md hover:shadow-lg duration-300 flex flex-col gap-8 relative hover:border-primary h-full w-full overflow-hidden">
            <img src="${thumbnail}" alt="${title}" loading="lazy" class="w-full h-60 object-cover rounded-md"/>
            <div class="flex flex-col gap-3 mb-auto">
                <h2 data-post-title class="text-xl font-semibold break-words leading-relaxed">${title}</h2>
                <p class="text-base text-balance text-muted grow leading-8">${this.shortDescription(description)}</p>
            </div>
            ${
              date
                ? /*htrml*/ `
                <div class="flex items-center gap-2 text-sm text-muted">
                  <span>تاریخ ایجاد:</span>
                  <time datetime="${date}">${new Date(date).toLocaleDateString("fa-IR")}</time>
                </div>
                `
                : ""
            }
            <a href="${blogId}" data-link class="absolute inset-0" aria-label="مشاهده مطلب ${title}"></a>
        </article>
        `;
  }
}

customElements.define("blog-card", BlogCard);
