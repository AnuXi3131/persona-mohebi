import { useState } from "react";
import { Ellipsis } from "lucide-react";
import { Dropdown } from "..";
import { useTable } from "../../../contexts";

// actions options add few more next updates...
const actionOptions = [
  {
    label: "ویرایش",
    value: "edit",
  },
  {
    label: "مشاهده",
    value: "view",
  },
  {
    label: "حذف",
    value: "delete",
  },
];

/**
 *
 * @property {React.ReactNode} dbRow
 */

function TableAction({ dbRow }) {
  const { editable, viewable, onEdit, onDelete, onView } = useTable();
  const [isOpen, setIsOpen] = useState(false);

  function getOptions() {
    const options = [];

    if (editable) {
      options.push(actionOptions[0]);
    }

    if (viewable) {
      options.push(actionOptions[1]);
    }

    options.push(actionOptions[2]);

    return options;
  }

  function handleAction(value) {
    switch (value) {
      case "delete":
        onDelete(dbRow.id, dbRow.file);
        break;
      case "edit":
        onEdit(dbRow.id);
        break;
      case "view":
        onView(dbRow.id);
        break;
    }
  }

  return (
    <td className="p-3 text-nowrap">
      <Dropdown
        triggerIcon={Ellipsis}
        triggerOnClick={() => setIsOpen(!isOpen)}
        options={getOptions()}
        isOpen={isOpen}
        setIsOpen={() => setIsOpen(false)}
        menuItemOnClick={(_, value) => {
          handleAction(value);
          setIsOpen(false);
        }}
        checkmark={false}
        className={"[&>button]:mx-auto [&>button]:p-3"}
        customWidth={100}
      />
    </td>
  );
}
export default TableAction;
