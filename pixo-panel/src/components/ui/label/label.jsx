import clsx from "clsx";

/**
 *
 * @property {string} label
 * @property {string} htmlFor
 * @property {React.ReactNode} icon
 * @property {string} className
 */

function Label({ label, htmlFor, icon, className }) {
  const Icon = icon;

  return (
    <label
      htmlFor={htmlFor}
      className={clsx(
        "text-secondary-foreground flex w-full items-center gap-1 select-none",
        className,
      )}
    >
      {Icon && <Icon size={20} className="min-w-8" />}
      <span>{label}</span>
    </label>
  );
}
export default Label;
