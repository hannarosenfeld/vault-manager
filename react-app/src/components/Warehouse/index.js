import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import { getAllFieldsThunk } from "../../store/field.js";
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

    // useEffect(() => {
    //     setSelectedFieldId(null);
    // }, [warehouse?.id])

    useEffect(() => {
        const warehouseInfo = dispatch(getAllWarehousesThunk());
        dispatch(getAllCustomersThunk())
        const fields = dispatch(getAllFieldsThunk(warehouseId))

        Promise.all([warehouseInfo])
            .then(() => setLoading(false))
            .catch(() => setLoading(false));
    }, [dispatch, warehouseId])

    // useEffect(() => {
    //     if (selectedVaultToStage) {
    //         openConfirmStagingModal();
    //     }
    // }, [selectedVaultToStage]);

    // const handleToggleChange = () => {
    //     const newToggleSelected = !toggleSelected;

    //     // If it's switching back to "Vault," update the selectedField type
    //     const updatedSelectedField = {
    //         ...selectedField,
    //         type: newToggleSelected ? "couchbox" : "vault",
    //     };

    //     // Update the local state
    //     setToggleSelected(newToggleSelected);

    //     // Dispatch actions to update Redux store
    //     // dispatch(getFieldThunk(selectedField.id));

    //     window.location.reload(true);
    //     window.location.reload(false);
    // };

    // const updateSelectedFieldVaults = async (newVault) => {
    //     if (selectedField && newVault?.field_id === selectedField.id) {
    //         const updatedTop = newVault.position === "T" ? newVault : top;
    //         const updatedMiddle = newVault.position === "M" ? newVault : middle;
    //         const updatedBottom = newVault.position === "B" ? newVault : bottom;
    //     }
    // };

    const handleFieldClick = async (id) => {
        await setToggleSelected(false);
        await setSelectedFieldId(id);
    };

    // Function to open the modal and log the statement
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
                                border: `${selectedFieldId === field.id ? "3px solid var(--blue)" : "none"}`,
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
        <div className="warehouse-wrapper wrapper">
            {loading && ( // Show loading animation if loading state is true
                <div className="loading-animation-container"> 
                <CircularProgress  size={75} />
            </div>
            )}
            {!loading && ( // Render warehouse content when loading is complete
                <>
                    <div className="field-info">
                        {selectedFieldId ? (
                            <RenderTMB
                                selectedFieldId={selectedFieldId}
                                handleStageClick={handleStageClick}
                                handleOpenAddVaultModal={handleOpenAddVaultModal}
                                // handleToggleChange={handleToggleChange}
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
                        {/* {rowsArr?.map((row) => (
                            <div className="row" key={row.id}>
                                {searchResult && (
                                    <div className="fields">
                                        {row.fields.map((field, index) => (
                                            <div
                                                className="field"
                                                key={field.id}
                                                style={{
                                                    backgroundColor: `${
                                                        field.vaults.length === 3 || field.full && searchResult.includes(field.id) ? "var(--red)" :
                                                            field.vaults.length === 3 || field.full && !searchResult.includes(field.id) ? "rgba(234, 55, 61, 0.8)" :
                                                                field.vaults.length === 2 && searchResult.includes(field.id) ? "var(--yellow)" :
                                                                    field.vaults.length === 2 && !searchResult.includes(field.id) ? "rgba(255, 209, 102, 0.8)" :
                                                                        field.vaults.length === 1 && searchResult.includes(field.id) ? "var(--green)" :
                                                                            field.vaults.length === 1 && !searchResult.includes(field.id) ? "rgba(75, 181, 67, 0.8)" :
                                                                                "rgba(203,203,203,0.8)"
                                                    }`,
                                                    filter: !searchResult.includes(field.id) ? "brightness(25%)" : "brightness(120%)",
                                                    border: `${selectedField?.id === field?.id ? "3px solid var(--blue)" : ""}`,
                                                    marginBottom: `${field.type === "couchbox" ? "-2.2em" : ''}`,
                                                    width: `${field.bottom_couch_box ? "0px" : ''}`,
                                                    zIndex: `${field.bottom_couch_box ? "100" : 'none'}`
                                                }}
                                                onClick={() => handleFieldClick(field, row, index)}
                                            >
                                                {field.bottom_couch_box ? "" : field.type === "vault" ? <div className="field-number">{row.name}{index + 1}</div> : field.type === "couchbox" ? <div className="field-number">{row.name}{index + 1} / {row.name}{index + 2}</div> : ''}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))} */}
                    </div>
                    <Modal open={isModalOpen}>
                        <>
                            <AddVaultModal
                                onClose={handleCloseModal}
                                selectedFieldId={selectedFieldId}
                                position={position}
                                warehouseId={warehouseId}
                            />
                        </>
                    </Modal>
                    <Modal open={isConfirmStagingModalOpen} onClose={setIsConfirmStagingModalOpen}>
                        <>
                            <ConfirmStaging
                                vault={selectedVaultToStage}
                                onClose={closeConfirmStagingModal}
                                // warehouseId={warehouseId}
                            />
                        </>
                    </Modal>
                </>
            )}
        </div>
    )
}
