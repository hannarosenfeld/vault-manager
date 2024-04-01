import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import { editFieldThunk, getAllFieldsThunk, editSingleFieldThunk } from "../../store/field.js";
import { useParams } from "react-router-dom";  
import { getAllWarehousesThunk } from "../../store/warehouse.js";
import { getAllCustomersThunk } from "../../store/customer.js";
import RenderTMB from "./RenderTMB";
import AddVaultModal from "./RenderTMB/AddVaultModal/AddVaultModal.js"
import ConfirmStaging from "./RenderTMB/ConfirmStaging/index.js";
import "./Warehouse.css"



export default function Warehouse() {
    const dispatch = useDispatch();
    const { warehouseId } = useParams(); 
    const warehouse = useSelector(state => state.warehouse[warehouseId]);
    let allFields = useSelector(state => state.field[warehouseId]);
    const [loadedWarehouseFields, setLoadedWarehouseFields] = useState(false);
    const [fields, setFields] = useState(null);

    const [sortedFields, setSortedFields] = useState(null);
    // const [loadedSortedFields, setLoadedSortedFields] = useState(false);
    const searchResult = useSelector(state => state.search.fields);
    const [position, setPosition] = useState(null);
    const [selectedFieldId, setSelectedFieldId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmStagingModalOpen, setIsConfirmStagingModalOpen] = useState(false);
    const [selectedVaultToStage, setSelectedVaultToStage] = useState(null);
    const [toggleSelected, setToggleSelected] = useState(false);
    const [loading, setLoading] = useState(true);
    // const [sortedObj, setSortedObj] = useState(null);

    useEffect(() => {
        setSelectedFieldId(null)
        const warehouseInfo = dispatch(getAllWarehousesThunk());
        dispatch(getAllCustomersThunk())
        const fields = dispatch(getAllFieldsThunk(warehouseId))

        Promise.all([warehouseInfo])
            .then(() => setLoading(false))
            .catch(() => setLoading(false));

        Promise.all([fields])
            .then(() => setLoadedWarehouseFields(true))
            .catch(() => console.log("🚨 fields could not be loaded!"))
    }, [dispatch, warehouseId])

    useEffect(() => {
        if (loadedWarehouseFields) setFields(Object.values(allFields).filter(field => field.warehouse_id === parseInt(warehouseId)).sort((a,b) => a.name - b.name))        
    }, [loadedWarehouseFields])

    // useEffect(() => {
    //     console.log("!!!! sortedFields: ", sortedFields)
    //     if (sortedFields) {
    //         setTimeout(() => {
    //             sortedFields.map(field => setSortedObj(sortedObj[field.name] = field))
    //         }, 4000)
    //         if (Object.values(sortedObj).length) setLoading(false)
    //     }
    //     // setSortedFields(sortedFields.sort((a,b) => a.name-b.name))
    // }, [sortedFields])

    // useEffect(() => {
    //     if (Object.values(sortedObj).length) setLoading(false)
    // }, [sortedObj])


    // useEffect(async () => {
    //     if (!loading && fields) {
    //         console.log("🐬 fields: ", fields)
    //     try {
    //         setSortedFields(fields.sort((a,b) => a.name-b.name))
    //       } catch (error) {
    //         console.log(error);
    //       } finally {
    //         // setSortedObj(sortedFields.map(field => {sortedObj[field.name] = field}))
    //         setLoadedSortedFields(true);
    //       }
    // }
    // }, [fields, allFields])

    const handleFieldClick = async (id) => {
        await setToggleSelected(false);
        await setSelectedFieldId(id);
    };

    const handleOpenAddVaultModal = async (position) => {
        await setPosition(position);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleStageClick = async (vault) => {
        setSelectedVaultToStage(vault);
        setIsConfirmStagingModalOpen(true);
    };

    const closeConfirmStagingModal = () => {
        setSelectedVaultToStage(null);
        setIsConfirmStagingModalOpen(false);
    }

    const toggleFieldType = (type, topField, bottomField) => {
        if (!bottomField) return alert("Can't switch to a couchbox on the last row")
        if (topField.vaults.length || bottomField.vaults.length) return alert("Please empty field before switching field type!")
        
        const formData = {"name": topField.name, "field_id_1": topField.id, "field_id_2": bottomField.id}
        if (type === "couchbox-T") {
            formData["type"] = "vault"
            dispatch(editFieldThunk(formData))
        } else if (type === "vault") {
            formData["type"] = "couchbox"
            const topName = topField.name.match(/^([a-zA-Z]+)\d/);
            const bottomName = bottomField.name.match(/^([a-zA-Z]+)\d/);
            if (bottomName || topName[1] === bottomName[1]) {
                dispatch(editFieldThunk(formData))
            } else return alert("Can't switch to a couchbox on the last row")
        }
    }

    const toggleFieldFull = (fieldId) => {
        dispatch(editSingleFieldThunk(fieldId, {}))
    }

    
    function fieldGenerator(fields) {
        console.log("🦐", fields)
        if (!loading && fields) {
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
                            border: `${
                                selectedFieldId === field.id ? "3px solid var(--blue)" : 
                                searchResult && searchResult?.includes(field.id) ? "3px solid var(--blue)" :
                                "none"
                            }`,
                            height: `${field.type === "couchbox-T" ? "209%" : '100%'}`,
                            marginBottom: `${field.type === "couchbox-T" ? "-2.6em" : '0'}`,
                            width: `${field.type === "couchbox-B" ? "0px" : ''}`,
                            zIndex: `${field.type === "couchbox-B" ? "100" : 'none'}`,
                        }}
                        onClick={() => handleFieldClick(field.id)}
                    >{field.type === "couchbox-B" ? "" : <div className="field-number">{field.name}</div>}</div>
                    ))}
                </div>
            )
        }
    }

    if (!warehouse) return null

    // if (warehouse) {
    //     fields = warehouse.fields.map(id => allFields[id])
    // }

    return (
        <div className="warehouse-wrapper">
            {loading  && ( 
                <div className="loading-animation-container"> 
                <CircularProgress  size={75} />
            </div>
            )}
            {!loading && ( 
                <>
                    <div className="field-info">
                        {selectedFieldId ? (
                            <RenderTMB
                                selectedFieldId={selectedFieldId}
                                handleStageClick={handleStageClick}
                                handleOpenAddVaultModal={handleOpenAddVaultModal}
                                toggleFieldType={toggleFieldType}
                                toggleFieldFull={toggleFieldFull}
                                toggleSelected={toggleSelected}
                                warehouse={warehouse}
                            />
                        ) : (
                            <div>
                                Select a field to view its info
                            </div>
                        )}
                    </div>
                    <div className="warehouse">
                        {Object.values(allFields).length ? fieldGenerator(fields) : null}
                    </div>
                    <Modal open={isModalOpen}>
                        <AddVaultModal
                            onClose={handleCloseModal}
                            selectedFieldId={selectedFieldId}
                            position={position}
                            warehouseId={warehouseId}
                        />
                    </Modal>
                    <Modal open={isConfirmStagingModalOpen} onClose={setIsConfirmStagingModalOpen}>
                        <ConfirmStaging
                            vault={selectedVaultToStage}
                            onClose={closeConfirmStagingModal}
                            warehouseId={warehouseId}
                            // fieldId={selectedFieldId}
                        />
                    </Modal>
                </>
            )}
        </div>
    )
}
