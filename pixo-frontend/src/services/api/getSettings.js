import { database } from "../appwrite/appwrite.config";
import { DATABASE_ID, SITE_SETTINGS_ID } from "../appwrite";
import { getFileUrl } from "../../utils/getFileUrl";

export async function getSettings() {
  try {
    const settings = await database.getDocument(
      DATABASE_ID,
      SITE_SETTINGS_ID,
      SITE_SETTINGS_ID,
    );
    return settings || {};
  } catch (error) {
    console.error(error.message);
    return {};
  }
}

export async function applyHeadSettings() {
  const { brand_name, logo, fav_icon, keywords, description } =
    await getSettings();

  const logoSrc = getFileUrl(logo);
  const favSrc = getFileUrl(fav_icon);

  document.head.innerHTML += /*html*/ `
      <title>${brand_name} | صفحه اصلی</title>
      <link rel="icon" type="image/svg+xml" href="${favSrc || "./logo.svg"}" />
      <meta
      name="description"
      content="${description}"
      />
      <meta
        name="keywords"
        content="${keywords}"
      />
      <meta property="og:title" content="${brand_name}" />
      <meta property="og:description" content="${description}" />
      <meta
        name="og:keywords"
        content="${keywords}"
      />
      <meta property="og:image" content="${logoSrc || "./logo.svg"}" />
      <meta property="og:url" content="${location.origin}" />
    `;
}
