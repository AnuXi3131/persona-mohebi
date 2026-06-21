import { useEffect } from "react";

/**
 *
 * @property {boolean} isOpen
 * @property {Function} onClose
 */

function useEscapeKey(isOpen, onClose) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyup = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose(false);
      }
    };

    document.addEventListener("keyup", handleKeyup);
    return () => document.removeEventListener("keyup", handleKeyup);
  }, [isOpen, onClose]);
}

export default useEscapeKey;
