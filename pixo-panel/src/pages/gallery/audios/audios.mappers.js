export function mapAudiosToRows(docs = []) {
  return docs.map((doc) => ({
    id: doc.$id,
    title: doc.title,
    file: doc.thumbnail,
    file_type: doc.file_type,
  }));
}

export function mapAudiosDocumentToInitialValues(doc) {
  return {
    formValues: {
      title: doc.title ?? "",
    },
    thumbnail: doc.thumbnail,
    fileId: doc.file,
  };
}
