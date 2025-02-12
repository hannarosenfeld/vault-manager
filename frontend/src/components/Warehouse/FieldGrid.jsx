import { useEffect, useState } from "react";
import { sortWarehouseFields } from "../../utils/sortWarehouseFields";

export default function FieldGrid({ warehouse, handleFieldClick }) {
  const [sortedFields, setSortedFields] = useState([]);

  useEffect(() => {
    if (warehouse.fields) {
      setSortedFields(sortWarehouseFields(warehouse.fields));
    }
  }, [warehouse]);

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
              className="field bg-gray-200"
              key={field.id}
              style={{
                backgroundColor: `${
                  (field.vaults?.length === 3 && field.type === "vault") ||
                  field.full ||
                  (field.vaults?.length === 4 && field.type === "couchbox-T") ||
                  field.full
                    ? "red"
                    : (field.vaults?.length === 3 &&
                        field.type === "couchbox-T") ||
                      field.full ||
                      field.vaults?.length === 2
                    ? "yellow"
                    : field.vaults?.length === 1
                    ? "green"
                    : "lightgrey"
                }`,
                aspectRatio: "1 / 1",
                marginBottom: `${field.type === "couchbox-T" ? "-2.6em" : "0"}`,
                width: `${field.type === "couchbox-B" ? "0px" : "100%"}`,
                height: "100%",
                zIndex: `${field.type === "couchbox-B" ? "100" : "none"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => handleFieldClick(field)}
            >
              {field.type === "couchbox-B" ? (
                ""
              ) : (
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
