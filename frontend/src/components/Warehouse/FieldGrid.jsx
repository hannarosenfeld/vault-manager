import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentField } from "../../store/warehouse";
import { sortWarehouseFields } from "../../utils/sortWarehouseFields";

export default function FieldGrid({ warehouse, handleFieldClick }) {
  const dispatch = useDispatch();
  const [sortedFields, setSortedFields] = useState([]);
  const [selectedField, setSelectedField] = useState(null);

  useEffect(() => {
    if (warehouse.fields) {
      setSortedFields(sortWarehouseFields(warehouse.fields));
    }
  }, [warehouse, dispatch]);

  const handleFieldSelect = (field) => {
    setSelectedField(field.id);
    dispatch(setCurrentField(field));
    handleFieldClick(field);
  };

  return (
    <div className="flex-grow">
      {sortedFields.length ? (
        <div
          className="grid w-full h-full gap-1"
          style={{
            gridTemplateColumns: `repeat(${warehouse.columns}, 1fr)`,
            gridTemplateRows: `repeat(${warehouse.rows}, 1fr)`,
            gridAutoFlow: "column",
          }}
        >
          {sortedFields.map((field) => (
            <div
              className={`field bg-gray-200 ${
                selectedField === field.id ? "border-2 border-blue-500" : ""
              }`}
              key={field.id}
              style={{
                display: field.type === "couchbox-B" ? "none" : "flex",
                height: field.type === "couchbox-T" ? "calc(10vh + 1px)" : "5vh", // Double the height for couchbox-T
                backgroundColor: `${
                  (Object.keys(field.vaults).length === 3 && field.type === "vault") ||
                  field.full ||
                  (Object.keys(field.vaults).length === 4 && field.type === "couchbox-T") ||
                  field.full
                    ? "var(--red)"
                    : (Object.keys(field.vaults).length === 3 &&
                        field.type === "couchbox-T") ||
                      field.full ||
                      Object.keys(field.vaults).length === 2
                    ? "var(--yellow)"
                    : Object.keys(field.vaults).length === 1
                    ? "var(--green)"
                    : "var(--lightgrey)"
                }`,
                width: "100%",
                zIndex: field.type === "couchbox-B" ? "100" : "auto",
                alignItems: "center",
                justifyContent: "center",
                gridRow: field.type === "couchbox-T" ? "span 2" : "auto", // Span two rows for couchbox-T
              }}
              onClick={() => handleFieldSelect(field)}
            >
              {field.type !== "couchbox-B" && (
                <div className="text-xs md:text-md text-center">
                  {field.name}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        "no fields"
      )}
    </div>
  );
}