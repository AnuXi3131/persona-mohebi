import { useCallback, useEffect } from "react";

/**
 *
 * @property {React.Ref} ref => e.g: ref.current
 * @property {Function} onClose
 */

function useOutsideClick(ref, onClose) {
  const handleClickOutside = useCallback(
    (e) => {
      if (!ref) return;

      const tinyDialog = e.target.closest(
        ".tox-dialog, .tox-dialog-wrap, .tox-pop, .tox-menu",
      );

      if (tinyDialog) return;

      if (ref.contains(e.target)) return;

      onClose?.(false);
    },
    [ref, onClose],
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);
}

export default useOutsideClick;
