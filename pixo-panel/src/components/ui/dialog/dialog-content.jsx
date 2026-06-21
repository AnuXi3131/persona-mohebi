import clsx from "clsx";

function DialogContent({ className, children }) {
  return (
    <div className={clsx("grid max-h-[425px] gap-4", className)}>
      {children}
    </div>
  );
}
export default DialogContent;
