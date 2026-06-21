import { createContext, useContext, useEffect, useState } from "react";
import { useDeleteRow } from "../hooks";

const TableContext = createContext();

/**
 * @property {string} title
 * @property {string} searchBy
 * @property {string} collectionId
 * @property {Function} reloadRows
 * @property {Array} data
 * @property {string} fileType
 * @property {boolean} loading
 * @property {function} setQueryLength
 * @property {boolean} stopFetching
 * @property {boolean} editable
 * @property {Function} onEdit
 * @property {boolean} viewable
 * @property {Function} onView
 * @property {React.ReactNode} children
 */

export function TableProvider({
  title,
  searchBy,
  collectionId,
  reloadRows,
  data = [],
  fileType = "image",
  loading,
  setQueryLength,
  stopFetching,
  editable = false,
  viewable = false,
  onEdit: onEditRow,
  onView: onViewRow,
  children,
}) {
  const [searchText, setSearchText] = useState("");
  const [allColumns, setAllColumns] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState([]);

  const hiddenColumns = ["file_type", "$id", "$permissions"];
  const { deleteItem } = useDeleteRow(collectionId);

  useEffect(() => {
    if (data.length > 0) {
      const cols = Object.keys(data[0]).filter(
        (key) => !hiddenColumns.includes(key),
      );
      setAllColumns(cols);
      setVisibleColumns(cols);
    }
  }, [data]);

  async function onDelete(rowId, fileId) {
    await deleteItem(rowId, fileId);
    await reloadRows();
  }

  function handleEdit(rowId) {
    onEditRow?.(rowId);
  }

  function handleView(rowId) {
    onViewRow?.(rowId);
  }

  return (
    <TableContext.Provider
      value={{
        title,
        searchBy,
        data,
        fileType,
        loading,
        setQueryLength,
        stopFetching,
        editable,
        viewable,
        searchText,
        setSearchText,
        allColumns,
        visibleColumns,
        setVisibleColumns,
        onDelete,
        onEdit: handleEdit,
        onView: handleView,
      }}
    >
      {children}
    </TableContext.Provider>
  );
}

/**
 * @property {string} title
 * @property {string} searchBy
 * @property {Array} data
 * @property {string} fileType
 * @property {boolean} loading
 * @property {function} setQueryLength
 * @property {boolean} stopFetching
 * @property {boolean} editable
 * @property {boolean} viewable
 * @property {string} searchText
 * @property {Function} setSearchText
 * @property {Array} allColumns
 * @property {Array} visibleColumns
 * @property {Function} setVisibleColumns
 * @property {Function} onEdit
 * @property {Function} onDelete
 * @property {Function} onView
 */
export const useTable = () => useContext(TableContext);
