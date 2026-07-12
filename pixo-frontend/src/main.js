import Router from "./router";
import NotFound from "./pages/NotFound";
import { routes } from "./constants";

import "./features/ScrollLine";
import "./features/Cursor";

import "./components/header/Header";
import "./components/footer/Footer";
import "./components/SquareBackground";
import "./components/Button";
import "./components/Select";
import "./components/EmptyState";
import "./components/Socials";
import "./components/TitleSection";
import "./components/CtaSection";
import "./components/blog/BlogCard";
import "./components/blog/BlogPost";

import "./components/hero/Hero";
import "./components/sections/videos/Videos";
import "./components/sections/about/About";
import "./components/sections/services/Services";
import "./components/sections/gallery/Gallery";
import "./components/sections/experience/Experience";
import "./components/sections/testimonials/Testimonials";
import "./components/sections/contact/Contact";

import trackView from "./lib/pageViews";
import {
  applyTheme,
  applyFont,
  applyHeadSettings,
  getSettings,
} from "./services/api";

new Router(routes, NotFound);

async function renderFooter() {
  const { visible_pages } = await getSettings();
  const sections = JSON.parse(visible_pages);
  if (sections?.footer) {
    document.querySelector("c-footer")?.remove();
  }
}

async function initData() {
  await trackView();
  await renderFooter();
  await applyHeadSettings();
  await applyTheme();
  await applyFont();
}

await initData();
