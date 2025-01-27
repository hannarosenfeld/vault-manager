import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function MiniWareHouse({ selectedFieldId, warehouseId }) {
    const warehouse = useSelector((state) => state.warehouse[warehouseId]);
    const allFields = useSelector((state) => state.field[warehouseId]);
    const [fields, setFields] = useState(null);

    useEffect(() => {
        let sortedFields;
        if (allFields) {
            // setFields(Object.values(allFields).sort((a,b) => a.name - b.name))
            let fieldsArr = (Object.values(allFields))

            //🚨 we want to use the sortFields function in utility.js for this
            sortedFields = fieldsArr.sort(function (a, b) {
                // Split the field names into alphabetical and numeric parts
                const [, aAlpha, aNum] = a.name.match(/^([A-Za-z]+)(\d+)$/);
                const [, bAlpha, bNum] = b.name.match(/^([A-Za-z]+)(\d+)$/);
            
                // Compare alphabetical parts first
                if (aAlpha !== bAlpha) {
                    return aAlpha.localeCompare(bAlpha);
                }
                
                // If alphabetical parts are equal, compare numeric parts as numbers
                return parseInt(aNum) - parseInt(bNum);
            });
        }

        setFields(sortedFields)
    }, [allFields])



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
                        height: "98%",
                        marginTop: "1em",
                    }}
                >   
                    {fields.map(field => (
                    <div
                        className="field"
                        key={field.id}
                        style={{
                            backgroundColor: `${
                                selectedFieldId === field.id ? "var(--blue)" : 
                                field.vaults?.length === 3 || field.vaults?.length === 4 || field.full ? "var(--red)" :
                                field.vaults?.length === 2 ? "var(--yellow)" :
                                field.vaults?.length === 1 ? "var(--green)" :
                                "lightgrey"
                            }`,
                            border: `${
                                selectedFieldId === field.id ? "3px solid var(--blue)" : 
                                "none"
                            }`,
                            height: `${field.type === "couchbox-T" ? "225%" : '100%'}`,
                            width: `${field.type === "couchbox-B" ? "0px" : ''}`,
                            zIndex: `${field.type === "couchbox-B" ? "100" : 'none'}`,
                            maxHeight: "4.3em"
                        }}
                    >{field.type === "couchbox-B" ? "" : <div style={{color: `${selectedFieldId === field.id ? "var(--white)" : "default"}`}} className="field-number">{field.name}</div>}</div>
                    ))}
                </div>
            )
    }
    if (!warehouse) return null

    
    return(
        <div>
            {fields?.length && fieldGenerator(fields)}
        </div>
    )
}
