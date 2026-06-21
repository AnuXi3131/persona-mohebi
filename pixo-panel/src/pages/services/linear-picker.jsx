import { Label, Input } from "../../components/ui";
import DegreeSelector from "./degree-picker";

function LinearPicker({ loading, isSubmitting, value, onChange }) {
  function update(field, val) {
    onChange({ ...value, [field]: val });
  }

  return (
    <div className="grid gap-2">
      <Label label="انتخاب بک گراند" />
      <div className="flex flex-wrap items-end gap-4 text-sm">
        <div className="grid grow gap-2">
          <Label
            htmlFor={"start-color"}
            label={"رنگ شروع"}
            className={"text-muted-foreground!"}
          />
          <Input
            type="color"
            name={"start-color"}
            id={"start-color"}
            className={"h-12 p-1"}
            value={value.startColor}
            onChange={(e) => update("startColor", e.target.value)}
            disabled={loading || isSubmitting}
          />
        </div>
        <div className="grid grow gap-2">
          <Label
            htmlFor={"mid-color"}
            label={"رنگ میانی"}
            className={"text-muted-foreground!"}
          />
          <Input
            type="color"
            name={"mid-color"}
            id={"mid-color"}
            className={"h-12 p-1"}
            value={value.midColor}
            onChange={(e) => update("midColor", e.target.value)}
            disabled={loading || isSubmitting}
          />
        </div>
        <div className="grid grow gap-2">
          <Label
            htmlFor={"end-color"}
            label={"رنگ پایانی"}
            className={"text-muted-foreground!"}
          />
          <Input
            type="color"
            name={"end-color"}
            id={"end-color"}
            className={"h-12 p-1"}
            value={value.endColor}
            onChange={(e) => update("endColor", e.target.value)}
            disabled={loading || isSubmitting}
          />
        </div>
        <div className="w-max">
          <DegreeSelector
            value={value.degree}
            onChange={(deg) => update("degree", deg)}
            disabled={loading || isSubmitting}
          />
        </div>
      </div>
    </div>
  );
}
export default LinearPicker;
