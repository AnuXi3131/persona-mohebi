import { getSettings } from "../services/api";
import { filterRoutesBySettings } from "../utils/filterRoutesBySettings";

const sections = [
  { key: "hero", element: "<hero-section></hero-section>" },
  { key: "videos", element: "<videos-section></videos-section>" },
  { key: "about", element: "<about-section></about-section>" },
  { key: "services", element: "<services-section></services-section>" },
  { key: "gallery", element: "<gallery-section></gallery-section>" },
  { key: "experience", element: "<experience-section></experience-section>" },
  {
    key: "testimonial",
    element: "<testimonial-section></testimonial-section>",
  },
  { key: "contact", element: "<contact-section></contact-section>" },
];

async function Home() {
  let html;
  const { visible_pages } = await getSettings();

  if (visible_pages) {
    const visibleSections = filterRoutesBySettings(sections, visible_pages);
    html = visibleSections.map((section) => section.element).join("\n");
  } else {
    html = sections.map((section) => section.element).join("\n");
  }

  return /*html*/ `
    <div class="animate-fade-in">
      ${html}
      <videos-section></videos-section>
    </div>
  `;
}

export default Home;
