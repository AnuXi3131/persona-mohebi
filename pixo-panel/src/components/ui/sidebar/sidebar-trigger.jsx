import { PanelRight } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Breadcrump } from "..";
import { useSidebar } from "../../../contexts";
import { useMediaQuery } from "react-responsive";

function SidebarTrigger() {
  const isMobileSM = useMediaQuery({ maxWidth: "480px" });
  const { isOpen, setIsOpen } = useSidebar();
  const location = useLocation();

  return (
    <header className="border-border flex items-center gap-4 border-b p-2">
      <button
        className="hover:bg-accent ease-decelerate rounded-lg p-2 duration-200"
        aria-label="toggle panel sidebar"
        onClick={() => setIsOpen(!isOpen)}
      >
        <PanelRight />
      </button>
      <div className={isOpen && isMobileSM ? "hidden" : ""}>
        {location.pathname === "/" ? (
          "صفحه اصلی"
        ) : location.key === "default" ? (
          "صفحه 404"
        ) : (
          <Breadcrump />
        )}
      </div>
    </header>
  );
}
export default SidebarTrigger;
