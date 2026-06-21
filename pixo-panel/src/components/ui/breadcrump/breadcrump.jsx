import { AnimatePresence, motion as Motion } from "motion/react";
import { ChevronLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function Breadcrump() {
  const location = useLocation();
  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb, i) => {
      return (
        <span key={crumb}>
          {crumb}
          {i < 1 && " / "}
        </span>
      );
    });

  return (
    <div className="flex items-center gap-2">
      <Link to="/" className="max-sm:hidden">
        صفحه اصلی
      </Link>
      <AnimatePresence mode="wait">
        <Motion.p
          key={location.pathname}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.1 }}
          className="flex items-center gap-2"
        >
          {crumbs && <ChevronLeft size={16} />}
          <span className="text-muted-foreground flex gap-2">{crumbs}</span>
        </Motion.p>
      </AnimatePresence>
    </div>
  );
}
export default Breadcrump;
