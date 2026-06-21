import clsx from "clsx";
import { useMediaQuery } from "react-responsive";
import { SidebarTrigger, Loader } from "../../components/ui";
import { useSidebar } from "../../contexts";
import { Suspense } from "react";

function Main({ children }) {
  const isMobileSM = useMediaQuery({ maxWidth: "480px" });
  const { isOpen } = useSidebar();
  return (
    <div
      className={clsx(
        "ease-soft w-full flex-1 duration-200",
        isOpen ? "pr-72" : "pr-16",
      )}
    >
      <SidebarTrigger />
      <Suspense fallback={<Loader className={"main-height"} />}>
        <main
          className={clsx(
            "relative z-1 flex flex-col justify-center max-sm:justify-start",
            isOpen && isMobileSM ? "hidden" : "",
          )}
        >
          {children}
        </main>
      </Suspense>
    </div>
  );
}
export default Main;
