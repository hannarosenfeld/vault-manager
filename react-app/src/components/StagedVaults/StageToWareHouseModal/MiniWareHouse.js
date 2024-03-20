import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFieldsThunk } from "../../../store/field";
import "./MiniWarehouse.css";

export default function MiniWareHouse({ warehouseId, setSelectedField, selectedField}) {
    const dispatch = useDispatch();
    const warehouse = useSelector((state) => state.warehouse[warehouseId]);
    const allFields = useSelector((state) => state.field)
    let fields = [];

    useEffect(() => {
        fields = dispatch(getAllFieldsThunk(warehouseId));
    }, [warehouseId])

    useEffect(() => {
        if (selectedField) console.log("💁‍♀️ selectedField:", selectedField.id, allFields[selectedField.id])
    }, [selectedField])

    function fieldGenerator(fields) {
        const res = [];
        console.log('🧼 miniwarehouse: fields in generator', fields)
            let temp = fields.sort((a,b) => a.name-b.name)
            console.log('hitting field generator')
            for (let i = 0; i < warehouse.rows; i++) {
                for (let j = 0; j < warehouse.rows; j++) {
                    let field = temp[j*warehouse.rows+i]
                    // console.log(field ? "selectedField:", selectedField.id, field.id : '')

                    field && res.push(
                    <div className="field"
                                key={field.id}
                                onClick={() => setSelectedField(field)}
                                style={{
                                    backgroundColor: "var(--lightgrey)",
                                    border: `${selectedField && (selectedField?.id === field.id) ? "3px solid var(--blue)": "transparent"}`,
                                    marginBottom: `${field.type === "couchbox-T" ? "-2.2em" : 'none'}`,
                                    width: `${field.type === "couchbox-B" ? "0px" : '100%'}`,
                                    zIndex: `${field.type === "couchbox-B" ? "100" : 'none'}`,
                                    marginBottom: `${selectedField && (selectedField?.id === field.id) ? "-6px": "none"}`,

                                }}
                            >
                                {field.type === "couchbox-B" ? "" : <div style={{color: "rgba(80, 80, 80, 0.5)"}} className="field-number">{field.name}</div>}

                            </div>
                    )
                }
        }
        return res.map((el) => <>{el}</>)
    }
    if (!warehouse) return null

    if (warehouse) fields = warehouse.fields.map(id => allFields[id])

    
    return(
        <div className="warehouse-wrapper">
            <div className="mini-warehouse">
                {fields.length && fieldGenerator(fields)}
            </div>
         </div>   
    )
}
