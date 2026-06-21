import { BLOG_POST_ID, DATABASE_ID } from "../appwrite";
import { database, Query } from "../appwrite/appwrite.config";

export async function getBlogPosts() {
  try {
    const blogPosts = await database.listDocuments({
      databaseId: DATABASE_ID,
      collectionId: BLOG_POST_ID,
      queries: [
        Query.orderDesc("$createdAt"),
        Query.select(["title", "description", "file"]),
      ],
    });

    return blogPosts.documents || [];
  } catch {
    return [];
  }
}

export async function getBlogPostById(id) {
  try {
    const blogPost = await database.getDocument({
      databaseId: DATABASE_ID,
      collectionId: BLOG_POST_ID,
      documentId: id,
    });
    return blogPost;
  } catch {
    return null;
  }
}
