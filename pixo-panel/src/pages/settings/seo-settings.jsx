import { seoSchema } from "../../schemas";
import { Command, Loader2 } from "lucide-react";
import { useColumnForm } from "../../hooks";
import { SITE_SETTINGS_ID } from "../../services/appwrite";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Label,
  Textarea,
  Input,
  Button,
} from "../../components/ui";

function SeoSettings() {
  const { register, handleSubmit, errors, isSubmitting, loading } =
    useColumnForm({
      schema: seoSchema,
      mapFieldsToForm: (data) => ({
        description: data.description || "",
        keywords: data.keywords || "",
      }),
      mapFieldsToPayload: (data) => ({
        description: data.description,
        keywords: data.keywords,
      }),
      mapFieldsToColumn: (data) => ({
        description: data.description,
        keywords: data.keywords,
      }),
      collectionID: SITE_SETTINGS_ID,
      columnID: SITE_SETTINGS_ID,
    });

  return (
    <Card>
      <CardHeader>
        <CardTitle>SEO و متا تگ‌ ها</CardTitle>
        <CardDescription>
          توضیحات و کلمات کلیدی سایت را تنظیم کنید
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-6" noValidate>
          <div className="grid gap-2">
            <Label htmlFor="description" label="توضیحات (Description)" />
            <Textarea
              id="description"
              name="description"
              placeholder="توضیحات کوتاه درباره سایت (حداکثر 500 کاراکتر)"
              rows={4}
              register={register}
              error={errors.description}
              disabled={loading || isSubmitting}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="keywords" label="کلمات کلیدی (Keywords)" />
            <Input
              id="keywords"
              name="keywords"
              placeholder="مثال: خواننده"
              register={register}
              error={errors.keywords}
              disabled={loading || isSubmitting}
              separateWithComma={true}
            />
            <p className="text-muted-foreground flex items-center gap-1 text-sm">
              <span>برای جدا کردن کلمات کلید</span>
              <span>
                <Command />
              </span>
              <span>
                <strong>Enter</strong> را فشار دهید
              </span>
            </p>
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

export default SeoSettings;
