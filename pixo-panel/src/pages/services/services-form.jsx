import { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { AnimatePresence, motion as Motion } from "motion/react";
import LinearPicker from "./linear-picker";
import { servicesSchema } from "../../schemas";
import { SERVICES_ID } from "../../services/appwrite";
import { useFileUpload, useItemForm } from "../../hooks";
import { buildLinearGradient } from "../../utils";
import { DEFAULT_LINEAR_BG } from "./service.mappers";
import {
  Card,
  CardContent,
  Label,
  Input,
  FileInput,
  Button,
  OptionField,
} from "../../components/ui";

const defaultValues = {
  title: "",
  options: "",
  price: "",
  order_text: "",
  order_link: "",
};

function ServicesForm({
  formRef,
  mode = "create",
  itemId,
  initialData,
  onSuccess,
  idPrefix = "services-form",
}) {
  const { progress, upload } = useFileUpload();
  const [options, setOptions] = useState(initialData?.optionsList ?? []);
  const [linearBg, setLinearBg] = useState(
    initialData?.linearBg ?? DEFAULT_LINEAR_BG,
  );
  const [fileResetKey, setFileResetKey] = useState(0);

  const initialFormValues = useMemo(
    () => initialData?.formValues ?? defaultValues,
    [initialData],
  );

  const formSchema = useMemo(() => servicesSchema(mode), [mode]);

  const handleFormSuccess = () => {
    if (mode === "create") {
      setOptions([]);
      setLinearBg(DEFAULT_LINEAR_BG);
      setFileResetKey((prev) => prev + 1);
    }
    onSuccess?.();
  };

  const { register, handleSubmit, setValue, formState, isSubmitting } =
    useItemForm({
      schema: formSchema,
      mode,
      collectionId: SERVICES_ID,
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
          background_color: buildLinearGradient(linearBg),
          price: data.price,
          order_text: data.order_text,
          order_link: data.order_link,
          file: fileID,
          file_type: "image",
        };
      },
      onSuccess: handleFormSuccess,
    });

  const { errors } = formState;

  useEffect(() => {
    setOptions(initialData?.optionsList ?? []);
    setLinearBg(initialData?.linearBg ?? DEFAULT_LINEAR_BG);
    setFileResetKey((prev) => prev + 1);
  }, [initialData]);

  useEffect(() => {
    setValue("options", options.join(" , "));
  }, [options, setValue]);

  const getId = (suffix) => `${idPrefix}-${suffix}`;

  const buttonLabel = isSubmitting
    ? "در حال افزودن..."
    : mode === "edit"
      ? "بروزرسانی سرویس"
      : "افزودن سرویس";

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
            <Label htmlFor={getId("title")} label="نام سرویس" />
            <Input
              id={getId("title")}
              name="title"
              placeholder="مثال: پلن طلایی"
              register={register}
              error={errors.title}
              disabled={isSubmitting}
            />
          </div>

          <OptionField
            label={"آپشن ها"}
            placeholder={"مثال: طراحی لوگو رایگان"}
            register={register}
            errors={errors}
            isSubmitting={isSubmitting}
            options={options}
            setOptions={setOptions}
            getId={getId}
          />

          <div className="grid gap-2">
            <Label htmlFor={getId("price")} label="هزینه سرویس" />
            <Input
              type="number"
              id={getId("price")}
              name="price"
              placeholder="مثال: 600000"
              register={register}
              error={errors.price}
              disabled={isSubmitting}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor={getId("order_text")} label="متن اکشن باتن" />
            <Input
              id={getId("order_text")}
              name="order_text"
              placeholder="مثال: سفارش"
              register={register}
              error={errors.order_text}
              disabled={isSubmitting}
            />
            <p className="text-muted-foreground flex items-center gap-1 text-sm">
              متن پیشفرض: سفارش دهید
            </p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor={getId("order_link")} label="لینک اکشن باتن" />
            <Input
              type="url"
              id={getId("order_link")}
              name="order_link"
              placeholder="مثال:  https://t.me/buy"
              register={register}
              error={errors.order_link}
              disabled={isSubmitting}
            />
          </div>

          <div className="grid gap-6">
            <LinearPicker
              loading={isSubmitting}
              isSubmitting={isSubmitting}
              value={linearBg}
              onChange={setLinearBg}
            />

            <AnimatePresence mode="popLayout">
              <Motion.div
                animate={{
                  background: buildLinearGradient(linearBg),
                }}
                transition={{
                  duration: 0.2,
                  ease: "easeInOut",
                }}
                className="border-primary h-[10svh] overflow-hidden rounded-lg border border-solid shadow-2xl"
              ></Motion.div>
            </AnimatePresence>
          </div>

          <div className="grid gap-2">
            <Label htmlFor={getId("file")} label="عکس سرویس" />
            {mode === "edit" && initialData?.fileId && (
              <p className="text-muted-foreground text-sm">
                شناسه فایل فعلی: {initialData.fileId}
              </p>
            )}
            <FileInput
              id={getId("file")}
              name="file"
              label="عکس سرویس را انتخاب یا در اینجا رها کنید."
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

export default ServicesForm;
