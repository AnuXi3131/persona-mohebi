import { motion as Motion } from "motion/react";
import { Label, Input, Button } from "../../../components/ui";
import { X } from "lucide-react";

function SocialField({
  keyName,
  label,
  placeholder,
  Icon,
  register,
  error,
  disabled,
  onRemove,
}) {
  return (
    <Motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.1, ease: "easeOut" }}
      className="relative grid gap-2"
    >
      <Label
        htmlFor={`socials.${keyName}`}
        label={label}
        icon={Icon}
        className={"max-w-50 overflow-hidden [&>span]:truncate"}
      />
      <Input
        type="url"
        id={`socials.${keyName}`}
        name={`socials.${keyName}`}
        placeholder={placeholder}
        register={register}
        error={error}
        dir="ltr"
        disabled={disabled}
      />
      {keyName.startsWith("custom_") && (
        <Button
          varient="destructive"
          icon={X}
          onClick={() => onRemove(keyName)}
          className={"absolute -top-2 left-0 px-3! py-2.5"}
        />
      )}
    </Motion.div>
  );
}

export default SocialField;
