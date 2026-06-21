import { database } from "../appwrite/appwrite.config";
import { DATABASE_ID, THEME_SETTINGS_ID } from "../appwrite";
import { themes } from "../../constants/themes";

async function getTheme() {
  try {
    const currentTheme = await database.getDocument({
      databaseId: DATABASE_ID,
      collectionId: THEME_SETTINGS_ID,
      documentId: THEME_SETTINGS_ID,
    });

    return {
      theme: currentTheme.theme_name || "rose",
      font: currentTheme.font_face || "dana",
    };
  } catch {
    return { theme: "rose", font: "dana" };
  }
}

export async function applyFont() {
  const { font } = await getTheme();
  if (typeof font !== "string") return;

  const { value, url } = JSON.parse(font);

  Object.entries(url).forEach(([weight, path]) => {
    const style = document.createElement("style");

    const fontWeight =
      weight === "bold" ? 700 : weight === "medium" ? 500 : 400;
    style.innerHTML = `
        @font-face{
          font-family : "${value}-${weight}";
          src : url(${path}) format("truetype");
          font-weight : ${fontWeight};
          font-display : swap;
        }
      `;

    document.head.appendChild(style);
    document.documentElement.style.fontFamily = `${value}-${weight}`;
    document.documentElement.style.setProperty(
      `--font-base-${weight}`,
      `${value}-${weight}`,
    );
  });
}

export async function applyTheme() {
  const { theme } = await getTheme();

  const mode =
    localStorage.theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : localStorage.theme;

  const selectedTheme = themes[theme][mode];
  if (!selectedTheme) return;

  Object.entries(selectedTheme).forEach(([key, value]) => {
    document.documentElement.style.setProperty(`--color-${key}`, value);
  });
}

window.addEventListener("themechange", () => applyTheme());
