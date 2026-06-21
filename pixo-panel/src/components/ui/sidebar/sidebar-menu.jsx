import clsx from "clsx";
import { menu } from "../../../constants";
import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion as Motion } from "motion/react";
import { useSidebar } from "../../../contexts";
import { createPortal } from "react-dom";
import { useState } from "react";

function SidebarMenu() {
  const { isOpen, setIsOpen } = useSidebar();
  const isMobile = useMediaQuery({ maxWidth: "48rem" });
  const [coords, setCoords] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });
  const [visible, setVisible] = useState(false);
  const [target, setTarget] = useState(false);

  function handleShowTooltip(e, state, index) {
    const rect = e.currentTarget.getBoundingClientRect();
    const top = rect.top;
    const left = rect.left;
    const width = rect.width;
    const height = rect.height;

    setCoords({ top, left, width, height });

    setTarget(index);
    setVisible(state);
  }

  return (
    <>
      <nav className="overflow-y-auto p-3">
        <ul className="flex flex-col gap-6">
          {menu.map(({ path, label, icon }, index) => (
            <li
              key={path}
              onClick={() => isMobile && setIsOpen(false)}
              onMouseEnter={(e) => handleShowTooltip(e, true, index)}
              onMouseLeave={(e) => handleShowTooltip(e, false, index)}
              onFocus={(e) => handleShowTooltip(e, true, index)}
              onBlur={(e) => handleShowTooltip(e, false, index)}
            >
              <NavLink
                to={path}
                data-sidebar-menu-link
                className={
                  "hover:bg-accent ease-decelerate flex items-center justify-center gap-3 rounded-lg p-2 duration-200"
                }
              >
                {icon}
                {isOpen && (
                  <AnimatePresence mode="wait">
                    <Motion.span
                      key={isOpen}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2, delay: 0.2 }}
                      className="flex-1"
                    >
                      {label}
                    </Motion.span>
                  </AnimatePresence>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      {createPortal(
        <AnimatePresence mode="wait">
          {!isOpen && visible && (
            <Motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.1, ease: "easeInOut", damping: 100 }}
              className={clsx(
                "bg-foreground text-background flex-center pointer-events-none fixed right-16 z-50 w-max rounded-sm p-1 text-sm text-nowrap select-none",
              )}
              style={{
                top: coords.top + coords.height / 2 - 14,
                left: coords.left + coords.width + 8,
                transform: "translateY(-50%)",
              }}
            >
              <span className="border-l-foreground absolute top-2 -right-1.5 z-[-1] border-y-6 border-l-6 border-y-transparent"></span>
              {menu[target].label}
            </Motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}

export default SidebarMenu;
