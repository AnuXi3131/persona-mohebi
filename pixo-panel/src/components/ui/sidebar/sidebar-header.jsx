import { NavLink } from "react-router-dom";
import { useSidebar } from "../../../contexts";

function SidebarHeader() {
  const { isOpen } = useSidebar();
  return (
    <header className="border-border flex-center border-b p-3 pb-2">
      <NavLink
        to={"/"}
        className={
          "flex-center hover:bg-accent ease-decelerate w-full items-end rounded-lg duration-200"
        }
      >
        <span className={`${!isOpen && "hidden"}`}>ersona</span>
        <img src="/logo.svg" alt="persona logo" className="h-9 w-6" />
      </NavLink>
    </header>
  );
}

export default SidebarHeader;
