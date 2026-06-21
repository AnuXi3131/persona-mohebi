import { useTable } from "../../../contexts";
import TableFilter from "./table-filter";
import TableSearch from "./table-search";

function TableHeader() {
  const { title } = useTable();

  return (
    <header className="flex flex-col items-center justify-between gap-6 md:flex-row">
      <h3 className="font-weight-bold text-primary text-lg">{title}</h3>
      <div className="flex flex-1 flex-col items-center justify-end gap-6 md:flex-row">
        <TableSearch />
        <TableFilter />
      </div>
    </header>
  );
}
export default TableHeader;
