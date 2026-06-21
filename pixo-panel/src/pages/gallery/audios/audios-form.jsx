import { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { GALLERY_AUDIOS_ID } from "../../../services/appwrite";
import { audiosSchema } from "../../../schemas";
import { useFileUpload, useItemForm } from "../../../hooks";
import {
  Card,
  CardContent,
  Label,
  Input,
  FileInput,
  Button,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../../components/ui";

const defaultValues = {
  title: "",
};

function AudiosForm({
  formRef,
  mode = "create",
  itemId,
  initialData,
  onSuccess,
  idPrefix = "audios-form",
}) {
  const { progress, upload } = useFileUpload();
  const [fileResetKey, setFileResetKey] = useState(0);

  const initialFormValues = useMemo(
    () => initialData?.formValues ?? defaultValues,
    [initialData],
  );

  const formSchema = useMemo(() => audiosSchema(mode), [mode]);

  const handleFormSuccess = () => {
    if (mode === "create") {
      setFileResetKey((prev) => prev + 1);
    }
    onSuccess?.();
  };

  const { register, handleSubmit, setValue, formState, isSubmitting } =
    useItemForm({
      schema: formSchema,
      mode,
      collectionId: GALLERY_AUDIOS_ID,
      itemId,
      initialValues: initialFormValues,
      mapFieldsToPayload: async (data) => {
        const fildID = await upload({
          file: data.file,
          prevId: initialData?.fileId,
          key: "audio",
        });

        const thumbnailId = await upload({
          file: data.thumbnail,
          prevId: initialData?.thumbnail,
          key: "thumbnail",
        });

        return {
          title: data.title,
          thumbnail: thumbnailId,
          file: fildID,
          file_type: "audio",
        };
      },
      onSuccess: handleFormSuccess,
    });

  const { errors } = formState;

  useEffect(() => {
    setFileResetKey((prev) => prev + 1);
  }, [initialData]);

  const getId = (suffix) => `${idPrefix}-${suffix}`;

  const buttonLabel = isSubmitting
    ? "در حال آپلود..."
    : mode === "edit"
      ? "ویرایش صوت"
      : "آپلود صوت";

  return (
    <Card>
      <CardHeader>
        <CardTitle>صوت ها</CardTitle>
        <CardDescription>فایل های صوتی گالری خود را اضافه کنید</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="grid gap-6"
          noValidate
        >
          <div className="grid gap-2">
            <Label htmlFor={getId("title")} label="عنوان صوت" />
            <Input
              id={getId("title")}
              name="title"
              placeholder="مثال: بیت رپی"
              register={register}
              error={errors.title}
              disabled={isSubmitting}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor={getId("thumbnail")} label="پوستر" />
            <FileInput
              id={getId("thumbnail")}
              name="thumbnail"
              label="پوستر را انتخاب یا در اینجا رها کنید."
              accept="imageTypes"
              register={register}
              error={errors.thumbnail}
              onChange={(file) => setValue("thumbnail", file)}
              onReset={fileResetKey}
              disabled={isSubmitting}
              uploadProgress={progress.thumbnail}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor={getId("file")} label="صوت" />
            <FileInput
              id={getId("file")}
              name="file"
              label="فایل صوتی را انتخاب یا در اینجا رها کنید."
              accept="audioTypes"
              register={register}
              error={errors.file}
              onChange={(file) => setValue("file", file)}
              onReset={fileResetKey}
              disabled={isSubmitting}
              uploadProgress={progress.audio}
            />
          </div>

          <Button
            type="submit"
            label={buttonLabel}
            icon={isSubmitting ? Loader2 : undefined}
            loading={isSubmitting}
            className="mr-auto"
          />
        </form>
      </CardContent>
    </Card>
  );
}

export default AudiosForm;
