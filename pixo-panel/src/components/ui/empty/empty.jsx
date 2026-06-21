import { BrushCleaning } from "lucide-react";
import { Button, CardHeader } from "..";

/**
 *
 * @property {string} title
 * @property {string} description
 * @property {boolean} actionButton
 * @property {string} actionLabel
 * @property {Function} onAction
 */

function Empty({
  title,
  description,
  actionButton = false,
  actionLabel = "شروع کنید",
  onAction,
}) {
  return (
    <div className="border-border rounded-lg border border-solid p-3 md:p-6">
      <CardHeader
        className={"grid place-items-center gap-6 border-none text-center"}
      >
        <BrushCleaning size={40} className="bg-accent rounded-lg p-2" />
        <div className="grid gap-2">
          <h1 className="text-foreground font-weight-bold">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        {actionButton && (
          <Button label={actionLabel} varient="outline" onClick={onAction} />
        )}
      </CardHeader>
    </div>
  );
}
export default Empty;
