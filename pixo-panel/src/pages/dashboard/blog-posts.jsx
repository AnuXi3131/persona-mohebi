import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Empty,
  Table,
  TableContainer,
} from "../../components/ui";
import { TableProvider } from "../../contexts";
import { useCollectionRows } from "../../hooks";
import { BLOG_POST_ID } from "../../services/appwrite";
import { mapBlogDocsToRows } from "../blog/blog.mappers";

function BlogPosts() {
  const navigate = useNavigate();
  const { rows, loading } = useCollectionRows({
    collectionId: BLOG_POST_ID,
    mapFieldsToRows: mapBlogDocsToRows,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <header className="flex flex-col items-center justify-between gap-3 md:flex-row">
            <h3 className="text-foreground text-lg font-medium">
              آخرین پست ها
            </h3>
            <Link to={"/admin/blog"}>
              <Button varient="outline" label={"مشاهده همه"} />
            </Link>
          </header>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {rows.length ? (
          <TableProvider
            collectionId={BLOG_POST_ID}
            data={rows}
            loading={loading}
          >
            <TableContainer>
              <Table />
            </TableContainer>
          </TableProvider>
        ) : (
          <Empty
            title={"هیچ مقاله‌ ای اضافه نشده"}
            description={"اولین مقاله خود را اضافه کنید و جداول را مشاهده کنید"}
            actionButton={true}
            onAction={() => {
              navigate("/admin/blog");
              setTimeout(
                () => document.getElementById("blog-create-title")?.focus(),
                100,
              );
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}
export default BlogPosts;
