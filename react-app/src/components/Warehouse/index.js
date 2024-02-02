import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Modal from '@mui/material/Modal';
import { getAllWarehouseVaultsThunk, getWarehouseInfoThunk } from "../../store/warehouse";
import { getAllVaultsThunk } from "../../store/vault"
import AddVaultModal from "./AddVaultModal/AddVaultModal.js"
import RenderTMB from "../RenderTMB";
import ConfirmStaging from "./ConfirmStaging";
import { rowCreator, sortFields } from "../utility";
import "./Warehouse.css"
import { getFieldThunk, toggleCouchBoxFieldThunk } from "../../store/field.js";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min.js";


export default function Warehouse () {
    const dispatch = useDispatch();
    const history = useHistory();
    const rowsArr = rowCreator(useSelector(state => state.warehouse.warehouseFields));
    const searchResult = useSelector(state => state.search.fields);
    const [selectedField, setSelectedField] = useState(null);
    let [top, setTop] = useState(null);
    let [middle, setMiddle] = useState(null);
    let [bottom, setBottom] = useState(null);
    const [position, setPosition] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmStagingModalOpen, setIsConfirmStagingModalOpen] = useState(false);
    const [selectedVaultToStage, setSelectedVaultToStage] = useState(null);
    const [toggleSelected, setToggleSelected] = useState(false);

    useEffect(() => {
        dispatch(getWarehouseInfoThunk());
        
    }, [toggleSelected])

    useEffect(() => {
        const getWareHouseInfo = dispatch(getWarehouseInfoThunk());
        const getAllWarehouseVaults = dispatch(getAllWarehouseVaultsThunk());
        const getAllVaults = dispatch(getAllVaultsThunk())
    }, [dispatch])

    useEffect(() => {
        if (selectedVaultToStage) {
            openConfirmStagingModal();
        }
    }, [selectedVaultToStage]);

    const handleToggleChange = async () => {
        const newToggleSelected = !toggleSelected;
        
        // If it's switching back to "Vault," update the selectedField type
        const updatedSelectedField = {
            ...selectedField,
            type: newToggleSelected ? "couchbox" : "vault",
        };
        
        // Update the local state
        setToggleSelected(newToggleSelected);
        
        // Dispatch actions to update Redux store
        await dispatch(toggleCouchBoxFieldThunk(selectedField.id));
        // await dispatch(getFieldThunk(selectedField.id));
        // Set the updated selected field without calling handleToggleChange again
        await setSelectedField(updatedSelectedField);
        history.push('/');
    };
              
    const updateSelectedFieldVaults = async (newVault) => {
        if (selectedField && newVault?.field_id === selectedField.id) {
        const updatedTop = newVault.position === "T" ? newVault : top;
        const updatedMiddle = newVault.position === "M" ? newVault : middle;
        const updatedBottom = newVault.position === "B" ? newVault : bottom;
    }
    };
    const handleFieldClick = async (field, row, index) => {
        await setToggleSelected(false);
        await setSelectedField(field);
    };

    // Function to open the modal and log the statement
    const handleOpenModal = async (position) => {
        await setPosition(position);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleStageClick = async (vault, position) => {
        if (
          (position === "T") || 
          (position === "M" && !top) ||
          (position === "B" && !middle) 
        ) {
          console.log("Staging Allowed!");
          await setSelectedVaultToStage(vault);
          await setPosition(position);
        } else {
          console.log("Staging not allowed for this vault position.");
        }
      };

    const openConfirmStagingModal = () => {
        setIsConfirmStagingModalOpen(true);
    };

    const closeConfirmStagingModal = () => {
        setSelectedVaultToStage(null);
        setIsConfirmStagingModalOpen(false);
    }

    const updateVaultPosition = (position) => {
        if (position === "T") setTop(null);
        if (position === "M") setMiddle(null);
        if (position === "B") setBottom(null);
    };

    return (
        <div className="warehouse-wrapper">
            <div className="field-info">
            { selectedField ? (
                <RenderTMB 
                selectedField={selectedField} 
                handleStageClick={handleStageClick} 
                handleOpenModal={handleOpenModal} 
                handleToggleChange={handleToggleChange}
                toggleSelected={toggleSelected}
                />
          ) : (
                <div>
                    Select a field to view its info
                </div>
            )}
            </div>
            <div className="warehouse">
            { rowsArr.map((row) => (
                 <div className="row" key={row.id}>
                { !searchResult && (
                 <div className="fields">
                {sortFields(row.fields).map((field, index) => {
                    return (
                        <div
                            className="field"
                            key={field.id}
                            style={{
                                backgroundColor: `${
                                    field?.vaults?.length === 3 || field.full ? "var(--red)" :
                                    field?.vaults?.length === 2 ? "var(--yellow)" :
                                    field?.vaults?.length === 1 ? "var(--green)" :
                                    "var(--lightgrey)"
                                }`,
                                border: `${selectedField?.id === field?.id ? "3px solid var(--blue)" : "none"}`,
                                marginBottom: `${field.type === "couchbox" ? "-2.2em" : ''}`,
                                width: `${field.bottom_couch_box ? "0px" : ''}`,
                            }}                      
                            onClick={() => handleFieldClick(field, row, index)}
                        >
                            {field.bottom_couch_box ? "" : field.type === "vault" ? <div className="field-number">{row.id}{index + 1}</div> : field.type === "couchbox" ? <div className="field-number">{row.id}{index + 1} / {row.id}{index + 2}</div> : ''}
                        </div>
                    );
                })}

                 </div>
                )}
                { searchResult && (
                 <div className="fields">
                 {sortFields(row.fields).map((field, index) => (
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
                        }}                      
                        onClick={() => handleFieldClick(field, row, index)}
                    >
                    {field.bottom_couch_box ? "" : field.type === "vault" ? <div className="field-number">{row.id}{index + 1}</div> : field.type === "couchbox" ? <div className="field-number">{row.id}{index + 1} / {row.id}{index + 2}</div> : ''}
                    </div>
                ))}
                 </div>
                )}                
             </div>
            ))}
            </div>
            <Modal open={isModalOpen}>
                <>
                    <AddVaultModal
                        onClose={handleCloseModal}
                        selectedField={selectedField}
                        tmb={position}
                        updateSelectedFieldVaults={updateSelectedFieldVaults} // Pass the function here
                    />
                </>
            </Modal>
            <Modal open={isConfirmStagingModalOpen} onClose={setIsConfirmStagingModalOpen}>                
                <>
                    <ConfirmStaging 
                        vault={selectedVaultToStage}
                        vaultCustomer={selectedVaultToStage?.customer.name}
                        vaultNumber={selectedVaultToStage?.vault_id}
                        vaultId={selectedVaultToStage?.id}
                        onClose={closeConfirmStagingModal}
                        updateVaultPosition={updateVaultPosition}
                    />
                </>
            </Modal>
        </div>
    )
}