import clsx from "clsx";

/**
 *
 * @property {string} type => text | email | number | color ...
 * @property {string} name
 * @property {string} id
 * @property {string} placeholder
 * @property {boolean} disabled
 * @property {string} autoComplete => on | off
 * @property {string} className
 * @property {Function} register
 * @property {string} error
 * @property {string} value
 * @property {string} varient => default | rounded
 * @property {Function} onChange
 * @property {Function} handleOnKeyDown
 * @property {boolean} separateWithComma => true | false
 * @property {string} dir => rtl | ltr
 * @property {React.Ref} ref
 */

function Input({
  type = "text",
  name,
  id,
  placeholder,
  disabled,
  autoComplete = "on",
  className,
  register,
  error,
  value,
  varient = "default",
  onChange,
  handleOnKeyDown,
  separateWithComma = false,
  dir = "rtl",
  ref,
}) {
  function handleTabInsertComma(e) {
    if (!separateWithComma) return;

    if (e.key === "Enter") {
      e.preventDefault();
      const input = e.target;

      if (!input.value) return;
      input.value = input.value + ", ";
    }
  }

  function handleKeyDown(e) {
    if (typeof handleOnKeyDown === "function") {
      handleOnKeyDown(e);
    }

    handleTabInsertComma(e);
  }

  const varients = {
    default: "rounded-lg",
    rounded: "rounded-full",
  };

  return (
    <div className="grid gap-1 text-left">
      <input
        ref={ref}
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        className={clsx(
          varients[varient],
          "default-input",
          dir === "ltr" && "text-left placeholder:text-left",
          error && "border-destructive focus-visible:ring-destructive",
          className,
        )}
        dir={dir}
        value={value}
        disabled={disabled}
        autoComplete={autoComplete}
        onChange={onChange}
        {...register?.(name)}
        onKeyDown={handleKeyDown}
      />
      {error && (
        <span className="text-destructive text-sm">{error.message}</span>
      )}
    </div>
  );
}
export default Input;
