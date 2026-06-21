import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion as Motion } from "motion/react";
import { useEscapeKey, useOutsideClick } from "../../../hooks";

const DialogContext = createContext(null);

export default function Dialog({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const dialogRef = useRef(null);

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  useEscapeKey(isOpen, () => handleOpen(false));
  useOutsideClick(dialogRef.current, () => handleOpen(false));

  function handleOpen(state) {
    if (!isControlled) setInternalOpen(state);
    onOpenChange?.(state);
  }

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  const value = {
    isOpen,
    open: () => handleOpen(true),
    close: () => handleOpen(false),
  };

  return (
    <DialogContext.Provider value={value}>
      {createPortal(
        <AnimatePresence mode="wait">
          {isOpen && (
            <>
              <Motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="bg-background/80 fixed inset-0 z-50"
              ></Motion.div>
              <Motion.div
                ref={dialogRef}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                role="dialog"
                aria-modal="true"
                className="border-border text-foreground bg-background fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 overflow-hidden overflow-y-auto rounded-2xl border border-solid p-3 shadow-lg sm:max-w-[425px] md:p-6"
              >
                {children}
              </Motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </DialogContext.Provider>
  );
}

/**
 * @param {Function} open
 * @param {boolean} defaultOpen
 * @param {Function} onOpenChange
 * @param {React.ReactNode} children
 */
export function useDialog() {
  return useContext(DialogContext);
}
