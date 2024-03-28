import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function MiniWareHouse({ selectedFieldId, warehouseId }) {
    let fields = [];
    const warehouse = useSelector((state) => state.warehouse[warehouseId]);
    const allFields = useSelector(state => state.field);

    
    function fieldGenerator(fields) {
            return (
                <div 
                    style={{
                        display: "grid",
                        gridTemplateColumns: `repeat(${warehouse.columns}, 1fr)`,
                        gridTemplateRows: `repeat(${warehouse.rows}, 1fr)`,
                        gridAutoFlow: 'column',
                        gridGap: "0.5em",
                        width: "100%",
                        marginTop: "1em"
                    }}
                >   
                    {fields.map(field => (
                    <div
                        className="field"
                        key={field.id}
                        style={{
                            backgroundColor: `${
                                field.vaults?.length === 3 || field.full ? "var(--red)" :
                                field.vaults?.length === 2 ? "var(--yellow)" :
                                field.vaults?.length === 1 ? "var(--green)" :
                                "var(--lightgrey)"
                            }`,
                            border: `${
                                selectedFieldId === field.id ? "3px solid var(--blue)" : 
                                "none"
                            }`,
                            marginBottom: `${field.type === "couchbox-T" ? "-2.6em" : '0'}`,
                            width: `${field.type === "couchbox-B" ? "0px" : ''}`,
                            zIndex: `${field.type === "couchbox-B" ? "100" : 'none'}`,
                        }}
                    >{field.type === "couchbox-B" ? "" : <div className="field-number">{field.name}</div>}</div>
                    ))}
                </div>
            )
    }
    if (!warehouse) return null

    if (warehouse) fields = warehouse.fields.map(id => allFields[id])

    
    return(
        <div>
            {fields.length && fieldGenerator(fields)}
        </div>
    )
}
