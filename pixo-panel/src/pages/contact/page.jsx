import { Command, Loader2 } from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  Input,
  Label,
  PageHeader,
  Tooltip,
} from "../../components/ui";
import { useColumnForm } from "../../hooks";
import { contactFormSchema } from "../../schemas";
import { CONTACT_FORM_ID } from "../../services/appwrite";

function Contact() {
  const { register, handleSubmit, errors, isSubmitting, loading } =
    useColumnForm({
      schema: contactFormSchema,
      mapFieldsToForm: (data) => ({
        title: data.title || "",
        options: data.options || "",
        public_key: data.public_key || "",
        service_key: data.service_key || "",
        template_id: data.template_id || "",
      }),
      mapFieldsToPayload: async (data) => {
        return {
          title: data.title,
          options: data.options,
          public_key: data.public_key || "",
          service_key: data.service_key || "",
          template_id: data.template_id || "",
        };
      },
      mapFieldsToColumn: (data) => ({
        title: data.title,
        options: data.options,
        public_key: data.public_key || "",
        service_key: data.service_key || "",
        template_id: data.template_id || "",
      }),

      collectionID: CONTACT_FORM_ID,
      columnID: CONTACT_FORM_ID,
    });

  return (
    <section>
      <PageHeader
        pageTitle={"فرم تماس"}
        title={"فرم تماس"}
        sub={"عنوان، موضوع ها و تنظیمات فرم تماس را اضافه کنید"}
      />
      <div className="container px-4">
        <div className="pb-8">
          <Card>
            <CardContent>
              <form onSubmit={handleSubmit} className="grid gap-6" noValidate>
                <div className="grid gap-2">
                  <Label htmlFor="title" label="متن عنوان" />
                  <Input
                    id="title"
                    name="title"
                    placeholder="مثال: برای ثبت پروژه ایمیل دهید"
                    register={register}
                    error={errors.title}
                    disabled={loading || isSubmitting}
                  />
                  <p className="text-muted-foreground flex items-center gap-1 text-sm">
                    متن پیشفرض: اگر پروژه ای دارید لطفا فرم زیر را پر کنید
                  </p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="options" label="موضوع ها" />
                  <Input
                    id="options"
                    name="options"
                    placeholder="مثال: طراحی، دیزاین، فتوشاپ"
                    register={register}
                    error={errors.options}
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

                <div className="grid gap-2">
                  <Tooltip
                    content={"برای دریافت به سایت emailjs.com مراجعه کنید."}
                    offset={55}
                    className={"w-max"}
                  >
                    <Label htmlFor="public_key" label="کلید عمومی" />
                  </Tooltip>
                  <Input
                    id="public_key"
                    name="public_key"
                    placeholder={"public_key"}
                    register={register}
                    error={errors.public_key}
                    disabled={loading || isSubmitting}
                    className={"font-mono"}
                  />
                </div>

                <div className="grid gap-2">
                  <Tooltip
                    content={"برای دریافت به سایت emailjs.com مراجعه کنید."}
                    offset={55}
                    className={"w-max"}
                  >
                    <Label htmlFor="public_key" label="کلید سرویس" />
                  </Tooltip>
                  <Input
                    id="service_key"
                    name="service_key"
                    placeholder={"service_key"}
                    register={register}
                    error={errors.service_key}
                    disabled={loading || isSubmitting}
                    className={"font-mono"}
                  />
                </div>

                <div className="grid gap-2">
                  <Tooltip
                    content={"برای دریافت به سایت emailjs.com مراجعه کنید."}
                    offset={55}
                    className={"w-max"}
                  >
                    <Label htmlFor="public_key" label="آیدی قالب" />
                  </Tooltip>
                  <Input
                    id="template_id"
                    name="template_id"
                    placeholder={"template_id"}
                    register={register}
                    error={errors.template_id}
                    disabled={loading || isSubmitting}
                    className={"font-mono"}
                  />
                </div>

                <Button
                  type="submit"
                  label={
                    loading || isSubmitting
                      ? "در حال ذخیره..."
                      : "ذخیره تنظیمات"
                  }
                  icon={loading || isSubmitting ? Loader2 : undefined}
                  loading={loading || isSubmitting}
                  className="mr-auto"
                />
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
export default Contact;
