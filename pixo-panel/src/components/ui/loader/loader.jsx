import clsx from "clsx";
import { Loader2 } from "lucide-react";

/**
 *
 * @property {string} text
 * @property {string} className
 */

function Loader({ text, className }) {
  return (
    <div className={clsx("flex-center mx-auto h-10 gap-2", className)}>
      {text && <p>{text}</p>}
      <Loader2 size={20} className="animate-spin" />
    </div>
  );
}
export default Loader;
