import { useWatch } from "react-hook-form";
import { pagesSchema } from "../../schemas";
import { Loader2 } from "lucide-react";
import { useColumnForm } from "../../hooks";
import { SECTIONS_MAP } from "../../constants/maps/sectionsMap";
import { SITE_SETTINGS_ID } from "../../services/appwrite";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Checkbox,
  Button,
} from "../../components/ui";

function PagesControlSettings() {
  const { form, register, handleSubmit, errors, isSubmitting, loading } =
    useColumnForm({
      schema: pagesSchema,
      mapFieldsToForm: (data) => ({
        visible_pages: data.visible_pages
          ? JSON.parse(data.visible_pages)
          : {
              hero: false,
              about: false,
              services: false,
              gallery: false,
              blog: false,
              experience: false,
              testimonial: false,
              contact: false,
              footer: false,
            },
      }),
      mapFieldsToPayload: (data) => ({
        visible_pages: JSON.stringify(data.visible_pages),
      }),
      mapFieldsToColumn: (data) => ({
        visible_pages: data.visible_pages,
      }),
      collectionID: SITE_SETTINGS_ID,
      columnID: SITE_SETTINGS_ID,
    });

  const { control } = form;
  const visible_pages_watch = useWatch({
    control,
    name: "visible_pages",
    defaultValue: form.getValues().visible_pages,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>بخش های قابل نمایش</CardTitle>
        <CardDescription>
          بخش هایی که می‌ خواهید در سایت و یا منو نمایش داده{" "}
          <span className="text-destructive">نشوند</span> را انتخاب کنید
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-6" noValidate>
          <div className="grid-items-4">
            {SECTIONS_MAP.map(({ value, label, sub }) => {
              const checkBoxName = `visible_pages.${value}`;
              const isChecked = visible_pages_watch?.[value] || false;

              return (
                <Checkbox
                  key={value}
                  label={label}
                  sub={sub}
                  name={checkBoxName}
                  id={value}
                  disabled={loading || isSubmitting}
                  register={register}
                  error={errors.visible_pages?.[value]}
                  checked={isChecked}
                />
              );
            })}
          </div>

          <Button
            type="submit"
            label={
              loading || isSubmitting ? "در حال ذخیره..." : "ذخیره تنظیمات"
            }
            icon={loading || isSubmitting ? Loader2 : undefined}
            loading={loading || isSubmitting}
            className="mr-auto"
          />
        </form>
      </CardContent>
    </Card>
  );
}

export default PagesControlSettings;
