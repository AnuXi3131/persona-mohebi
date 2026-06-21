/**
 * @property {string} className
 * @property {React.ReactNode} children
 */

import clsx from "clsx";

function Card({ className, children }) {
  return (
    <div
      className={clsx(
        "border-border bg-card text-card-foreground rounded-2xl border shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}
export default Card;
