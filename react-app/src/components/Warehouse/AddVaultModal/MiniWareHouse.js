import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function MiniWareHouse({ selectedFieldId, warehouseId }) {
    console.log('hitting mini warehouse');
    let fields = [];
    const warehouse = useSelector((state) => state.warehouse[warehouseId])
    const allFields = useSelector(state => state.field)

    console.log("🥎", warehouseId, selectedFieldId)


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
                                    backgroundColor: `${
                                        field.vaults.length === 3 || field.full ? "var(--red)" :
                                            field.vaults.length === 2 ? "var(--yellow)" :
                                                field.vaults.length === 1 ? "var(--green)" :
                                                    "var(--lightgrey)"
                                    }`,
                                    border: `${selectedFieldId === field.id ? "3px solid var(--blue)" : "none"}`,
                                    marginBottom: `${field.type === "couchbox-T" ? "-2.2em" : ''}`,
                                    width: `${field.type === "couchbox-B" ? "0px" : ''}`,
                                    zIndex: `${field.type === "couchbox-B" ? "100" : 'none'}`,
                                }}
                            >
                                {field.type === "couchbox-B" ? "" : <div className="field-number">{field.name}</div>}

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
