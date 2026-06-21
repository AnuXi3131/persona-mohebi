import { AnimatePresence, motion as Motion } from "motion/react";
import { Tooltip } from "..";

function OptionContainer({ options, onDelete }) {
  return (
    options.length > 0 && (
      <div className="grid justify-end">
        <ul className="flex flex-wrap gap-2">
          <AnimatePresence mode="popLayout">
            {options.map((opt, index) => (
              <Tooltip key={index} content={"حذف آیتم"} offset={35}>
                <Motion.button
                  initial={{
                    opacity: 0,
                    y: 10,
                    filter: "blur(6px)",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }}
                  exit={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                    damping: 100,
                  }}
                  type="button"
                  className="bg-accent border-border ease-smooth hover:bg-destructive/20 hover:text-destructive relative rounded-lg border border-solid px-2 py-1 break-all duration-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(index);
                  }}
                >
                  {opt}
                </Motion.button>
              </Tooltip>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    )
  );
}
export default OptionContainer;
