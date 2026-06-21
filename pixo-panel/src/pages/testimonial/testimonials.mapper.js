export function mapTestimonialsDocsToRows(docs = []) {
  return docs.map((doc) => ({
    id: doc.$id,
    title: doc.title,
    file: doc.file,
    file_type: doc.file_type,
  }));
}

export function mapTestimonialsDocumentToInitialValues(doc) {
  return {
    formValues: {
      title: doc.title || "",
      comment: doc.comment || "",
      social_name: doc.social_name || "",
      social_link: doc.social_link || "",
      approved: doc.approved || false,
    },
    fileId: doc.file,
  };
}
