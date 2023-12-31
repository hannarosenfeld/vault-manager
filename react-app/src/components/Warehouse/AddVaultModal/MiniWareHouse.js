import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getWarehouseInfoThunk, getAllWarehouseVaultsThunk } from "../../../store/warehouse";
import { rowCreator } from "../../utility"

export default function MiniWareHouse({ selectedField }) {
    const dispatch = useDispatch();
    const rowsArr = rowCreator(useSelector(state => state.warehouse.warehouseFields));

    useEffect(() => {
        dispatch(getWarehouseInfoThunk());
        dispatch(getAllWarehouseVaultsThunk());
    }, [dispatch])

    const sortFields = (fields) => {
        const sortedFields = {};
        let sortedFieldsArr;

        for (let field of fields) {
            sortedFields[field.id] = field
        }

        sortedFieldsArr = Object.values(sortedFields)

        return sortedFieldsArr
    }
    return(
        <div className="warehouse-wrapper" style={{height: "100%", padding:"0"}}>
        <div className="warehouse" style={{height: "100%"}}>
            {rowsArr.map((row) => (
                <div key={row.id} className="row">
                {/* <div className="row-id">{row.id}</div> */}
                <div className="fields">
                {sortFields(row.fields).map((field, index) => (
                    <div
                        className="field"
                        key={field.id}
                        style={{
                            backgroundColor: selectedField?.field_id === field?.field_id
                                ? "var(--blue)"
                                : field.vaults.length
                                ? "rgba(234, 55, 61, 0.3)"
                                : selectedField.field_id !== field.field_id
                                ? "rgba(203, 203, 203, 0.5)"
                                : "var(--lightgrey)",
                            borderColor:
                                selectedField?.field_id === field?.field_id
                                ? "var(--blue)"
                                : "transparent",
                        }}>
                        <div style={{color: selectedField?.field_id === field?.field_id ?  "var(--white)" : "rgba(80, 80, 80, 0.5)" }} className="field-number">{field.field_id}</div>
                    </div>
                ))}
                </div>
                </div>
            ))}
        </div>
        </div>   
    )
}                 
