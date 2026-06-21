import { useState } from "react";
import useSocialPlatform from "./useSocialPlatform";
import { useColumnForm } from "../../../hooks";
import { socialsSchema } from "../../../schemas";
import { DATABASE_ID, SITE_SETTINGS_ID } from "../../../services/appwrite";
import { database } from "../../../services/appwrite/appwrite.config";
import { toast } from "react-toastify";
import { SOCIAL_ICONS_MAP } from "../../../constants/maps/socialIconsMap";
import SocialField from "./social-field";
import { Loader2, Plus } from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from "../../../components/ui";

function SocialSettings() {
  const [newPlatform, setNewPlatform] = useState("");

  const {
    form,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    column,
    loading,
  } = useColumnForm({
    schema: socialsSchema,
    mapFieldsToForm: (data) => {
      try {
        return { socials: JSON.parse(data.socials || "{}") };
      } catch {
        return { socials: {} };
      }
    },
    mapFieldsToPayload: (data) => {
      const clean = Object.fromEntries(
        Object.entries(data.socials || {}).filter(([_, val]) => val?.trim()),
      );
      return { socials: JSON.stringify(clean) };
    },
    mapFieldsToColumn: (data) => {
      try {
        return JSON.parse(data.socials || "{}");
      } catch {
        return {};
      }
    },
    collectionID: SITE_SETTINGS_ID,
    columnID: SITE_SETTINGS_ID,
  });

  const { platforms, addCustom, removeCustom } = useSocialPlatform({
    column,
    form,
  });

  async function handleRemove(key) {
    removeCustom(key);
    try {
      const values = form.getValues();
      const filtred = Object.fromEntries(
        Object.entries(values.socials || {}).filter(
          ([k, v]) => k !== key && v?.trim(),
        ),
      );
      await database.updateDocument({
        databaseId: DATABASE_ID,
        collectionId: SITE_SETTINGS_ID,
        documentId: SITE_SETTINGS_ID,
        data: { socials: JSON.stringify(filtred) },
      });
      toast.success("پلتفرم حذف شد");
    } catch (error) {
      if (error.code === 401) {
        toast.error("دسترسی رد شد");
        return;
      }
      toast.error("خطا در حذف پلتفرم");
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>شبکه‌ های اجتماعی</CardTitle>
        <CardDescription>
          لینک شبکه‌ های اجتماعی خود را وارد کنید
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form noValidate onSubmit={handleSubmit} className="grid gap-6">
          <div className="grid-items-2">
            {platforms.map(({ key, label, placeholder }) => {
              const Icon = SOCIAL_ICONS_MAP[key] || SOCIAL_ICONS_MAP.default;
              return (
                <SocialField
                  key={key}
                  keyName={key}
                  label={label}
                  placeholder={placeholder}
                  Icon={Icon}
                  register={register}
                  error={errors.socials?.[key]}
                  disabled={loading || isSubmitting}
                  onRemove={() => handleRemove(key)}
                />
              );
            })}
          </div>

          <div className="flex flex-col items-end gap-6 md:flex-row">
            <div className="grid flex-1 gap-2">
              <Label label={"افزودن پلتفرم جدید"} htmlFor={"newPlatform"} />
              <div className="flex gap-2 [&>div]:flex-1">
                <Input
                  id={"newPlatform"}
                  value={newPlatform}
                  disabled={loading || isSubmitting}
                  placeholder={"نام پلتفرم"}
                  onChange={(e) => setNewPlatform(e.target.value)}
                  handleOnKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addCustom(newPlatform);
                      setNewPlatform("");
                    }
                  }}
                />
                <Button
                  varient="outline"
                  icon={Plus}
                  className={"p-3! [&>svg]:size-5"}
                  onClick={() => {
                    addCustom(newPlatform);
                    setNewPlatform("");
                  }}
                />
              </div>
            </div>

            <Button
              type="submit"
              label={
                loading || isSubmitting ? "در حال ذخیره..." : "ذخیره تنظیمات"
              }
              icon={loading || isSubmitting ? Loader2 : undefined}
              loading={loading || isSubmitting}
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
export default SocialSettings;
