import { GALLERY_IMAGES_ID } from "../../../services/appwrite";
import { Loader2 } from "lucide-react";
import { useRef } from "react";
import { TableProvider } from "../../../contexts";
import { useFileUpload, useRowsForm } from "../../../hooks";
import { imagesSchema } from "../../../schemas";
import {
  Card,
  CardContent,
  Label,
  FileInput,
  Button,
  Empty,
  TableContainer,
  TableHeader,
  Table,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../../components/ui";

function Images() {
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
    schema: imagesSchema,
    mapFieldsToPayload: async (data) => {
      const fileID = await upload({
        file: data.file,
        key: "file",
      });

      return {
        file: fileID,
        file_type: "image",
      };
    },
    mapFieldsToRows: (docs) =>
      docs.map((doc) => ({
        id: doc.$id,
        file: doc.file,
        file_type: doc.file_type,
      })),

    collectionID: GALLERY_IMAGES_ID,
  });

  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>عکس ها</CardTitle>
          <CardDescription>عکس های گالری خود را اضافه کنید</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            ref={containerRef}
            onSubmit={handleSubmit}
            className="grid gap-6"
            noValidate
          >
            <div className="grid gap-2">
              <Label htmlFor="file" label="عکس" />
              <FileInput
                id="file"
                name="file"
                label="عکس را انتخاب یا در اینجا رها کنید."
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
              label={loading || isSubmitting ? "در حال آپلود..." : "آپلود عکس"}
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
          title="لیست عکس ها"
          collectionId={GALLERY_IMAGES_ID}
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
            title={"هیچ عکسی آپلود نشده"}
            description={"اولین عکس خود را آپلود کنید و جداول را مشاهده کنید"}
            actionButton={true}
            onAction={() => containerRef.current.scrollIntoView()}
          />
        </div>
      )}
    </section>
  );
}
export default Images;
