import clsx from "clsx";

function DialogHeader({ className, children }) {
  return <div className={clsx("grid gap-1", className)}>{children}</div>;
}
export default DialogHeader;
