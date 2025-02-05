export default function FieldGrid(fields, warehouse, handleFieldClick, searchResult) {
    console.log("🏡 searchResult", searchResult)

    if (fields && warehouse) {
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
                    margin: "0 auto"
                }}
            >   
                {fields.map(field => (
                <div
                    className="field"
                    key={field.id}
                    style={{
                        backgroundColor: `${
                            field.vaults?.length === 3 && field.type === "vault" || field.full ? "var(--red)" :
                            field.vaults?.length === 4 && field.type === "couchbox-T" || field.full ? "var(--red)" :
                            field.vaults?.length === 3 && field.type === "couchbox-T" || field.full ? "var(--yellow)" :
                            field.vaults?.length === 2 ? "var(--yellow)" :
                            field.vaults?.length === 1 ? "var(--green)" :
                            "var(--lightgrey)"
                        }`,
                        height: `${field.type === "couchbox-T" ? "213%" : '100%'}`,
                        marginBottom: `${field.type === "couchbox-T" ? "-2.6em" : '0'}`,
                        width: `${field.type === "couchbox-B" ? "0px" : '100%'}`,
                        zIndex: `${field.type === "couchbox-B" ? "100" : 'none'}`,
                    }}
                    {...(handleFieldClick ? { onClick: () => handleFieldClick(field) } : {})}
                >{field.type === "couchbox-B" ? "" : <div className="field-number">{field.name}</div>}</div>
                ))}
            </div>
        )
    }
}
