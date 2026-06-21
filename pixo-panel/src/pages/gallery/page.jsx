import { PageHeader, Tabs } from "../../components/ui";
import Images from "./images/page";
import Videos from "./videos/page";
import Audios from "./audios/page";

const tabs = [
  { id: 1, label: "عکس ها", key: "images" },
  { id: 2, label: "ویدیو ها", key: "videos" },
  { id: 3, label: "صوت ها", key: "audios" },
];

const components = [
  { id: 1, component: <Images /> },
  { id: 2, component: <Videos /> },
  { id: 3, component: <Audios /> },
];

function Gallery() {
  return (
    <section>
      <PageHeader
        pageTitle={"گالری"}
        title={"گالری"}
        sub={"مدیا های خود را با فرمت های مختلف آپلود کنید"}
      />
      <Tabs tabs={tabs} components={components} />
    </section>
  );
}
export default Gallery;
