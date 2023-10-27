import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Modal from '@mui/material/Modal';
import { getAllWarehouseVaultsThunk, getWarehouseInfoThunk } from "../../store/warehouse";
import { getAllVaultsThunk } from "../../store/vault"
import AddVaultModal from "./AddVaultModal/AddVaultModal.js"
import RenderTMB from "../RenderTMB";
import ConfirmStaging from "./ConfirmStaging";
import "./Warehouse.css"


export default function Warehouse () {
    const dispatch = useDispatch();
    const rows = useSelector(state => state.warehouse.warehouseRows);
    const vaults = useSelector(state => state.warehouse.warehouseVaults);
    const searchmode = useSelector(state => state.warehouse.searchmode);
    const rowsArr = Object.values(rows);
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
        console.log("🪻 in warehouse. vaults: ", vaults)
    }, [vaults])

    useEffect(() => {
        console.log("🌸 selected field: ", selectedField)
    }, [selectedField])

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
    
        await setTop(updatedTop);
        await setMiddle(updatedMiddle);
        await setBottom(updatedBottom);
    }
    };

    function findTopmostVault(vaults) {
        for (const vault of vaults) {
          if (!topmostVault || vault.position < topmostVault.position) {
            setTopmostVault(vault)
          }
        }
      }
      
    const handleFieldClick = async (field, row, index) => {
        await setSelectedField(field);
        await setTop(null)
        await setMiddle(null)
        await setBottom(null)
        
        if (field.vaults.length > 0) {
            await setTop(field.vaults.find(vault => vault.position === "T"))
            await setMiddle(field.vaults.find(vault => vault.position === "M"))
            await setBottom(field.vaults.find(vault => vault.position === "B"))
        }

        if (field.vaults.length > 0) {
            const topmost = findTopmostVault(field.vaults);
            if (topmost) {
              setTopmostVault(topmost);
              if (topmost.position === "T") await setTop(topmost);
              if (topmost.position === "M") await setMiddle(topmost);
              if (topmost.position === "B") await setBottom(topmost);
            }
          }
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
          await setSelectedVaultToStage(vault);
          await setPosition(position)
          console.log("Staging Allowed!");
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

    const sortFields = (fields) => {
        const sortedFields = {};
        let sortedFieldsArr;

        for (let field of fields) {
            sortedFields[field.id] = field
        }

        sortedFieldsArr = Object.values(sortedFields)

        return sortedFieldsArr
    }

    return (
        <div className="warehouse-wrapper">
            <div className="field-info">
            {selectedField ? (
                <RenderTMB selectedField={selectedField} top={top} middle={middle} bottom={bottom} handleStageClick={handleStageClick} handleOpenModal={handleOpenModal} />
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
                        fieldId={selectedField?.id}
                        updateVaultPosition={updateVaultPosition}
                        tmb={position}
                    />
                </>
            </Modal>
        </div>
    )
}