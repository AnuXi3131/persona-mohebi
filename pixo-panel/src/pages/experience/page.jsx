import { useRef } from "react";
import { EXPERIENCE_ID } from "../../services/appwrite";
import { TableProvider } from "../../contexts";
import { useCollectionRows, useItemEditor } from "../../hooks";
import ExperienceForm from "./experience-form";
import {
  mapExperienceDocsToRows,
  mapExperienceDocumentToInitialValues,
} from "./experience.mappers";
import {
  EditModal,
  Empty,
  TableContainer,
  TableHeader,
  Table,
  PageHeader,
} from "../../components/ui";

function Experience() {
  const formRef = useRef(null);

  const { rows, loading, setQueryLength, stopFetching, reloadRows } =
    useCollectionRows({
      collectionId: EXPERIENCE_ID,
      mapFieldsToRows: mapExperienceDocsToRows,
    });

  const {
    isOpen,
    open,
    close,
    initialData,
    itemId,
    loading: editLoading,
  } = useItemEditor({
    collectionId: EXPERIENCE_ID,
    mapDocumentToInitialValues: mapExperienceDocumentToInitialValues,
  });

  return (
    <section>
      <PageHeader
        pageTitle={"تجربیات"}
        title={"تجربیات"}
        sub={"سوابق کاری خود را اضافه کنید"}
      />
      <div className="container px-4">
        <ExperienceForm
          formRef={formRef}
          mode="create"
          onSuccess={reloadRows}
          idPrefix="experience-create"
        />

        {rows.length ? (
          <TableProvider
            title="لیست تجربیات"
            searchBy="تجربیات"
            collectionId={EXPERIENCE_ID}
            reloadRows={reloadRows}
            data={rows}
            loading={loading}
            setQueryLength={setQueryLength}
            stopFetching={stopFetching}
            editable={true}
            onEdit={open}
          >
            <TableContainer className={"my-20"}>
              <TableHeader />
              <Table />
            </TableContainer>
          </TableProvider>
        ) : (
          <div className="mt-10">
            <Empty
              title={"هیچ آیتمی آپلود نشده"}
              description={
                "اولین آیتم خود را آپلود کنید و جداول را مشاهده کنید"
              }
              actionButton={true}
              onAction={() => formRef.current.scrollIntoView()}
            />
          </div>
        )}
      </div>

      <EditModal
        open={isOpen}
        onClose={close}
        title="ویرایش تجربه"
        description="مقادیر انتخاب شده را ویرایش کنید"
        isLoading={editLoading && !initialData}
      >
        {initialData && (
          <ExperienceForm
            mode="edit"
            itemId={itemId}
            initialData={initialData}
            onSuccess={() => {
              reloadRows();
              close();
            }}
            idPrefix="experience-edit"
          />
        )}
      </EditModal>
    </section>
  );
}
export default Experience;
