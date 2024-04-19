import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getAllFieldsThunk } from "../../store/field";
import { EditWarehouseModal } from "./editWarehouseModal";
import OpenModalButton from "../OpenModalButton";


export default function EditWarehousePage() {
    const dispatch = useDispatch();
    const { warehouseId } = useParams(); 
    const warehouse = useSelector(state => state.warehouse[warehouseId])
    const allFields = useSelector((state) => state.field[warehouseId]);
    const [loadedWarehouseFields, setLoadedWarehouseFields] = useState(false);
    const [fields, setFields] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        setFields(null);
        setLoadedWarehouseFields(false)
        const fields = dispatch(getAllFieldsThunk(warehouseId))

        Promise.all([fields])
            .then(() => setLoadedWarehouseFields(true))
            .catch(() => console.log("🚨 fields could not be loaded!"))
    }, [dispatch, warehouseId])

    useEffect(() => {
        let sortedFields;
        if (loadedWarehouseFields) {
            // setFields(Object.values(allFields).sort((a,b) => a.name - b.name))
            let fieldsArr = (Object.values(allFields))

            sortedFields = fieldsArr.sort(function (a, b) {
                if (a.name < b.name) {
                  return -1;
                }
                if (a.name > b.name) {
                  return 1;
                }
                return 0;
              });
        }

        setFields(sortedFields)

    }, [loadedWarehouseFields])


    function fieldGenerator(fields) {
        if (fields) {
            return (
                <div 
                    style={{
                        display: "grid",
                        gridTemplateColumns: `repeat(${warehouse.columns}, 1fr)`,
                        gridTemplateRows: `repeat(${warehouse.rows}, 1fr)`,
                        gridAutoFlow: 'column',
                        gridGap: "1%",
                        width: "95%",
                        height: "75vh",
                    }}
                >   
                    {fields.map(field => (
                    <div
                        className="field"
                        key={field.id}
                        style={{
                            backgroundColor: `${
                                field.vaults?.length === 3 && field.type === "vault" || field.full ? "var(--red)" :
                                field.vaults?.length === 4 && field.type === "couchbox-T" || field.full ? "var(--red)" :
                                field.vaults?.length === 3 && field.type === "couchbox-T" || field.full ? "var(--yellow)" :
                                field.vaults?.length === 2 ? "var(--yellow)" :
                                field.vaults?.length === 1 ? "var(--green)" :
                                "var(--lightgrey)"
                            }`,
                            height: `${field.type === "couchbox-T" ? "213%" : '100%'}`,
                            marginBottom: `${field.type === "couchbox-T" ? "-2.6em" : '0'}`,
                            width: `${field.type === "couchbox-B" ? "0px" : ''}`,
                            zIndex: `${field.type === "couchbox-B" ? "100" : 'none'}`,
                        }}
                    >{field.type === "couchbox-B" ? "" : <div className="field-number">{field.name}</div>}</div>
                    ))}
                </div>
            )
        }
    }

    return (
        <div style={{display: 'flex', alignItems: "column", height: "100%"}}>
        <div className="wrapper" style={{width: "100%",height: "100%", display: "flex", alignItems:"center", alignContent: "center",  flexDirection:"column", margin: "0 auto"}}>
            <div style={{display: "flex", width: "100%", margin: "0 auto", alignSelf: "center", marginTop: "1em", }}>
            <div className="leftButtons" style={{display: "flex", alignItems: "center", flexDirection:"column", margin: "auto"}}>
                <OpenModalButton 
                    buttonText={<span class="material-symbols-outlined">add</span>}
                    onItemClick={() => setIsModalOpen(false)}
                    modalComponent={<EditWarehouseModal dir="left" opperation="add" warehouseId={warehouseId} />}
                />
                <OpenModalButton 
                    buttonText={<span class="material-symbols-outlined">remove</span>}
                    onItemClick={() => setIsModalOpen(false)}
                    modalComponent={<EditWarehouseModal dir="left" opperation="subtract" warehouseId={warehouseId} />}
                />
            </div>
            <div style={{width: "80%", alignSelf: "center", margin: "0 auto"}}>
                <div style={{maxWidth: "100%"}}>
                    {fields ? fieldGenerator(fields): null}
                </div>
            </div>
            <div className="rightButtons" style={{display: "flex", alignItems: "center", flexDirection:"column", margin: "auto"}}>
                <OpenModalButton 
                    buttonText={<span class="material-symbols-outlined">add</span>}
                    onItemClick={() => setIsModalOpen(false)}
                    modalComponent={<EditWarehouseModal dir="bottom" opperation="add" warehouseId={warehouseId} />}
                />
                <OpenModalButton 
                    buttonText={<span class="material-symbols-outlined">remove</span>}
                    onItemClick={() => setIsModalOpen(false)}
                    modalComponent={<EditWarehouseModal dir="bottom" opperation="subtract" warehouseId={warehouseId} />}
                />
            </div>
            {/* <div style={{display: "flex", flexDirection: "column", width: "100%", alignItems: "center"}}> */}
            {/* {fields ? fieldGenerator(fields): null} */}
            
            {/* </div> */}
            </div>
            <div className="bottomButtons" style={{display: "flex", alignItems: "center", marginTop: "0", gap: '1em'}}>
                <OpenModalButton 
                    buttonText={<span class="material-symbols-outlined">add</span>}
                    onItemClick={() => setIsModalOpen(false)}
                    modalComponent={<EditWarehouseModal dir="right" opperation="add" warehouseId={warehouseId}/>}
                />
                <OpenModalButton 
                    buttonText={<span class="material-symbols-outlined">remove</span>}
                    onItemClick={() => setIsModalOpen(false)}
                    modalComponent={<EditWarehouseModal dir="right" opperation="subtract" warehouseId={warehouseId}/>}
                />
            </div>
            </div>
        </div>
    )
}