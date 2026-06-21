import { DATABASE_ID, TESTIMONIALS_ID } from "../appwrite";
import { database, Query } from "../appwrite/appwrite.config";

export async function getComments() {
  try {
    const response = await database.listDocuments({
      databaseId: DATABASE_ID,
      collectionId: TESTIMONIALS_ID,
      queries: [Query.equal("approved", true)],
    });

    return response.documents || [];
  } catch (error) {
    console.log(error.message);
    return [];
  }
}
