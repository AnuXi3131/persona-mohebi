import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { Sidebar } from "../../components/ui";
import { SidebarProvider } from "../../contexts";
import Main from "../main/page";

function DashboardLayout({ children }) {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <SidebarProvider>
      <div className="flex items-stretch">
        <Sidebar />
        <Main children={children} />
      </div>
    </SidebarProvider>
  );
}
export default DashboardLayout;
