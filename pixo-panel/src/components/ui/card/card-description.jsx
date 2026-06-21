/**
 * @property {string} className
 * @property {React.ReactNode} children
 */

import clsx from "clsx";

export function CardDescription({ className, children }) {
  return (
    <p className={clsx("text-muted-foreground mt-1 text-sm", className)}>
      {children}
    </p>
  );
}

export default CardDescription;
