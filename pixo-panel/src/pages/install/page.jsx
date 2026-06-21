import { PageHeader, Tabs } from "../../components/ui";
import Bucket from "./bucket";
import Database from "./database";

function Install() {
  const tabs = [
    { id: 1, label: "آپلود سنتر", key: "bucket" },
    { id: 2, label: "دیتابیس", key: "database" },
  ];

  const components = [
    { id: 1, component: <Bucket /> },
    { id: 2, component: <Database /> },
  ];

  return (
    <section>
      <PageHeader
        pageTitle={"نصب"}
        title={"نصب و راه اندازی"}
        sub={"نقطه شروع برای نصب و راه اندازی آپلود سنتر و دیتابیس"}
      />
      <Tabs tabs={tabs} components={components} />
    </section>
  );
}
export default Install;
