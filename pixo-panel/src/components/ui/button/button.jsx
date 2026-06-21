import clsx from "clsx";

/**
 *
 * @property {string} type => default: button | submit
 * @property {string} label
 * @property {string} varient => default: default | secondary | outline | destructive
 * @property {React.ReactNode} icon => Hearth | Sheild ...
 * @property {iconPosition} iconPosition => right
 * @property {Function} onClick => () => void
 * @property {boolean} loading => react state => true | false
 * @property {string} className => css styles
 * @property {ReactRefObject} ref => react ref
 */

function Button({
  type = "button",
  label,
  varient = "default",
  icon,
  iconPosition,
  onClick,
  loading,
  className,
  ref,
}) {
  const varients = {
    default: "bg-foreground text-background hover:opacity-90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
    outline:
      "bg-card text-foreground/80 border border-solid border-border hover:bg-accent/90 hover:text-foreground",
    destructive:
      "hover:bg-destructive/20 text-destructive border border-solid border-border",
  };
  const Icon = icon;

  return (
    <button
      ref={ref}
      type={type}
      className={clsx(
        "flex-center focus-visible:ring-input focus-visible:ring-solid gap-2 rounded-lg px-5 py-2 duration-100 focus-visible:ring-4 disabled:cursor-not-allowed",
        varients[varient],
        iconPosition === "right" && "flex-row-reverse",
        className,
      )}
      onClick={onClick}
      disabled={loading}
    >
      {label && <span>{label}</span>}
      {Icon && <Icon size={16} className={loading ? "animate-spin" : ""} />}
    </button>
  );
}
export default Button;
