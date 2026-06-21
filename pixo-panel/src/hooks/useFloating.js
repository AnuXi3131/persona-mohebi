import { useCallback, useEffect, useState } from "react";

export function useFloating({
  isVisible,
  triggerRef,
  placement = "bottom",
  offset = 8,
  widthMode = "auto",
  customWidth = 0,
}) {
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const [width, setWidth] = useState(null);

  const updatePosition = useCallback(() => {
    if (!isVisible || !triggerRef?.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    let top = 0;
    let left = 0;

    // width handling
    if (widthMode === "trigger") {
      setWidth(rect.width + customWidth);
    } else if (widthMode === "auto") {
      setWidth("auto");
    } else if (widthMode === "center") {
      setWidth(customWidth);
    }

    switch (placement) {
      case "top":
        top = rect.top - offset;
        left =
          widthMode === "center"
            ? rect.left + rect.width / 2 - customWidth / 2
            : rect.left;
        break;

      case "bottom":
        top = rect.bottom + offset;
        left =
          widthMode === "center"
            ? rect.left + rect.width / 2 - customWidth / 2
            : rect.left;
        break;

      case "left":
        top = rect.top + rect.height / 2;
        left =
          rect.left -
          (widthMode === "center" ? customWidth : rect.width) -
          offset;
        break;

      case "right":
        top = rect.top + rect.height / 2;
        left = rect.right + offset;
        break;
    }

    setCoords({ top, left });
  }, [isVisible, triggerRef, placement, offset, customWidth, widthMode]);

  useEffect(() => {
    updatePosition();
  }, [updatePosition]);

  return { coords, width };
}
