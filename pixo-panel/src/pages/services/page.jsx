import { useRef } from "react";
import { SERVICES_ID } from "../../services/appwrite";
import { TableProvider } from "../../contexts";
import { useCollectionRows, useItemEditor } from "../../hooks";
import ServicesForm from "./services-form";
import {
  mapServiceDocsToRows,
  mapServiceDocumentToInitialValues,
} from "./service.mappers";
import {
  EditModal,
  Empty,
  TableContainer,
  TableHeader,
  Table,
  PageHeader,
} from "../../components/ui";

function Services() {
  const formRef = useRef(null);

  const { rows, loading, setQueryLength, stopFetching, reloadRows } =
    useCollectionRows({
      collectionId: SERVICES_ID,
      mapFieldsToRows: mapServiceDocsToRows,
    });

  const {
    isOpen,
    open,
    close,
    initialData,
    itemId,
    loading: editLoading,
  } = useItemEditor({
    collectionId: SERVICES_ID,
    mapDocumentToInitialValues: mapServiceDocumentToInitialValues,
  });

  return (
    <section>
      <PageHeader
        pageTitle={"خدمات"}
        title={"خدمات"}
        sub={"خدماتی که ارائه میدهید را اضافه کنید"}
      />
      <div className="container px-4">
        <ServicesForm
          formRef={formRef}
          mode="create"
          onSuccess={reloadRows}
          idPrefix="services-create"
        />

        {rows.length ? (
          <TableProvider
            title="لیست خدمات"
            searchBy="خدمات"
            collectionId={SERVICES_ID}
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
        title="ویرایش سرویس"
        description="مقادیر انتخاب شده را ویرایش کنید"
        isLoading={editLoading && !initialData}
      >
        {initialData && (
          <ServicesForm
            mode="edit"
            itemId={itemId}
            initialData={initialData}
            onSuccess={() => {
              reloadRows();
              close();
            }}
            idPrefix="services-edit"
          />
        )}
      </EditModal>
    </section>
  );
}
export default Services;
