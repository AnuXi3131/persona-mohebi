export function mapBlogDocsToRows(docs) {
  return docs.map((doc) => ({
    id: doc.$id,
    title: doc.title,
    file: doc.file,
    file_type: doc.file_type,
  }));
}

export function mapBlogDocumentToInitialValues(doc) {
  return {
    formValues: {
      title: doc.title || "",
      description: doc.description || "",
      content: doc.content || "",
    },
    fileId: doc.file,
  };
}
