import clsx from "clsx";

function DialogTitle({ className, children }) {
  return (
    <h2
      className={clsx(
        "text-primary text-lg font-semibold tracking-tight",
        className,
      )}
    >
      {children}
    </h2>
  );
}
export default DialogTitle;
