import { footerSchema } from "../../schemas";
import { Loader2 } from "lucide-react";
import { useColumnForm } from "../../hooks";
import { SITE_SETTINGS_ID } from "../../services/appwrite";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Label,
  Input,
  Button,
  Textarea,
} from "../../components/ui";

function FooterSettings() {
  const { register, handleSubmit, errors, isSubmitting, loading } =
    useColumnForm({
      schema: footerSchema,
      mapFieldsToForm: (data) => ({
        address: data.address || "",
        location: data.location || "",
        footer_text: data.footer_text || "",
      }),
      mapFieldsToPayload: (data) => ({
        address: data.address,
        location: data.location,
        footer_text: data.footer_text,
      }),
      mapFieldsToColumn: (data) => ({
        address: data.address,
        location: data.location,
        footer_text: data.footer_text,
      }),
      collectionID: SITE_SETTINGS_ID,
      columnID: SITE_SETTINGS_ID,
    });

  return (
    <Card>
      <CardHeader>
        <CardTitle>تنظیمات فوتر</CardTitle>
        <CardDescription>اطلاعات تماس و لوکیشن را وارد کنید</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-6" noValidate>
          <div className="grid gap-2">
            <Label htmlFor="address" label="آدرس" />
            <Input
              id="address"
              name="address"
              placeholder="تهران، پاکدشت"
              register={register}
              error={errors.address}
              disabled={loading || isSubmitting}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="location" label="لینک برنامه بلد یا نشان" />
            <Input
              type="url"
              id="location"
              name="location"
              placeholder="https://www.google.com/maps/place/..."
              register={register}
              error={errors.location}
              disabled={loading || isSubmitting}
              dir="ltr"
            />
            <p className="text-muted-foreground text-sm">
              لینک موقعیت مکانی از Google Maps یا برنامه بلد
            </p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="footer_text" label="متن فوتر" />
            <Textarea
              id="footer_text"
              name="footer_text"
              placeholder="تمامی حقوق محفوظ می باشد (سال جاری)"
              register={register}
              error={errors.footer_text}
              disabled={loading || isSubmitting}
            />
            <p className="text-muted-foreground text-sm">
              متن پیشفرض: تمامی حقوق محفوظ است (سال جاری)
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

export default FooterSettings;
