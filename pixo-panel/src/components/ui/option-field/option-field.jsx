import { toast } from "react-toastify";
import { Command } from "lucide-react";
import { Input, Label } from "..";
import OptionContainer from "./option-container";

function OptionField({
  label,
  placeholder,
  register,
  errors,
  isSubmitting,
  options,
  setOptions,
  getId,
}) {
  function addOption(e) {
    const value = e.target.value;
    if (!value.trim()) {
      toast.error("ورودی معتبر نیست");
      return;
    }

    const newOptions = [...options, value.trim()];
    setOptions(newOptions);
    e.target.value = "";
  }

  function removeOption(index) {
    const filtered = options.filter((_, i) => i !== index);
    setOptions(filtered);
  }

  return (
    <div className="grid gap-2">
      <div className="grid gap-2">
        <Label htmlFor={getId("opt-input")} label={label} />
        <Input
          id={getId("opt-input")}
          name="opt-input"
          placeholder={placeholder}
          disabled={isSubmitting}
          handleOnKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addOption(e);
            }
          }}
        />
        <Input
          name={"options"}
          id={getId("options")}
          register={register}
          error={errors.options}
          className={"hidden"}
        />
        <p className="text-muted-foreground flex items-center gap-1 text-sm">
          <span>برای افزودن {label} کلید</span>
          <span>
            <Command />
          </span>
          <span>
            <strong>Enter</strong> را فشار دهید
          </span>
        </p>
      </div>
      <OptionContainer options={options} onDelete={removeOption} />
    </div>
  );
}
export default OptionField;
