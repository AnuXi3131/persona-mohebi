/**
 *
 * @property {React.ReactNode} children
 */

import clsx from "clsx";

function TableContainer({ className, children }) {
  return <div className={clsx("grid gap-6", className)}>{children}</div>;
}
export default TableContainer;
