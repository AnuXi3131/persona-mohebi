import { parseLinearGradient } from "../../utils";

export const DEFAULT_LINEAR_BG = {
  degree: 0,
  startColor: "#000000",
  midColor: "#000000",
  endColor: "#000000",
};

export function mapServiceDocsToRows(docs = []) {
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

export function mapServiceDocumentToInitialValues(doc) {
  const parsedOptions = parseOptions(doc.options);

  return {
    formValues: {
      title: doc.title ?? "",
      options: doc.options ?? "",
      price: doc.price ?? "",
      order_text: doc.order_text ?? "",
      order_link: doc.order_link ?? "",
    },
    optionsList: parsedOptions,
    linearBg: doc.background_color
      ? parseLinearGradient(doc.background_color)
      : DEFAULT_LINEAR_BG,
    fileId: doc.file,
  };
}
