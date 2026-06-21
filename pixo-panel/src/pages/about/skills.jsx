import { SKILLS_ID } from "../../services/appwrite";
import { Loader2 } from "lucide-react";
import { useRef } from "react";
import { skillsSchema } from "../../schemas";
import { TableProvider } from "../../contexts";
import { useRowsForm, useFileUpload } from "../../hooks";
import {
  Card,
  CardContent,
  Label,
  Input,
  FileInput,
  Button,
  Empty,
  TableContainer,
  TableHeader,
  Table,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui";

function Skills() {
  const containerRef = useRef(null);
  const { progress, upload } = useFileUpload();

  const {
    register,
    handleSubmit,
    setValue,
    errors,
    isSubmitting,
    rows,
    loading,
    setQueryLength,
    stopFetching,
    reloadRows,
  } = useRowsForm({
    schema: skillsSchema,
    mapFieldsToPayload: async (data) => {
      const fileID = await upload({
        file: data.file,
        key: "file",
      });

      return {
        title: data.title,
        file: fileID,
        file_type: "image",
      };
    },
    mapFieldsToRows: (docs) =>
      docs.map((doc) => ({
        id: doc.$id,
        title: doc.title,
        file: doc.file,
        file_type: doc.file_type,
      })),

    collectionID: SKILLS_ID,
  });

  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>مهارت ها</CardTitle>
          <CardDescription>مهارت های خود را اضافه کنید</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            ref={containerRef}
            onSubmit={handleSubmit}
            className="grid gap-6"
            noValidate
          >
            <div className="grid gap-2">
              <Label htmlFor="title" label="نام مهارت" />
              <Input
                id="title"
                name="title"
                placeholder="مثال: آهنگ سازی"
                register={register}
                error={errors.title}
                disabled={loading || isSubmitting}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="file" label="عکس مهارت" />
              <FileInput
                id="file"
                name="file"
                label="عکس مهارت را انتخاب یا در اینجا رها کنید."
                accept="imageTypes"
                register={register}
                error={errors.file}
                onChange={(file) => setValue("file", file)}
                onReset={rows}
                disabled={loading || isSubmitting}
                uploadProgress={progress.file}
              />
            </div>

            <Button
              type="submit"
              label={
                loading || isSubmitting ? "در حال افزودن..." : "افزودن مهارت"
              }
              icon={loading || isSubmitting ? Loader2 : undefined}
              loading={loading || isSubmitting}
              className="mr-auto"
            />
          </form>
        </CardContent>
      </Card>
      {/*  */}
      {rows.length ? (
        <TableProvider
          title="لیست مهارت ها"
          searchBy="مهارت ها"
          collectionId={SKILLS_ID}
          reloadRows={reloadRows}
          data={rows}
          loading={loading}
          setQueryLength={setQueryLength}
          stopFetching={stopFetching}
        >
          <TableContainer className={"my-20"}>
            <TableHeader />
            <Table />
          </TableContainer>
        </TableProvider>
      ) : (
        <div className="mt-10">
          <Empty
            title={"هیچ مهارتی آپلود نشده"}
            description={"اولین مهارت خود را آپلود کنید و جداول را مشاهده کنید"}
            actionButton={true}
            onAction={() => containerRef.current.scrollIntoView()}
          />
        </div>
      )}
    </section>
  );
}
export default Skills;
