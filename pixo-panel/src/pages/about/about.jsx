import { Loader2 } from "lucide-react";
import { ABOUT_ID } from "../../services/appwrite";
import { useColumnForm } from "../../hooks";
import { aboutSchema } from "../../schemas";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  Label,
  Textarea,
  Input,
  CardDescription,
  CardContent,
} from "../../components/ui";

function AboutMe() {
  const { register, handleSubmit, errors, isSubmitting, loading } =
    useColumnForm({
      schema: aboutSchema,
      mapFieldsToForm: (data) => ({
        title: data.title || "",
        description: data.description || "",
      }),
      mapFieldsToPayload: (data) => ({
        title: data.title,
        description: data.description,
      }),
      mapFieldsToColumn: (data) => ({
        title: data.title,
        description: data.description,
      }),
      collectionID: ABOUT_ID,
      columnID: ABOUT_ID,
    });

  return (
    <Card>
      <CardHeader>
        <CardTitle>درباره من</CardTitle>
        <CardDescription>
          عنوان و متن بیوگرافی خود را تنظیم کنید
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-6" noValidate>
          <div className="grid gap-2">
            <Label htmlFor="title" label="متن عنوان" />
            <Input
              id="title"
              name="title"
              placeholder="مثال: درباره من بخوانید"
              register={register}
              error={errors.title}
              disabled={loading || isSubmitting}
            />
            <p className="text-muted-foreground flex items-center gap-1 text-sm">
              متن پیشفرض: خلاصه ای از خودم
            </p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description" label="بیوگرافی" />
            <Textarea
              id="description"
              name="description"
              placeholder="توضیحات کوتاه درباره خود (حداکثر 1000 کاراکتر)"
              rows={4}
              register={register}
              error={errors.description}
              disabled={loading || isSubmitting}
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
export default AboutMe;
