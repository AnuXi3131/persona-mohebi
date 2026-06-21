// pages/settings/page.jsx
import { PageHeader, Tabs } from "../../components/ui";
import SeoSettings from "./seo-settings";
import PagesControlSettings from "./page-control-settings";
import FooterSettings from "./footer-settings";
import ThemeSettings from "./theme-settings/page";
import FontSettings from "./font-settings/page";

const tabs = [
  { id: 1, label: "تنظیمات سئو", key: "seo" },
  { id: 2, label: "نمایش صفحات", key: "pages" },
  { id: 3, label: "تنظیمات فوتر", key: "footer" },
  { id: 4, label: "تم سفارشی", key: "theme" },
  { id: 5, label: "فونت سفارشی", key: "font" },
];

const components = [
  { id: 1, component: <SeoSettings /> },
  { id: 2, component: <PagesControlSettings /> },
  { id: 3, component: <FooterSettings /> },
  { id: 4, component: <ThemeSettings /> },
  { id: 5, component: <FontSettings /> },
];

function Settings() {
  return (
    <section>
      <PageHeader
        pageTitle={"تنظیمات سایت"}
        title={"تنظیمات سایت"}
        sub={"اطلاعات اصلی سایت، کنترل صفحات و تنظیمات فوتر را اعمال کنید"}
      />
      <Tabs tabs={tabs} components={components} />
    </section>
  );
}

export default Settings;
