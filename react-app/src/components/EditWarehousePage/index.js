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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


    useEffect(() => {
        setFields(null);
        setLoadedWarehouseFields(false)
        const fields = dispatch(getAllFieldsThunk(warehouseId))

        Promise.all([fields])
            .then(() => setLoadedWarehouseFields(true))
            .catch(() => console.log("🚨 fields could not be loaded!"))
    }, [dispatch, warehouseId])

    useEffect(() => {
        if (loadedWarehouseFields) setFields(Object.values(allFields).filter(field => field.warehouse_id === parseInt(warehouseId)).sort((a,b) => a.name - b.name))
    }, [loadedWarehouseFields])

    console.log("💖", warehouse)

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
                        width: "100%",
                        height: "75vh",
                        marginBottom: "1rem"
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

    const addRow = (dir) => {
        
    }

    const deleteRow = (dir) => {
        console.log(fields)
    }

    const openModal = (dir, opperation) => {
        setIsModalOpen(true)
    }
    const closeModal = () => {
        setIsModalOpen(false);
    }



    return (
        <div className="wrapper" style={{width: "100%",height: "100%", display: "flex", alignItems:"center"}}>
            <div className="leftButtons" style={{display: "flex", alignItems: "center"}}>
                <OpenModalButton 
                    buttonText="+"
                    onItemClick={closeModal}
                    modalComponent={<EditWarehouseModal dir="left" opperation="add"/>}
                />
                <OpenModalButton 
                    buttonText="-"
                    onItemClick={closeModal}
                    modalComponent={<EditWarehouseModal dir="left" opperation="subtract"/>}
                />
            </div>
            <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
            <div className="topButtons" >
                <OpenModalButton 
                    buttonText="+"
                    onItemClick={closeModal}
                    modalComponent={<EditWarehouseModal dir="top" opperation="add"/>}
                />
                <OpenModalButton 
                    buttonText="-"
                    onItemClick={closeModal}
                    modalComponent={<EditWarehouseModal dir="top" opperation="subtract"/>}
                />
            </div>
            {fields ? fieldGenerator(fields): null}
            <div className="rightButtons" >
                <OpenModalButton 
                    buttonText="+"
                    onItemClick={closeModal}
                    modalComponent={<EditWarehouseModal dir="bottom" opperation="add"/>}
                />
                <OpenModalButton 
                    buttonText="-"
                    onItemClick={closeModal}
                    modalComponent={<EditWarehouseModal dir="bottom" opperation="subtract"/>}
                />
            </div>
            </div>
            <div className="bottomButtons" >
                <OpenModalButton 
                    buttonText="+"
                    onItemClick={closeModal}
                    modalComponent={<EditWarehouseModal dir="right" opperation="add"/>}
                />
                <OpenModalButton 
                    buttonText="-"
                    onItemClick={closeModal}
                    modalComponent={<EditWarehouseModal dir="right" opperation="subtract"/>}
                />
            </div>
        </div>
    )
}