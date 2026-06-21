import { shareOptions } from "../../constants";
import { getReadingTime } from "./getReadingTime";

export class BlogPost extends HTMLElement {
  connectedCallback() {
    const thumbnail = this.dataset.thumbnail || "";
    const title = this.dataset.title || "";
    const date = this.dataset.date || "";
    const content = this.dataset.content || "";

    this.render({ thumbnail, title, date, content });
    this.querySelector("[data-content]").innerHTML = content;

    this.headerObserver = null;

    this.postHeader = this.querySelector("[data-post-header]");
    this.postAside = this.querySelector("[data-post-aside]");

    this.bindEvents();
  }

  disconnectedCallback() {
    this.unbindEvents();
  }

  bindEvents() {
    if (this.postHeader) {
      this.headerObserver = this.observeHeader();
      this.headerObserver.observe(this.postHeader);
    }
  }

  unbindEvents() {
    if (this.headerObserver) {
      this.headerObserver.disconnect();
      this.headerObserver = null;
    }
  }

  observeHeader() {
    if (!this.postAside) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (!entry.isIntersecting) {
          this.postAside.classList.add("opacity-100", "-translate-y-4");
        } else {
          this.postAside.classList.remove("opacity-100", "-translate-y-4");
        }
      },
      { threshold: 0.1 },
    );

    return observer;
  }

  renderPostHeader({ thumbnail, title, content, date, className = "" }) {
    return /*html*/ `
      <div class="${className}">
        <img src="${thumbnail}" alt="${title}" loading="lazy" class="w-full h-auto md:h-112 object-cover rounded-md mb-8"/>
        <div class="space-y-4">
          <h1 class="text-3xl font-bold max-md:text-center break-words">${title}</h1>
          <div class="text-muted text-sm flex flex-col md:flex-row justify-between items-center gap-4">
            ${
              date
                ? /*html*/ `
                <div>
                  <span>تاریخ ایجاد شده:</span>
                  <time datetime="${date}">${new Date(date).toLocaleDateString("fa-IR")}</time>
                </div>
            `
                : ""
            }
            <span data-time-to-read class="p-1 bg-text text-background rounded-full text-nowrap">خواندن ${getReadingTime(content)} دقیقه</span>
          </div>
        </div>
      </div>
    `;
  }

  render({ thumbnail, title, content, date }) {
    this.innerHTML = /*html*/ `
      <div class="mt-30 md:mt-50 animate-fade-in relative z-1">
        <!-- polygon background -->
        <div class="absolute bg-background z-[-1] right-1/2 hidden md:block rotate-25 blur-3xl">
          <div style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" class="aspect-video w-200 bg-linear-to-b from-primary to-accent opacity-10"></div>
        </div>
        <div class="container px-4"> 
          <div class="grid md:grid-cols-12 justify-center gap-8">
            <aside data-post-aside class="hidden md:block col-span-3 opacity-0 duration-400 -translate-y-4 ease-smooth">
              ${this.renderPostHeader({
                thumbnail,
                title,
                content,
                date,
                className: `sticky top-24 bg-surface p-4 rounded-lg border border-solid border-border [&>img]:h-32 [&_[data-time-to-read]]:max-lg:hidden`,
              })}
            </aside>
            <article class="w-full md:col-span-6 max-w-3xl mx-auto p-4 border border-solid border-border rounded-lg shadow-md bg-surface overflow-hidden relative">
              <!-- Post Header -->
              <header data-post-header>
                ${this.renderPostHeader({ thumbnail, title, content, date, className: "mb-8 border-b border-border pb-4 border-solid" })}
              </header>
              <!-- Post Content -->
              <div data-content class="prose prose-neutral max-w-none relative"></div>
              <!-- Share Options -->
              <footer class="mt-8 border-t border-border pt-4 border-solid">
                <div class="flex flex-col justify-between items-center gap-4 md:flex-row">
                  <p class="text-sm text-muted">اشتراک گذاری در شبکه های اجتماعی:</p>
                  <div class="flex items-center gap-4">
                    ${shareOptions
                      .map(({ name, icon, link }) => {
                        return /*html*/ `
                          <div class="[&>c-button>a]:px-3!">
                            <c-button
                            data-tag="a"
                            data-href="${link(window.location.href, title)}"
                            data-icon="${icon}"
                            data-label="اشتراک گذاری در ${name}"
                            data-background="var(--color-background)"
                            data-border="var(--color-border)">
                            </c-button>
                          </div>
                        `;
                      })
                      .join("")}
                  </div>
                </div>
              </footer>
            </article>
            <div class="hidden md:block col-span-3"></div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("blog-post", BlogPost);
