import { DATABASE_ID, SKILLS_ID } from "../appwrite";
import { database } from "../appwrite/appwrite.config";

export async function getSkills() {
  try {
    const skills = await database.listDocuments({
      databaseId: DATABASE_ID,
      collectionId: SKILLS_ID,
    });

    return skills.documents || [];
  } catch (error) {
    console.log(error.message);
    return [];
  }
}
