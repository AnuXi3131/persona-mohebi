import clsx from "clsx";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion as Motion } from "motion/react";
import { Check, ChevronDown } from "lucide-react";
import { useOutsideClick, useEscapeKey, useFloating } from "../../../hooks";
import { Button } from "..";

/**
 *
 * @property {string} mode single | multi
 * @property {React.ReactNode} triggerIcon Dots | Options...
 * @property {string} triggerText button text
 * @property {Function} triggerOnClick cb function
 * @property {Array} options items array to select
 * @property {boolean} isOpen dropdown visibiliy state
 * @property {Function} setIsOpen handler for dropdown visibility state
 * @property {any} activeCond comparison condition to add checkmark
 * @property {Function} menuItemOnClick handler after click on option happend
 * @property {Array} selectedValues array of multi selected values
 * @property {Function} setSelectedValues handle options selection state changes
 * @property {object} fieldKeys options keys and label - label: "label" & value: "value"
 * @property {boolean} checkmark option to remove checkmark - true | false
 * @property {string} position
 * @property {number} offset
 * @property {number} customWidth
 * @property {string} className
 */

function Dropdown({
  mode = "single",
  triggerIcon,
  triggerText,
  triggerOnClick,
  options = [],
  isOpen,
  setIsOpen,
  activeCond,
  menuItemOnClick,
  selectedValues = [],
  setSelectedValues,
  fieldKeys = {
    label: "label",
    value: "value",
  },
  checkmark = true,
  position = "bottom",
  offset = 8,
  customWidth = 0,
  className,
}) {
  const triggerRef = useRef(null);
  const dropdownRef = useRef(null);
  const TriggerIcon = triggerIcon;
  const getField = (item, key) => item[fieldKeys[key]];

  useOutsideClick(dropdownRef.current, setIsOpen);
  useEscapeKey(isOpen, setIsOpen);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  const { coords, width } = useFloating({
    isVisible: isOpen,
    triggerRef,
    placement: position,
    offset,
    widthMode: "trigger",
    customWidth,
  });

  function handleClick(item) {
    const value = getField(item, "value");

    if (mode === "single") {
      menuItemOnClick(getField(item, "label"), value);
    } else {
      if (selectedValues.includes(value)) {
        setSelectedValues(selectedValues.filter((val) => val !== value));
      } else {
        setSelectedValues([...selectedValues, value]);
      }
    }
  }

  function isChecked(item) {
    const value = getField(item, "value");
    return mode === "single"
      ? value === activeCond
      : selectedValues.includes(value);
  }

  function detectButtonVarient(value) {
    let style;

    switch (value) {
      case "delete":
        style = "text-destructive hover:bg-destructive/20";
        break;
      default:
        style = "text-popover-foreground hover:bg-input";
        break;
    }

    return style;
  }

  return (
    <>
      <div ref={dropdownRef} className={clsx("relative", className)}>
        <Button
          ref={triggerRef}
          varient="outline"
          label={triggerText}
          icon={TriggerIcon || ChevronDown}
          onClick={triggerOnClick}
          className={"font-weight-medium"}
        />
      </div>

      {createPortal(
        <AnimatePresence mode="wait">
          {isOpen && (
            <Motion.ul
              initial={{ y: -10, scale: 0.95, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: -10, scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.1, ease: "easeIn" }}
              className="border-border text-popover-foreground bg-accent font-weight-light fixed z-50 max-h-60 overflow-y-auto rounded-lg border border-solid p-1"
              style={{
                top: coords.top,
                left: coords.left,
                width: width + "px",
              }}
            >
              {options.map((item, index) => (
                <li key={index}>
                  <button
                    className={clsx(
                      "ease-decelerate relative flex w-full gap-2 rounded-sm px-2 py-1.5 text-sm duration-100",
                      detectButtonVarient(item.value),
                    )}
                    onClick={() => handleClick(item)}
                  >
                    <span className="flex-center pointer-events-none absolute left-2">
                      {checkmark && isChecked(item) && <Check size={18} />}
                    </span>
                    <span>{getField(item, "label")}</span>
                  </button>
                </li>
              ))}
            </Motion.ul>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}
export default Dropdown;
