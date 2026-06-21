import { getBlogPostById } from "../../services/api";
import { STORAGE_ID } from "../../services/appwrite";
import { storage } from "../../services/appwrite/appwrite.config";

async function BlogPostPage(id) {
  const post = await getBlogPostById(id);

  if (!post) {
    return /*html*/ `
      <empty-state message="مطلب پیدا نشد"></empty-state>
    `;
  }

  const thumbnail = storage.getFileView({
    bucketId: STORAGE_ID,
    fileId: post.file,
  });

  return /*html*/ `
    <blog-post
      data-thumbnail="${thumbnail}"
      data-title="${post.title}"
      data-date="${post.$createdAt}"
      data-content='${post.content}'
    ></blog-post>
  `;
}

export default BlogPostPage;
