import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFieldsThunk } from "../../../store/field";
import "./MiniWarehouse.css";

export default function MiniWareHouse({ warehouseId, setSelectedField, selectedField}) {
    console.log("🦋", warehouseId)
    const dispatch = useDispatch();
    const warehouse = useSelector((state) => state.warehouse[warehouseId]);
    const allFields = useSelector((state) => state.field[warehouseId])
    const [loadedWarehouseFields, setLoadedWarehouseFields] = useState(false);
    const [fields, setFields] = useState(null);

    useEffect(() => {
        const warehouseFields = dispatch(getAllFieldsThunk(warehouseId))

        Promise.all([warehouseFields])
            .then(() => setLoadedWarehouseFields(true))
            .catch(() => console.log("🚨 fields could not be loaded!"))
    }, [dispatch, warehouseId])

    useEffect(() => {
        if (loadedWarehouseFields) setFields(Object.values(allFields).filter(field => field.warehouse_id === parseInt(warehouseId)).sort((a,b) => a.name - b.name))        
    }, [loadedWarehouseFields, warehouseId])

    function fieldGenerator(fields) {
        const res = [];
            let temp = fields.sort((a,b) => a.name-b.name)
            for (let i = 0; i < warehouse.rows; i++) {
                for (let j = 0; j < warehouse.rows; j++) {
                    let field = temp[j*warehouse.rows+i]
                    field && res.push(
                    <div className="miniwarehouse-field"
                                key={field.id}
                                onClick={() => setSelectedField(field)}
                                style={{
                                    backgroundColor: `${
                                        selectedField && (selectedField?.id === field.id) ? "var(--blue)":
                                        field?.vaults?.length === 3 || field.full ? "var(--red)" :
                                            field?.vaults?.length === 2 ? "var(--yellow)" :
                                                field.vaults?.length === 1 ? "var(--green)" :
                                                    "var(--lightgrey)"
                                    }`,                                    
                                    // border: `${selectedField && (selectedField?.id === field.id) ? "2px solid var(--blue)": "transparent"}`,
                                    // padding: `${selectedField && (selectedField?.id === field.id) ? "-2px" : 'none'}`,
                                    width: `${field.type === "couchbox-B" ? "0px" : '100%'}`,
                                    zIndex: `${field.type === "couchbox-B" ? "100" : 'none'}`,
                                    alignItems: "center",
                                    height: `${field.type === "couchbox-T" ? "213%" : '100%'}`,
                                    // padding: `${selectedField && (selectedField?.id === field.id) ? "5px": "0"}`,
                                }}
                            >
                                {field.type === "couchbox-B" ? "" : <div style={{color: "var(--black)"}} className="field-number">{field.name}</div>}

                            </div>
                    )
                }
        }
        return res.map((el) => <>{el}</>)
    }
    if (!warehouse) return null

    // if (warehouse) fields = warehouse.fields.map(id => allFields[id])

    
    return(
        <div className="warehouse-wrapper">
            <div className="mini-warehouse">
                {fields && fieldGenerator(fields)}
            </div>
         </div>   
    )
}
