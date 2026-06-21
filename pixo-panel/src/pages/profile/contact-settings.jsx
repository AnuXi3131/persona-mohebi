import { contactSchema } from "../../schemas";
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
} from "../../components/ui";

function ContactSettings() {
  const { register, handleSubmit, errors, isSubmitting, loading } =
    useColumnForm({
      schema: contactSchema,
      mapFieldsToForm: (data) => ({
        phone_number: data.phone_number || "",
        email: data.email || "",
      }),
      mapFieldsToPayload: (data) => ({
        phone_number: data.phone_number,
        email: data.email,
      }),
      mapFieldsToColumn: (data) => ({
        phone_number: data.phone_number,
        email: data.email,
      }),
      collectionID: SITE_SETTINGS_ID,
      columnID: SITE_SETTINGS_ID,
    });

  return (
    <Card>
      <CardHeader>
        <CardTitle>تنظیمات اطلاعات تماس</CardTitle>
        <CardDescription>اطلاعات تماس و ایمیل را وارد کنید</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-6" noValidate>
          <div className="grid gap-2">
            <Label htmlFor="phone_number" label="شماره تماس" />
            <Input
              type="tel"
              id="phone_number"
              name="phone_number"
              placeholder="09123456789"
              register={register}
              error={errors.phone_number}
              dir="ltr"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email" label="ایمیل" />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="example@email.com"
              register={register}
              error={errors.email}
              dir="ltr"
            />
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

export default ContactSettings;
