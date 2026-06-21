import clsx from "clsx";

/**
 *
 * @property {string} name
 * @property {string} id
 * @property {string} placeholder
 * @property {boolean} disabled
 * @property {number} rows
 * @property {string} className
 * @property {Function} register
 * @property {string} error
 * @property {string} dir => rtl | ltr
 */

function Textarea({
  name,
  id,
  placeholder,
  disabled,
  rows = 4,
  className,
  register,
  error,
  dir = "rtl",
}) {
  return (
    <div className="grid gap-1 text-left">
      <textarea
        name={name}
        id={id}
        placeholder={placeholder}
        rows={rows}
        className={clsx(
          "default-input resize-none rounded-lg",
          dir === "ltr" && "text-left placeholder:text-left",
          error && "border-destructive focus-visible:ring-destructive",
          className,
        )}
        dir={dir}
        disabled={disabled}
        {...register?.(name)}
      />
      {error && (
        <span className="text-destructive text-sm">{error.message}</span>
      )}
    </div>
  );
}
export default Textarea;
