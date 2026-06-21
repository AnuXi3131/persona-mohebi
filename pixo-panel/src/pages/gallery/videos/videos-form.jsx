import { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { GALLERY_VIDEOS_ID } from "../../../services/appwrite";
import { videosSchema } from "../../../schemas";
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

function VideosForm({
  formRef,
  mode = "create",
  itemId,
  initialData,
  onSuccess,
  idPrefix = "videos-form",
}) {
  const { progress, upload } = useFileUpload();
  const [fileResetKey, setFileResetKey] = useState(0);

  const initialFormValues = useMemo(
    () => initialData?.formValues ?? defaultValues,
    [initialData],
  );

  const formSchema = useMemo(() => videosSchema(mode), [mode]);

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
      collectionId: GALLERY_VIDEOS_ID,
      itemId,
      initialValues: initialFormValues,
      mapFieldsToPayload: async (data) => {
        const fileID = await upload({
          file: data.file,
          prevId: initialData?.fileId,
          key: "video",
        });

        const thumbnailID = await upload({
          file: data.thumbnail,
          prevId: initialData?.thumbnail,
          key: "thumbnail",
        });

        return {
          title: data.title,
          thumbnail: thumbnailID,
          file: fileID,
          file_type: "video",
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
      ? "ویرایش ویدیو"
      : "آپلود ویدیو";

  return (
    <Card>
      <CardHeader>
        <CardTitle>ویدیو ها</CardTitle>
        <CardDescription>ویدیو های گالری خود را اضافه کنید</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="grid gap-6"
          noValidate
        >
          <div className="grid gap-2">
            <Label htmlFor={getId("title")} label="عنوان ویدیو" />
            <Input
              id={getId("title")}
              name="title"
              placeholder="مثال: آموزش برنامه نویسی"
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
            <Label htmlFor={getId("file")} label="ویدیو" />
            <FileInput
              id={getId("file")}
              name="file"
              label="ویدیو را انتخاب یا در اینجا رها کنید."
              accept="videoTypes"
              register={register}
              error={errors.file}
              onChange={(file) => setValue("file", file)}
              onReset={fileResetKey}
              disabled={isSubmitting}
              uploadProgress={progress.video}
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

export default VideosForm;
