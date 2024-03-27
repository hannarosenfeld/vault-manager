import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import { editFieldThunk, getAllFieldsThunk } from "../../store/field.js";
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
    let allFields = useSelector(state => state.field);
    let fields;
    const searchResult = useSelector(state => state.search.fields);
    const [position, setPosition] = useState(null);
    const [selectedFieldId, setSelectedFieldId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmStagingModalOpen, setIsConfirmStagingModalOpen] = useState(false);
    const [selectedVaultToStage, setSelectedVaultToStage] = useState(null);
    const [toggleSelected, setToggleSelected] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const warehouseInfo = dispatch(getAllWarehousesThunk());
        dispatch(getAllCustomersThunk())
        const fields = dispatch(getAllFieldsThunk(warehouseId))


        Promise.all([warehouseInfo])
            .then(() => setLoading(false))
            .catch(() => setLoading(false));
    }, [dispatch, warehouseId])


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
        console.log('🙃 hitting toggle field')
        console.log('🙃 ', type, topField, bottomField)
        if (topField.vaults.length || bottomField.vaults.length) return alert("Please empty top and bottom fields before switching field type!")
        if (!bottomField) return new Error({"message": "There needs to be a field below in order to turn this field into a couchbox"})
        
        const formData = {"name": topField.name, "field_id_1": topField.id, "field_id_2": bottomField.id}
        if (type === "couchbox-T") {
            formData["field_type"] = "vault"
            dispatch(editFieldThunk(formData))
        } else if (type === "vault") {
            formData["field_type"] = "couchbox"
            const topName = topField.name.match(/^([a-zA-Z]+)\d/);
            const bottomName = bottomField.name.match(/^([a-zA-Z]+)\d/);
            console.log("🥝 hiii", topField)
            if (topName[1] === bottomName[1]) {
                dispatch(editFieldThunk(formData))
            } else return new Error({"message": "This field cannot be turned into a couchbox"})
        }
    }

    const toggleFieldFull = () => {
        console.log("🍓 hiii")
    }

    function fieldGenerator() {
        const res = [];
            let temp = fields.sort((a,b) => a.name-b.name)
            for (let i = 0; i < warehouse.rows; i++) {
                for (let j = 0; j < warehouse.rows; j++) {
                    let field = temp[j*warehouse.rows+i]
                    field && res.push(
                        <div className="field"
                            key={field.id}
                            style={{
                                backgroundColor: `${
                                    field.vaults.length === 3 || field.full ? "var(--red)" :
                                        field.vaults.length === 2 ? "var(--yellow)" :
                                            field.vaults.length === 1 ? "var(--green)" :
                                                "var(--lightgrey)"
                                }`,
                                border: `${
                                    selectedFieldId === field.id ? "3px solid var(--blue)" : 
                                    searchResult && searchResult?.includes(field.id) ? "3px solid var(--blue)" :
                                    "none"
                                }`,
                                marginBottom: `${field.type === "couchbox-T" ? "-2.2em" : '-2.2em'}`,
                                width: `${field.type === "couchbox-B" ? "0px" : ''}`,
                                zIndex: `${field.type === "couchbox-B" ? "100" : 'none'}`,
                            }}
                            onClick={() => handleFieldClick(field.id)}
                        >{field.type === "couchbox-B" ? "" : <div className="field-number">{field.name}</div>}</div>
                    )
                }
        }
        return res.map((el) => <>{el}</>)
    }

    if (!warehouse) return null

    if (warehouse) {
        fields = warehouse.fields.map(id => allFields[id])
    }

    return (
        <div className="warehouse-wrapper">
            {loading && ( 
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
                        {fields ? fieldGenerator(fields): null}
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
