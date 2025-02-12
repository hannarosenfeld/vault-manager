import { useEffect, useState } from "react";
import { sortWarehouseFields } from "../../utils/sortWarehouseFields";
import FieldGrid from "./FieldGrid";

export default function WarehouseFields({ warehouse }) {
  const [sortedFields, setSortedFields] = useState([]);

  useEffect(() => {
    if (warehouse.fields) {
      setSortedFields(sortWarehouseFields(warehouse.fields));
    }
  }, [warehouse]);

  return (
    <div>
      {sortedFields.length ? <FieldGrid warehouse={warehouse} fields={sortedFields} /> : 'no fields'}
    </div>
  );
}