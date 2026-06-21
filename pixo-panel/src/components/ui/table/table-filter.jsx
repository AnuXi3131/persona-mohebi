import { useEffect, useMemo, useState } from "react";
import { Dropdown } from "..";
import { useTable } from "../../../contexts";

function TableFilter() {
  const { allColumns, setVisibleColumns } = useTable();
  const [selectedValues, setSelectedValues] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const columns = useMemo(() => {
    if (!allColumns || !allColumns.length) return [];
    return allColumns.map((key) => ({
      label: key,
      value: key,
    }));
  }, [allColumns]);

  useEffect(() => {
    if (!allColumns || allColumns.length === 0) return;
    setSelectedValues((prev) => (prev && prev.length ? prev : allColumns));
  }, [allColumns]);

  useEffect(() => {
    if (!allColumns) return;
    setVisibleColumns(allColumns.filter((col) => selectedValues.includes(col)));
  }, [selectedValues, allColumns, setVisibleColumns]);

  return (
    <div className="max-md:w-full [&>*>button]:max-md:w-full">
      <Dropdown
        mode={"multi"}
        options={columns}
        selectedValues={selectedValues}
        setSelectedValues={setSelectedValues}
        triggerText={"ستون ها"}
        triggerOnClick={() => setIsOpen(!isOpen)}
        isOpen={isOpen}
        setIsOpen={() => setIsOpen(false)}
      />
    </div>
  );
}

export default TableFilter;
