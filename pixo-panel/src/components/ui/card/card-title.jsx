/**
 * @property {string} className
 * @property {React.ReactNode} children
 */

import clsx from "clsx";

function CardTitle({ className, children }) {
  return (
    <h3
      className={clsx(
        "text-primary text-lg font-semibold tracking-tight",
        className,
      )}
    >
      {children}
    </h3>
  );
}
export default CardTitle;
