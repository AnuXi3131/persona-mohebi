import { useMemo, useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { blogSchema } from "../../schemas";
import { BLOG_POST_ID } from "../../services/appwrite";
import { useFileUpload, useItemForm } from "../../hooks";
import generateSummary from "./generateSummary";
import {
  Card,
  CardContent,
  Label,
  Input,
  FileInput,
  Button,
  Textarea,
  RichTextEditor,
} from "../../components/ui";

const defaultValues = {
  title: "",
  description: "",
  content: "",
};

function BlogForm({
  formRef,
  mode = "create",
  itemId,
  initialData,
  onSuccess,
  idPrefix = "blog-form",
}) {
  const { progress, upload } = useFileUpload();
  const [fileResetKey, setFileResetKey] = useState(0);
  const [generating, setGenerating] = useState(false);

  const initialFormValues = useMemo(
    () => initialData?.formValues ?? defaultValues,
    [initialData],
  );

  const formSchema = useMemo(() => blogSchema(mode), [mode]);

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
      collectionId: BLOG_POST_ID,
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
          description: data.description,
          content: data.content,
          file: fileID,
          file_type: "image",
        };
      },
      onSuccess: handleFormSuccess,
    });

  const { errors } = formState;

  const getId = (suffix) => `${idPrefix}-${suffix}`;

  const buttonLabel = isSubmitting
    ? "در حال افزودن..."
    : mode === "edit"
      ? "بروزرسانی مقاله"
      : "افزودن مقاله";

  async function handleInsertSummary() {
    const content = formState.defaultValues?.content || "";
    const contentValue =
      document.querySelector(".tox-edit-area__iframe")?.contentDocument?.body
        .innerText || "";

    setGenerating(true);

    try {
      const summary = await generateSummary(content || contentValue);
      if (summary) {
        setValue("description", summary, {
          shouldDirty: true,
          shouldValidate: true,
        });
      }
    } finally {
      setGenerating(false);
    }
  }

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
            <Label htmlFor={getId("title")} label="عنوان مقاله" />
            <Input
              id={getId("title")}
              name="title"
              placeholder="مثال: معرفی زبان"
              register={register}
              error={errors.title}
              disabled={isSubmitting}
            />
          </div>

          <div className="relative grid gap-2">
            <Label htmlFor={getId("description")} label="خلاصه مقاله" />
            <Textarea
              id={getId("description")}
              name="description"
              placeholder="خلاصه ای از مقاله خودتان بنویسید"
              register={register}
              error={errors.description}
              disabled={generating || isSubmitting}
            />
            <Button
              label={generating ? "در حال تولید..." : "تولید خودکار"}
              icon={generating || isSubmitting ? Loader2 : Sparkles}
              loading={generating || isSubmitting}
              className={"mr-auto w-max"}
              onClick={async () => await handleInsertSummary()}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor={getId("content")} label="محتوا مقاله" />
            <RichTextEditor
              id={getId("content")}
              name="content"
              register={register}
              setValue={setValue}
              error={errors.content}
              disabled={generating || isSubmitting}
              value={initialFormValues.content}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor={getId("file")} label="تصویر شاخص" />
            {mode === "edit" && initialData?.fileId && (
              <p className="text-muted-foreground text-sm">
                شناسه فایل فعلی: {initialData.fileId}
              </p>
            )}
            <FileInput
              id={getId("file")}
              name="file"
              label="تصویر شاخص را انتخاب یا در اینجا رها کنید."
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
            loading={isSubmitting || generating}
            className="mr-auto"
          />
        </form>
      </CardContent>
    </Card>
  );
}

export default BlogForm;
