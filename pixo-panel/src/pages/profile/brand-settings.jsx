import { Loader2 } from "lucide-react";
import { brandSettingsSchema } from "../../schemas";
import { SITE_SETTINGS_ID, STORAGE_ID } from "../../services/appwrite";
import { useColumnForm, useFileUpload } from "../../hooks";
import { storage } from "../../services/appwrite/appwrite.config";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
  Label,
  Input,
  FileInput,
  Loader,
  Image,
} from "../../components/ui";

function BrandSettings() {
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
    schema: brandSettingsSchema,
    mapFieldsToForm: (data) => ({
      brand_name: data.brand_name || "",
      logo: null,
      fav_icon: null,
    }),
    mapFieldsToPayload: async (data, currentColumn) => {
      const logoID = await upload({
        file: data.logo,
        prevId: currentColumn?.logo,
        key: "logo",
      });

      const favID = await upload({
        file: data.fav_icon,
        prevId: currentColumn?.fav_icon,
        key: "fav",
      });

      return {
        brand_name: data.brand_name,
        logo: logoID || currentColumn?.logo,
        fav_icon: favID || currentColumn?.fav_icon,
      };
    },
    mapFieldsToColumn: (data) => ({
      brand_name: data.brand_name,
      logo: data.logo,
      fav_icon: data.fav_icon,
    }),
    collectionID: SITE_SETTINGS_ID,
    columnID: SITE_SETTINGS_ID,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>اطلاعات برند</CardTitle>
        <CardDescription>
          نام، لوگو و فاوآیکون سایت را تنظیم کنید
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-6" noValidate>
          <div className="grid gap-2">
            <Label htmlFor="brand_name" label="نام برند" />
            <Input
              id="brand_name"
              name="brand_name"
              placeholder="مثال: تیم پرسونا"
              register={register}
              error={errors.brand_name}
              disabled={loading || isSubmitting}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="logo" label="لوگو برند" />
            <FileInput
              id="logo"
              name="logo"
              label="لوگو را انتخاب یا در اینجا رها کنید."
              accept="imageTypes"
              register={register}
              error={errors.logo}
              onChange={(file) => setValue("logo", file)}
              onReset={column}
              disabled={loading || isSubmitting}
              uploadProgress={progress.logo}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="fav_icon" label="فاو آیکون" />
            <FileInput
              id="fav_icon"
              name="fav_icon"
              label="فاو آیکون را انتخاب یا در اینجا رها کنید."
              accept="imageTypes"
              register={register}
              error={errors.fav_icon}
              onChange={(file) => setValue("fav_icon", file)}
              onReset={column}
              disabled={loading || isSubmitting}
              uploadProgress={progress.fav}
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

        <footer className="border-border mt-10 w-full border-t pt-5">
          <h3 className="text-accent-foreground font-weight-bold mb-5 text-2xl">
            تنظیمات فعلی
          </h3>
          <ul className="flex flex-wrap items-center gap-4">
            {loading || isSubmitting ? (
              <Loader />
            ) : (
              <>
                {column?.logo ? (
                  <div className="flex items-center justify-end gap-3">
                    <Image
                      src={storage.getFileDownload({
                        bucketId: STORAGE_ID,
                        fileId: column.logo,
                      })}
                      alt={"لوگو"}
                      className={
                        "border-border mt-2 size-20 rounded-md border object-contain"
                      }
                    />
                    <span className="text-accent-foreground/70">لوگو</span>
                  </div>
                ) : (
                  <span className="text-destructive">لوگویی ثبت نشده</span>
                )}
                {column?.fav_icon ? (
                  <div className="flex items-center justify-end gap-3">
                    <Image
                      src={storage.getFileDownload({
                        bucketId: STORAGE_ID,
                        fileId: column.fav_icon,
                      })}
                      alt={"فاو آیکون"}
                      className={
                        "border-border mt-2 size-16 rounded-md border object-contain"
                      }
                    />
                    <span className="text-accent-foreground/70">فاوآیکون</span>
                  </div>
                ) : (
                  <span className="text-destructive">فاوآیکونی ثبت نشده</span>
                )}
              </>
            )}
          </ul>
        </footer>
      </CardContent>
    </Card>
  );
}

export default BrandSettings;
