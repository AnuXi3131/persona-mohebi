import clsx from "clsx";

function DialogFooter({ className, children }) {
  return (
    <div className={clsx("flex flex-col gap-2 sm:flex-row-reverse", className)}>
      {children}
    </div>
  );
}
export default DialogFooter;
