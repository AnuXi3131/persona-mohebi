import { DATABASE_ID, HERO_ID } from "../appwrite";
import { database } from "../appwrite/appwrite.config";

export async function getHero() {
  try {
    const hero = await database.getDocument({
      databaseId: DATABASE_ID,
      collectionId: HERO_ID,
      documentId: HERO_ID,
    });

    return hero || {};
  } catch (error) {
    console.log(error.message);
    return {};
  }
}
