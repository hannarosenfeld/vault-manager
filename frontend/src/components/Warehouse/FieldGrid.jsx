export default function FieldGrid({ warehouse, fields, handleFieldClick }) {
  if (fields) {
    return (
      <div
        className="grid w-full h-full gap-1"
        style={{
          gridTemplateColumns: `repeat(${warehouse.columns}, 1fr)`,
          gridTemplateRows: `repeat(${warehouse.rows}, 1fr)`,
          gridAutoFlow: "column",
        }}
      >
        {fields.map((field) => (
          <div
            className="field bg-gray-200"
            key={field.id}
            style={{
              backgroundColor: `${
                (field.vaults?.length === 3 && field.type === "vault") ||
                field.full
                  ? "red"
                  : (field.vaults?.length === 4 &&
                      field.type === "couchbox-T") ||
                    field.full
                  ? "red"
                  : (field.vaults?.length === 3 &&
                      field.type === "couchbox-T") ||
                    field.full
                  ? "yellow"
                  : field.vaults?.length === 2
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
              <div className="text-md text-center">{field.name}</div>
            )}
          </div>
        ))}
      </div>
    );
  }
}
