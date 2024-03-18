import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFieldsThunk } from "../../../store/field";


export default function MiniWareHouse({ warehouseId }) {
    const dispatch = useDispatch();
    const warehouse = useSelector((state) => state.warehouse[warehouseId]);
    const allFields = useSelector((state) => state.field)
    let fields = [];

    useEffect(() => {
        fields = dispatch(getAllFieldsThunk(warehouseId));
    }, [warehouseId])

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
                                    backgroundColor: "var(--lightgrey)",
                                    borderColor: "transparent",
                                    marginBottom: `${field.type === "couchbox-T" ? "-2.2em" : ''}`,
                                    width: `${field.type === "couchbox-B" ? "0px" : ''}`,
                                    zIndex: `${field.type === "couchbox-B" ? "100" : 'none'}`,
                                }}
                            >
                                {field.type === "couchbox-B" ? "" : <div style={{color: "rgba(80, 80, 80, 0.5)" }} className="field-number">{field.name}</div>}

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
