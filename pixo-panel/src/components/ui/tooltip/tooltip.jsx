import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion as Motion } from "motion/react";
import { useFloating } from "../../../hooks";

function Tooltip({
  content,
  position = "top",
  offset = 8,
  customWidth = 0,
  className,
  children,
}) {
  const [visible, setVisible] = useState(false);
  const [animatePosition, setAnimatePosition] = useState({ x: 0, y: -10 });
  const triggerRef = useRef(null);
  const maxWidth = 160;

  useEffect(() => {
    switch (position) {
      case "top":
        setAnimatePosition({ x: 0, y: -10 });
        break;
      case "bottom":
        setAnimatePosition({ x: 0, y: 10 });
        break;
      case "right":
        setAnimatePosition({ x: 10, y: 0 });
        break;
      case "left":
        setAnimatePosition({ x: -10, y: 0 });
        break;
    }
  }, [position]);

  const { coords, width } = useFloating({
    isVisible: visible,
    triggerRef,
    placement: position,
    offset,
    widthMode: "center",
    customWidth: maxWidth + customWidth,
  });

  return (
    <>
      <span
        ref={triggerRef}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
        className={clsx(className)}
      >
        {children}
      </span>

      {createPortal(
        <AnimatePresence mode="wait">
          {visible && (
            <Motion.div
              initial={{ opacity: 0, ...animatePosition }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, ...animatePosition }}
              transition={{ duration: 0.2, ease: "easeInOut", damping: 100 }}
              className={
                "bg-muted-foreground text-primary-foreground font-weight-medium pointer-events-none fixed z-50 w-max rounded-lg p-1 text-center text-sm text-pretty"
              }
              style={{
                top: coords.top,
                left: coords.left,
                width: width + "px",
              }}
            >
              {content}
            </Motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}
export default Tooltip;
