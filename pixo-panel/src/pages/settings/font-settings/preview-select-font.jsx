import { toast } from "react-toastify";

function previewSelectFont(font_name, font_url, fontsContainerRef) {
  if (!font_url) {
    toast.error("مسیر فونت یافت نشد");
    return;
  }

  document
    .querySelectorAll(`[data-font-style="dynamic-font"]`)
    ?.forEach((el) => el.remove());

  Object.entries(font_url).forEach(([weight, url]) => {
    const style = document.createElement("style");
    style.setAttribute("data-font-style", "dynamic-font");

    const fontWeight =
      weight === "bold" ? 700 : weight === "medium" ? 500 : 400;

    style.innerHTML = /*css*/ `
      @font-face {
        font-family: "${font_name}";
        src: url("${url}") format("truetype");
        font-weight: ${fontWeight};
        font-display: swap;
      }
    `;

    document.head.appendChild(style);
    fontsContainerRef.current.style.fontFamily = font_name;
  });
}

export default previewSelectFont;
