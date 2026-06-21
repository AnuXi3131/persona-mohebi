import { AnimatePresence, motion as Motion } from "motion/react";
import TableBody from "./table-body";
import TableHead from "./table-head";
import { useTable } from "../../../contexts";

function Table() {
  const { visibleColumns } = useTable();

  return (
    <div className="border-border w-full overflow-x-auto overflow-y-visible rounded-lg border border-solid">
      <AnimatePresence mode="wait">
        <Motion.table
          key={visibleColumns}
          initial={{ opacity: 0, filter: "blur(6px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.3, ease: "easeInOut", damping: 100 }}
          className="w-full border-collapse"
        >
          <TableHead />
          <TableBody />
        </Motion.table>
      </AnimatePresence>
    </div>
  );
}
export default Table;
