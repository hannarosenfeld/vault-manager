export default function FieldGrid({ warehouse, fields }) {
    if (fields) {
      return (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${warehouse.columns}, 1fr)`,
            gridTemplateRows: `repeat(${warehouse.rows}, 1fr)`,
            gridAutoFlow: 'column',
            gridGap: "1%",
            width: "100%",
            height: "100%",
          }}
        >
          {fields.map(field => (
            <div
              className="w-full relative pb-[100%]"
              key={field.id}
              style={{
                backgroundColor: `${
                  (field.vaults?.length === 3 && field.type === "vault") || field.full ? "red" :
                  (field.vaults?.length === 4 && field.type === "couchbox-T") || field.full ? "red" :
                  (field.vaults?.length === 3 && field.type === "couchbox-T") || field.full ? "yellow" :
                  field.vaults?.length === 2 ? "yellow" :
                  field.vaults?.length === 1 ? "green" :
                  "lightgrey"
                }`,
              }}
              onClick={() => handleFieldClick(field)}
            >
              {field.type === "couchbox-B" ? "" : (
                <div className="absolute inset-0 flex items-center justify-center text-center text-xs">
                  {field.name}
                </div>
              )}
            </div>
          ))}
        </div>
      );
    }
  }