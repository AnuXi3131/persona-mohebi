import { database } from "../appwrite/appwrite.config";
import { CONTACT_FORM_ID, DATABASE_ID } from "../appwrite";

export async function getContactInfo() {
  try {
    const contactSettings = await database.getDocument({
      databaseId: DATABASE_ID,
      collectionId: CONTACT_FORM_ID,
      documentId: CONTACT_FORM_ID,
    });

    return contactSettings || {};
  } catch (error) {
    console.log(error.message);
    return {};
  }
}
