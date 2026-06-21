import clsx from "clsx";
import { motion as Motion } from "motion/react";

/**
 *
 * @property {string} label
 * @property {string} sub
 * @property {string} name
 * @property {string} id
 * @property {boolean} disabled
 * @property {string} className
 * @property {Function} register
 * @property {string} error
 * @property {boolean} checked
 */

function Checkbox({
  label,
  sub,
  name,
  id,
  disabled,
  className,
  register,
  error,
  checked,
}) {
  return (
    <div className="grid h-full">
      <input
        id={id}
        name={name}
        type="checkbox"
        disabled={disabled}
        {...register?.(name)}
        hidden
      />
      <label
        htmlFor={id}
        tabIndex={0}
        disabled={disabled}
        className={clsx(
          "ease-decelerate flex h-full cursor-pointer items-start gap-4 rounded-lg border p-3 duration-200 select-none",
          checked
            ? "border-sidebar-primary bg-sidebar-primary/30"
            : "bg-accent hover:bg-accent/50 border-border",
          className,
        )}
      >
        <span
          className={clsx(
            "ease-decelerate flex-center mt-px size-5 min-h-5 min-w-5 rounded border p-px duration-200",
            checked
              ? "border-sidebar-primary bg-sidebar-primary text-white"
              : "border-gray-400 bg-transparent",
          )}
        >
          <Motion.i
            initial={{ scale: 0 }}
            animate={{ scale: checked ? 1 : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="flex-center size-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-check-icon lucide-check"
            >
              <Motion.path
                d="M5 13l4 4L19 7"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: checked ? 1 : 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Motion.i>
        </span>
        <div className="grid h-full gap-1.5">
          <p className="font-weight-bold text-sm">{label}</p>
          <p className="text-muted-foreground text-sm">{sub}</p>
        </div>
      </label>

      {error && (
        <span className="text-destructive text-sm">{error.message}</span>
      )}
    </div>
  );
}
export default Checkbox;
