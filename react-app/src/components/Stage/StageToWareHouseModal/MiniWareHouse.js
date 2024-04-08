import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFieldsThunk,setSelectedFieldAction } from "../../../store/field";
import "./MiniWarehouse.css";

export default function MiniWareHouse({ warehouseId}) {
    const dispatch = useDispatch();
    const warehouse = useSelector((state) => state.warehouse[warehouseId]);
    const allFields = useSelector((state) => state.field[warehouseId])
    const selectedField = useSelector(state => state.field.selectedField)
    const [loadedWarehouseFields, setLoadedWarehouseFields] = useState(false);
    const [fields, setFields] = useState(null);

    useEffect(() => {
        setLoadedWarehouseFields(false)
        const warehouseFields = dispatch(getAllFieldsThunk(warehouseId))

        Promise.all([warehouseFields])
            .then(() => setLoadedWarehouseFields(true))
            .catch(() => console.log("🚨 fields could not be loaded!"))
    }, [dispatch, warehouseId])

    useEffect(() => {
        if (loadedWarehouseFields && allFields) setFields(Object.values(allFields).filter(field => field.warehouse_id === parseInt(warehouseId)).sort((a,b) => a.name - b.name))        
    }, [loadedWarehouseFields, warehouseId])

    function fieldGenerator(fields) {

        if (loadedWarehouseFields && fields) {
            return (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: `repeat(${warehouse.columns}, 1fr)`,
                        gridTemplateRows: `repeat(${warehouse.rows}, 1fr)`,
                        gridAutoFlow: 'column',
                        gridGap: "1%",
                        width: "100%",
                        height: "75vh",
                        marginBottom: "1rem"
                    }}
                >
                    {fields.map(field => (
                    <div className="miniwarehouse-field"
                        key={field.id}
                        onClick={async () => await dispatch(setSelectedFieldAction(field))}
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
                    ))}
                </div>
            )}
        }

    if (!warehouse) return null
    
    return(
        <div className="warehouse-wrapper">
            {fields && fieldGenerator(fields)}
        </div>   
    )
}
