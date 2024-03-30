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
                                        field.vaults.length === 3 || field.full ? "var(--red)" :
                                            field.vaults.length === 2 ? "var(--yellow)" :
                                                field.vaults.length === 1 ? "var(--green)" :
                                                    "var(--lightgrey)"
                                    }`,                                    
                                    border: `${selectedField && (selectedField?.id === field.id) ? "3px solid var(--blue)": "transparent"}`,
                                    marginBottom: `${field.type === "couchbox-T" ? "-2.2em" : 'none'}`,
                                    width: `${field.type === "couchbox-B" ? "0px" : '100%'}`,
                                    zIndex: `${field.type === "couchbox-B" ? "100" : 'none'}`,
                                    display: "flex",
                                    alignItems: "center",
                                    // height: `${field.type === "couchbox-T" ? "10em" : '100%'}`,
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

    if (warehouse) fields = warehouse.fields.map(id => allFields[id])

    
    return(
        <div className="warehouse-wrapper">
            <div className="mini-warehouse">
                {fields.length && fieldGenerator(fields)}
            </div>
         </div>   
    )
}
