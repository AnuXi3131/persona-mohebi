import { HERO_ID, STORAGE_ID } from "../../services/appwrite";
import { useColumnForm, useFileUpload } from "../../hooks";
import { heroSchema } from "../../schemas";
import { Command, Loader2 } from "lucide-react";
import { storage } from "../../services/appwrite/appwrite.config";
import {
  PageHeader,
  Card,
  CardContent,
  Label,
  Input,
  FileInput,
  Loader,
  Button,
  Image,
} from "../../components/ui";

function Hero() {
  const { progress, upload } = useFileUpload();

  const {
    register,
    handleSubmit,
    setValue,
    errors,
    isSubmitting,
    column,
    loading,
  } = useColumnForm({
    schema: heroSchema,
    mapFieldsToForm: (data) => ({
      title: data.title || "",
      jobs: data.jobs || "",
      file: null,
    }),
    mapFieldsToPayload: async (data, currentColumn) => {
      const fileID = await upload({
        file: data.file,
        prevId: currentColumn?.file,
        key: "file",
      });

      return {
        title: data.title,
        jobs: data.jobs,
        file: fileID || currentColumn?.file,
      };
    },
    mapFieldsToColumn: (data) => ({
      title: data.title,
      jobs: data.jobs,
      file: data.file,
    }),

    collectionID: HERO_ID,
    columnID: HERO_ID,
  });

  return (
    <section>
      <PageHeader
        pageTitle={"هیرو سکشن"}
        title={"هیرو سکشن"}
        sub={"عکس اصلی، متن عنوان و حوزه های فعالیت خود را تنظیم کنید"}
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
                    placeholder="مثال: تیم پرسونا"
                    register={register}
                    error={errors.title}
                    disabled={loading || isSubmitting}
                  />
                  <p className="text-muted-foreground flex items-center gap-1 text-sm">
                    متن پیشفرض: سلام من (نام برند) هستم
                  </p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="jobs" label="حوزه های فعالیت" />
                  <Input
                    id="jobs"
                    name="jobs"
                    placeholder="مثال: برنامه نویسی"
                    register={register}
                    error={errors.jobs}
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
                  <Label htmlFor="file" label="عکس هیرو" />
                  <FileInput
                    id="file"
                    name="file"
                    label="عکس هیرو را انتخاب یا در اینجا رها کنید."
                    accept="imageTypes"
                    register={register}
                    error={errors.file}
                    onChange={(file) => setValue("file", file)}
                    onReset={column}
                    disabled={loading || isSubmitting}
                    uploadProgress={progress.file}
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

              <footer className="border-border mt-10 w-full border-t pt-5">
                <h3 className="text-accent-foreground font-weight-bold mb-5 text-2xl">
                  تنظیمات فعلی
                </h3>
                <ul className="flex flex-wrap items-center gap-4">
                  {loading || isSubmitting ? (
                    <Loader />
                  ) : (
                    <>
                      {column?.file ? (
                        <div className="flex items-center justify-end gap-3">
                          <Image
                            src={storage.getFileDownload({
                              bucketId: STORAGE_ID,
                              fileId: column.file,
                            })}
                            alt={"عکس هیرو"}
                            className={
                              "border-border mt-2 size-20 rounded-md border border-solid object-contain"
                            }
                          />
                          <span className="text-accent-foreground/70">
                            عکس هیرو
                          </span>
                        </div>
                      ) : (
                        <span className="text-destructive">عکسی ثبت نشده</span>
                      )}
                    </>
                  )}
                </ul>
              </footer>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
export default Hero;
