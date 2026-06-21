export function mapExperienceDocsToRows(docs = []) {
  return docs.map((doc) => ({
    id: doc.$id,
    title: doc.title,
    file: doc.file,
    file_type: doc.file_type,
  }));
}

export function parseOptions(options = "") {
  if (!options) return [];

  return options
    .split(",")
    .map((opt) => opt.trim())
    .filter(Boolean);
}

export function mapExperienceDocumentToInitialValues(doc) {
  const parsedOptions = parseOptions(doc.options);

  return {
    formValues: {
      title: doc.title ?? "",
      options: doc.options ?? "",
      description: doc.description ?? "",
    },
    optionsList: parsedOptions,
    fileId: doc.file,
  };
}
