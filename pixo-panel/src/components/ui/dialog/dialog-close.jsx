import clsx from "clsx";
import { X } from "lucide-react";
import { Button } from "..";
import { useDialog } from "./dialog";

function DialogClose({ mode = "x", label = "بستن", className }) {
  const { close } = useDialog();

  const XButtonComponent = () => (
    <Button
      varient=""
      onClick={() => close()}
      icon={X}
      className={"absolute top-4 left-4 p-3!"}
    />
  );
  const RegularCloseComponent = () => (
    <Button
      label={label}
      varient="outline"
      onClick={() => close()}
      className={clsx(className)}
    />
  );

  if (mode === "button") {
    return <RegularCloseComponent />;
  }

  if (mode === "both") {
    return (
      <>
        <XButtonComponent />
        <RegularCloseComponent />
      </>
    );
  }

  return <XButtonComponent />;
}
export default DialogClose;
