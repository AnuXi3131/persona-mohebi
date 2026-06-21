import { brandName } from "./constants";
import Loader from "./components/Loader";
import Home from "./pages/Home";

class Router {
  constructor(routes, notFoundPage) {
    this.routes = routes;
    this.notFoundPage = notFoundPage;
    this.contentElm = document.getElementById("content");

    this.init();
  }

  init() {
    window.addEventListener("popstate", () => {
      this.handleLocation(location.pathname);
    });

    document.body.addEventListener("click", (e) => {
      const validLinks = ['a[data-link], c-button a:not([target="_blank"])'];
      const link = e.target.closest(validLinks);
      if (!link) return;
      e.preventDefault();

      const path = link.getAttribute("href");
      this.navigate(path);
    });

    this.handleLocation(location.pathname);
  }

  navigate(path) {
    history.pushState({ name: path }, "", path);
    this.handleLocation(path);
  }

  toggleActiveLink(path) {
    document
      .querySelector("[data-nav-links] a.active")
      ?.classList.remove("active");
    document
      .querySelector(`[data-nav-links] a[href="${path}"]`)
      ?.classList.add("active");
  }

  matchRoute(path) {
    const exactMatch = this.routes.find((r) => r.path === path);
    if (exactMatch) return { route: exactMatch, params: {} };

    for (const route of this.routes) {
      if (!route.path.includes(":")) continue;

      const pathSegments = path.split("/");
      const routeSegments = route.path.split("/");

      if (pathSegments.length !== routeSegments.length) continue;

      let matches = true;
      const params = {};

      for (let i = 0; i < routeSegments.length; i++) {
        if (routeSegments[i].startsWith(":")) {
          params[routeSegments[i].slice(1)] = pathSegments[i];
        } else if (routeSegments[i] !== pathSegments[i]) {
          matches = false;
          break;
        }
      }

      if (matches) return { route, params };
    }

    return null;
  }

  async handleLocation(path) {
    Loader(document.body, true);
    this.toggleActiveLink(path);

    try {
      const match = this.matchRoute(path);

      let html = "";
      let title = "";
      let route = null;

      if (path === "/") {
        html = await Home();
        title = `${brandName.fa} | صفحه اصلی`;
      } else if (match) {
        route = match.route;
        html = await route.content?.(match.params);
        title = `${brandName.fa} | ${route.name}`;
      } else {
        html = this.notFoundPage();
        title = "صفحه پیدا نشد 404";
      }

      this.contentElm.innerHTML = html;
      document.title = title;
      if (route?.init) await route.init(match?.params);
    } finally {
      Loader(document.body, false);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }
}

export default Router;
