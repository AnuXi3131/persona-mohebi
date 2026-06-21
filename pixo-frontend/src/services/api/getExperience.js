import { DATABASE_ID, EXPERIENCE_ID } from "../appwrite";
import { database } from "../appwrite/appwrite.config";

export async function getExperience() {
  try {
    const response = await database.listDocuments({
      databaseId: DATABASE_ID,
      collectionId: EXPERIENCE_ID,
    });
    return response.documents || [];
  } catch (error) {
    console.log(error.message);
    return [];
  }
}
