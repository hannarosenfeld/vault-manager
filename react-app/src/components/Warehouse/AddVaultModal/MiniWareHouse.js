import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function MiniWareHouse({ selectedFieldId, warehouseId }) {
    console.log('hitting mini warehouse');
    let fields = [];
    const warehouse = useSelector((state) => state.warehouse[warehouseId])
    const allFields = useSelector(state => state.field)

    
    function fieldGenerator(fields) {
        const res = [];
        console.log('fields in generator', fields)
            let temp = fields.sort((a,b) => a.name-b.name)
            console.log('hitting field generator')
            for (let i = 0; i < warehouse.rows; i++) {
                for (let j = 0; j < warehouse.rows; j++) {
                    let field = temp[j*warehouse.rows+i]
                    // field && res.push(<div className="field"
                    //             key={field.id}
                    //             // style={{
                    //             //     backgroundColor: `${
                    //             //         field.vaults.length === 3 || field.full ? "var(--red)" :
                    //             //             field.vaults.length === 2 ? "var(--yellow)" :
                    //             //                 field.vaults.length === 1 ? "var(--green)" :
                    //             //                     "var(--lightgrey)"
                    //             //     }`,
                    //             //     border: `${selectedFieldId === field.id ? "3px solid var(--blue)" : "none"}`,
                    //             //     marginBottom: `${field.type === "couchbox-T" ? "-2.2em" : ''}`,
                    //             //     width: `${field.type === "couchbox-B" ? "0px" : ''}`,
                    //             //     zIndex: `${field.type === "couchbox-B" ? "100" : 'none'}`,
                    //             // }}
                    //         >
                    //             {field.type === "couchbox-B" ? "" : <div className="field-number">{field.name}</div>}

                    //         </div>)
                    field && res.push(<div>test</div>)
                }
        }
        return res.map((el) => <>{el}</>)
    }
    if (!warehouse) return null

    if (warehouse) fields = warehouse.fields.map(id => allFields[id])

    
    return (<div>
        {fields.length && fieldGenerator(fields)}
    </div>)
    // console.log('fields before return ', fields)
    // return (<div>
    //     {fields && fields.map(f => <>{f.id}</>)}
    // </div>)

    // return(
    //     <div className="warehouse-wrapper" style={{height: "100%", padding:"0"}}>
    //         <div className="warehouse" style={{height: "100%"}}>
    //             <div className="row">
    //             {/* <div className="row-id">{row.id}</div> */}
    //             <div className="fields">
    //             {/* {sortFields(row.fields).map((field, index) => (
    //                 <div
    //                     className="field"
    //                     key={field.id}
    //                     style={{
    //                         backgroundColor: selectedField?.field_id === field?.field_id
    //                             ? "var(--blue)"
    //                             : field.vaults.length
    //                             ? "rgba(234, 55, 61, 0.3)"
    //                             : selectedField.field_id !== field.field_id
    //                             ? "rgba(203, 203, 203, 0.5)"
    //                             : "var(--lightgrey)",
    //                         borderColor:
    //                             selectedField?.field_id === field?.field_id
    //                             ? "var(--blue)"
    //                             : "transparent",
    //                     }}>
    //                     <div style={{color: selectedField?.field_id === field?.field_id ?  "var(--white)" : "rgba(80, 80, 80, 0.5)" }} className="field-number">{field.field_id}</div>
    //                 </div>
    //             ))} */}
    //             </div>
    //             </div>
    //         </div>
    //     </div>   
    // )
}                 
