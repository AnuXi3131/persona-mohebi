/**
 * @property {string} className
 * @property {React.ReactNode} children
 */

import clsx from "clsx";

function CardContent({ className, children }) {
  return (
    <div
      className={clsx("text-foreground p-3 leading-relaxed md:p-6", className)}
    >
      {children}
    </div>
  );
}
export default CardContent;
