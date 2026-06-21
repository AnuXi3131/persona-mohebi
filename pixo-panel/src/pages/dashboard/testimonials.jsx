import { Link } from "react-router-dom";
import { TableProvider } from "../../contexts";
import { useCollectionRows } from "../../hooks";
import { TESTIMONIALS_ID } from "../../services/appwrite";
import { mapTestimonialsDocsToRows } from "../testimonial/testimonials.mapper";
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

function Testimonials() {
  const { rows, loading } = useCollectionRows({
    collectionId: TESTIMONIALS_ID,
    mapFieldsToRows: mapTestimonialsDocsToRows,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <header className="flex flex-col items-center justify-between gap-3 md:flex-row">
            <h3 className="text-foreground text-lg font-medium">آخرین نظرات</h3>
            <Link to={"/admin/testimonials"}>
              <Button varient="outline" label={"مشاهده همه"} />
            </Link>
          </header>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {rows.length ? (
          <TableProvider
            collectionId={TESTIMONIALS_ID}
            data={rows}
            loading={loading}
          >
            <TableContainer>
              <Table />
            </TableContainer>
          </TableProvider>
        ) : (
          <Empty
            title={"هیچ نظری ثبت نشده"}
            description={"به محض ثبت اولین نظر در اینجا نمایش داده خواهد شد"}
          />
        )}
      </CardContent>
    </Card>
  );
}
export default Testimonials;
