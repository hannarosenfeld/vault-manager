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
                    height: "100%"
                }}
            >
                {fields.map(field => (
                    <div
                        className=""
                        key={field.id}
                        style={{
                            position: "relative",
                            width: "100%",
                            paddingBottom: "100%", // This makes the div square
                            backgroundColor: `${
                                field.vaults?.length === 3 && field.type === "vault" || field.full ? "red" :
                                field.vaults?.length === 4 && field.type === "couchbox-T" || field.full ? "red" :
                                field.vaults?.length === 3 && field.type === "couchbox-T" || field.full ? "yellow" :
                                field.vaults?.length === 2 ? "yellow" :
                                field.vaults?.length === 1 ? "green" :
                                "lightgrey"
                            }`,
                            // border: `${
                            //     selectedField?.id === field.id ? "3px solid var(--blue)" : 
                            //     searchResult && searchResult?.includes(field.id) ? "3px solid var(--blue)" : "none"
                            // }`,
                            height: `${field.type === "couchbox-T" ? "213%" : '100%'}`,
                            marginBottom: `${field.type === "couchbox-T" ? "-2.6em" : '0'}`,
                            width: `${field.type === "couchbox-B" ? "0px" : ''}`,
                            zIndex: `${field.type === "couchbox-B" ? "100" : 'none'}`,
                        }}
                        onClick={() => handleFieldClick(field)}
                    >
                        {field.type === "couchbox-B" ? "" : (
                            <div
                                className="text-center text-sm"
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                {field.name}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    }
}