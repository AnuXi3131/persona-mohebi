import clsx from "clsx";
import SidebarHeader from "./sidebar-header";
import SidebarMenu from "./sidebar-menu";
import SidebarFooter from "./sidebar-footer";
import { useSidebar } from "../../../contexts";

function Sidebar() {
  const { isOpen, setIsOpen } = useSidebar();

  return (
    <aside
      className={clsx(
        "bg-card border-border ease-soft fixed top-0 z-50 min-h-screen max-w-72 rounded-l-lg border-l duration-200",
        isOpen ? "w-72" : "w-16",
      )}
    >
      <div className="flex h-screen flex-col">
        <SidebarHeader />
        <SidebarMenu />
        <SidebarFooter />
      </div>
      <button
        className="outline-border absolute top-0 -left-2 z-2 h-full w-4 cursor-w-resize px-px outline max-md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      ></button>
    </aside>
  );
}

export default Sidebar;
