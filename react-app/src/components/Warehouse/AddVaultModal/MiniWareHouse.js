import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function MiniWareHouse({ selectedFieldId, warehouseId }) {
    let fields = [];
    const warehouse = useSelector((state) => state.warehouse[warehouseId]);
    const allFields = useSelector(state => state.field);

    function fieldGenerator(fields) {
        const res = [];
        console.log('fields in generator', fields)
            let temp = fields.sort((a,b) => a.name-b.name)
            console.log('hitting field generator')
            for (let i = 0; i < warehouse.rows; i++) {
                for (let j = 0; j < warehouse.rows; j++) {
                    let field = temp[j*warehouse.rows+i]
                    field && res.push(
                    <div className="field"
                                key={field.id}
                                style={{
                                    backgroundColor: selectedFieldId === field.id
                                    ? "var(--blue)"
                                    : field.vaults.length
                                    ? "rgba(234, 55, 61, 0.3)"
                                    : selectedFieldId !== field.id
                                    ? "rgba(203, 203, 203, 0.5)"
                                    : "var(--lightgrey)",
                                borderColor:
                                    selectedFieldId === field.id
                                    ? "var(--blue)"
                                    : "transparent",
                                    marginBottom: `${field.type === "couchbox-T" ? "-2.2em" : ''}`,
                                    width: `${field.type === "couchbox-B" ? "0px" : ''}`,
                                    zIndex: `${field.type === "couchbox-B" ? "100" : 'none'}`,
                                }}
                            >
                                {field.type === "couchbox-B" ? "" : <div style={{color: selectedFieldId === field.id ?  "var(--white)" : "rgba(80, 80, 80, 0.5)" }} className="field-number">{field.name}</div>}

                            </div>)
                }
        }
        return res.map((el) => <>{el}</>)
    }
    if (!warehouse) return null

    if (warehouse) fields = warehouse.fields.map(id => allFields[id])

    
    return(
        <div className="warehouse-wrapper" style={{height: "100%", padding:"0"}}>
            <div className="warehouse" style={{height: "100%"}}>
                        {fields.length && fieldGenerator(fields)}
                </div>
         </div>   
    )
}
