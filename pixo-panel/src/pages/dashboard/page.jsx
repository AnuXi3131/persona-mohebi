import { PageHeader } from "../../components/ui";
import BlogPosts from "./blog-posts";
import ServerStatus from "./server-status";
import SiteViews from "./site-views";
import Testimonials from "./testimonials";

function Dashboard() {
  return (
    <section>
      <PageHeader
        pageTitle={"داشبورد"}
        title={"داشبورد ادمین"}
        sub={"مشاهده آمار بازدید و نمای کلی وضعیت"}
      />

      <div className="container px-4">
        <div className="grid-items-2 pb-8">
          <SiteViews />
          <ServerStatus />
          <Testimonials />
          <BlogPosts />
        </div>
      </div>
    </section>
  );
}
export default Dashboard;
