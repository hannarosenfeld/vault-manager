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


export default function Warehouse () {
    const dispatch = useDispatch();
    const rowsArr = rowCreator(useSelector(state => state.warehouse.warehouseFields));
    const vaultsObj = useSelector(state => state.vault.vaults);
    const vaultsArr = Object.values(vaultsObj);
    const searchmode = useSelector(state => state.warehouse.searchmode);
    const [selectedField, setSelectedField] = useState(null);
    let [top, setTop] = useState(null);
    let [middle, setMiddle] = useState(null);
    let [bottom, setBottom] = useState(null);
    const [position, setPosition] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmStagingModalOpen, setIsConfirmStagingModalOpen] = useState(false);
    const [selectedVaultToStage, setSelectedVaultToStage] = useState(null);
    const [topmostVault, setTopmostVault] = useState(null);


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

    const updateSelectedFieldVaults = async (newVault) => {
        if (selectedField && newVault?.field_id === selectedField.id) {
        const updatedTop = newVault.position === "T" ? newVault : top;
        const updatedMiddle = newVault.position === "M" ? newVault : middle;
        const updatedBottom = newVault.position === "B" ? newVault : bottom;
    }
    };

    function findTopmostVault(vaults) {
        setTopmostVault(vaultsObj[vaults[0]])

        for (let vault of vaults) {
            vault = vaultsObj[vault];
            if (vault.position > topmostVault) setTopmostVault(vault)

        }
        
        return topmostVault;
    }    
      
    const handleFieldClick = async (field, row, index) => {
        await setSelectedField(field);
        findTopmostVault(field.vaults);
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
            {selectedField ? (
                <RenderTMB topmostVault={topmostVault} selectedField={selectedField} handleStageClick={handleStageClick} handleOpenModal={handleOpenModal} />
          ) : (
                <div>
                    Select a field to view its info
                </div>
            )}
            </div>
            <div className="warehouse">
            {rowsArr.map((row) => (
                 <div className="row" key={row.id}>
                {!searchmode && (
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
                            }}                      
                            onClick={() => handleFieldClick(field, row, index)}
                        >
                            <div className="field-number">{row.id}{index + 1}</div>
                        </div>
                    );
                })}

                 </div>
                )}
                {searchmode && (
                 <div className="fields">
                 {row.fields.map((field, index) => (
                    <div
                        className="field"
                        key={field.id}
                        style={{
                            backgroundColor: `${
                                field.vaults.length === 3 || field.full && field.contains_searched_customer ? "var(--red)" :
                                field.vaults.length === 3 || field.full && !field.contains_searched_customer ? "rgba(234, 55, 61, 0.8)" :
                                field.vaults.length === 2 && field.contains_searched_customer ? "var(--yellow)" :
                                field.vaults.length === 2 && !field.contains_searched_customer ? "rgba(255, 209, 102, 0.8)" :
                                field.vaults.length === 1 && field.contains_searched_customer ? "var(--green)" :
                                field.vaults.length === 1 && !field.contains_searched_customer ? "rgba(75, 181, 67, 0.8)" : 
                                "rgba(203,203,203,0.8)"
                              }`,
                              filter:!field.contains_searched_customer ? "brightness(25%)" : "brightness(120%)",
                            border: `${selectedField?.id === field?.id ? "3px solid var(--blue)" : "blue"}`,
                        }}                      
                        onClick={() => handleFieldClick(field, row, index)}
                    >
                        <div className="field-number">{field.field_id}</div>
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
                        updateSelectedFieldVaults={updateSelectedFieldVaults} // Pass the function here
                    />
                </>
            </Modal>
        </div>
    )
}