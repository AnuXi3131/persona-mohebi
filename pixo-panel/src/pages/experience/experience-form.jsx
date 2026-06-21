import { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { experienceSchema } from "../../schemas";
import { EXPERIENCE_ID } from "../../services/appwrite";
import { useFileUpload, useItemForm } from "../../hooks";
import {
  Card,
  CardContent,
  Label,
  Input,
  FileInput,
  Button,
  OptionField,
  Textarea,
} from "../../components/ui";

const defaultValues = {
  title: "",
  options: "",
  description: "",
};

function ExperienceForm({
  formRef,
  mode = "create",
  itemId,
  initialData,
  onSuccess,
  idPrefix = "experience-form",
}) {
  const { progress, upload } = useFileUpload();
  const [options, setOptions] = useState(initialData?.optionsList ?? []);

  const [fileResetKey, setFileResetKey] = useState(0);

  const initialFormValues = useMemo(
    () => initialData?.formValues ?? defaultValues,
    [initialData],
  );

  const formSchema = useMemo(() => experienceSchema(mode), [mode]);

  const handleFormSuccess = () => {
    if (mode === "create") {
      setOptions([]);
      setFileResetKey((prev) => prev + 1);
    }
    onSuccess?.();
  };

  const { register, handleSubmit, setValue, formState, isSubmitting } =
    useItemForm({
      schema: formSchema,
      mode,
      collectionId: EXPERIENCE_ID,
      itemId,
      initialValues: initialFormValues,
      mapFieldsToPayload: async (data) => {
        const fileID = await upload({
          file: data.file,
          prevId: initialData?.fileId,
          key: "file",
        });

        return {
          title: data.title,
          options: options.join(" , "),
          description: data.description,
          file: fileID,
          file_type: "image",
        };
      },
      onSuccess: handleFormSuccess,
    });

  const { errors } = formState;

  useEffect(() => {
    setOptions(initialData?.optionsList ?? []);
    setFileResetKey((prev) => prev + 1);
  }, [initialData]);

  useEffect(() => {
    setValue("options", options.join(" , "));
  }, [options, setValue]);

  const getId = (suffix) => `${idPrefix}-${suffix}`;

  const buttonLabel = isSubmitting
    ? "در حال افزودن..."
    : mode === "edit"
      ? "بروزرسانی تجربه"
      : "افزودن تجربه";

  return (
    <Card>
      <CardContent>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="grid gap-6"
          noValidate
        >
          <div className="grid gap-2">
            <Label htmlFor={getId("title")} label="عنوان تجربه" />
            <Input
              id={getId("title")}
              name="title"
              placeholder="مثال: شرکت دیجی کالا"
              register={register}
              error={errors.title}
              disabled={isSubmitting}
            />
          </div>

          <OptionField
            label={"مسئولیت ها"}
            placeholder={"مثال: تولید کننده محتوا"}
            register={register}
            errors={errors}
            isSubmitting={isSubmitting}
            options={options}
            setOptions={setOptions}
            getId={getId}
          />

          <div className="grid gap-2">
            <Label htmlFor={getId("description")} label="توضیحات تجربه" />
            <Textarea
              id={getId("description")}
              name="description"
              placeholder="مثال: 2 سال سابقه کاری در..."
              register={register}
              error={errors.description}
              disabled={isSubmitting}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor={getId("file")} label="لوگو" />
            {mode === "edit" && initialData?.fileId && (
              <p className="text-muted-foreground text-sm">
                شناسه فایل فعلی: {initialData.fileId}
              </p>
            )}
            <FileInput
              id={getId("file")}
              name="file"
              label="لوگو را انتخاب یا در اینجا رها کنید."
              accept="imageTypes"
              register={register}
              error={errors.file}
              onChange={(file) => setValue("file", file)}
              onReset={fileResetKey}
              disabled={isSubmitting}
              uploadProgress={progress.file}
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

export default ExperienceForm;
