import { useTable } from "../../../contexts";

function TableHead() {
  const { visibleColumns } = useTable();

  return (
    <thead>
      <tr className="hover:bg-accent border-border border-b border-solid">
        {visibleColumns.map((key) => (
          <th key={key} className="p-3 text-nowrap uppercase">
            {key}
          </th>
        ))}
        <th className="p-3 text-nowrap uppercase">عملیات</th>
      </tr>
    </thead>
  );
}
export default TableHead;
