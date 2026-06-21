import { ABOUT_ID, DATABASE_ID } from "../appwrite";
import { database } from "../appwrite/appwrite.config";

export async function getAbout() {
  try {
    const about = await database.getDocument({
      databaseId: DATABASE_ID,
      collectionId: ABOUT_ID,
      documentId: ABOUT_ID,
    });

    return about || {};
  } catch (error) {
    console.log(error.message);
    return {};
  }
}
