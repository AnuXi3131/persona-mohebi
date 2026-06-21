import clsx from "clsx";

function DialogDescription({ className, children }) {
  return (
    <p className={clsx("text-muted-foreground text-sm", className)}>
      {children}
    </p>
  );
}
export default DialogDescription;
