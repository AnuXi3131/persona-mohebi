/**
 * @property {string} className
 * @property {React.ReactNode} children
 */

import clsx from "clsx";

function CardHeader({ className, children }) {
  return (
    <div
      className={clsx(
        "border-border bg-card/50 rounded-t-2xl border-b p-3 md:p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}
export default CardHeader;
