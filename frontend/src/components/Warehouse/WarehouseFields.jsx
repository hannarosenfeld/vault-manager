import { useEffect, useState } from "react";
import { sortWarehouseFields } from "../../utils/sortWarehouseFields";
import FieldGrid from "./FieldGrid";

export default function WarehouseFields({ warehouse, handleFieldClick }) {
  const [sortedFields, setSortedFields] = useState([]);

  useEffect(() => {
    if (warehouse.fields) {
      setSortedFields(sortWarehouseFields(warehouse.fields));
    }
  }, [warehouse]);

  return (
    <div className="max-h-[90vh] border-2 border-b-fuchsia-700 overflow-hidden">
      {sortedFields.length ? (
        <FieldGrid warehouse={warehouse} fields={sortedFields} handleFieldClick={handleFieldClick} />
      ) : (
        "no fields"
      )}
    </div>
  );
}