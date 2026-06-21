import { themeIcons } from "../constants";

class ThemeSwitcher {
  constructor(theme, btnElement = null) {
    this.systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    this.theme = theme;
    this.btn = btnElement || document.querySelector("[data-switch-toggle-btn]");

    this.loadTheme();
    this.handleSystemThemeChange();
  }

  handleSystemThemeChange() {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", () => {
        if (localStorage.getItem("theme") === "system") {
          this.applyTheme("system");
        }
      });
  }

  applyTheme(theme) {
    document.documentElement.classList.remove("dark", "light");
    const index = themeIcons.findIndex((i) => i.name === theme);
    this.setTheme(theme, index === -1 ? 0 : index);

    window.dispatchEvent(new CustomEvent("themechange", { detail: theme }));
  }

  setTheme(themeClass, index) {
    localStorage.setItem("theme", themeClass);
    this.updateDOM(themeClass, index);
  }

  loadTheme() {
    const currentTheme =
      localStorage.getItem("theme") || this.theme || "system";
    const index = themeIcons.findIndex((i) => i.name === currentTheme);
    this.updateDOM(currentTheme, index === -1 ? 0 : index);
  }

  updateDOM(themeClass, index) {
    if (!this.btn) return;
    this.btn.innerHTML = themeIcons[index].icon;

    this.withViewTransition(() => {
      document.documentElement.classList.add(
        themeClass === "system" ? this.systemTheme : themeClass,
      );
    });
  }

  withViewTransition(callback) {
    if (!document.startViewTransition) {
      callback();
    } else {
      document.startViewTransition(callback);
    }
  }
}

export default ThemeSwitcher;
