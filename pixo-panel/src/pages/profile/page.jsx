import { PageHeader, Tabs } from "../../components/ui";
import BrandSettings from "./brand-settings";
import SocialSettings from "./social-settings/page";
import ContactSettings from "./contact-settings";

const tabs = [
  { id: 1, label: "تنظیمات برند", key: "brand" },
  { id: 2, label: "شبکه های اجتماعی", key: "socials" },
  { id: 3, label: "اطلاعات تماس", key: "contact" },
];

const components = [
  { id: 1, component: <BrandSettings /> },
  { id: 2, component: <SocialSettings /> },
  { id: 3, component: <ContactSettings /> },
];

function Profile() {
  return (
    <section>
      <PageHeader
        pageTitle={"تنظیمات پروفایل"}
        title={"تنظیمات پروفایل"}
        sub={"اطلاعات شخصی برای تماس و برندینگ را تنظیم کنید"}
      />
      <Tabs tabs={tabs} components={components} />
    </section>
  );
}

export default Profile;
