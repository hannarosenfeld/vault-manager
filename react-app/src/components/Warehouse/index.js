import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Modal from '@mui/material/Modal';
import { getAllWarehouseVaultsThunk, getWarehouseInfoThunk } from "../../store/warehouse";
import AddVaultModal from "./AddVaultModal/AddVaultModal.js"
import DeleteVaultModal from "./DeleteVaultModal";
import RenderTMB from "../RenderTMB";
import ConfirmStaging from "./ConfirmStaging";
import "./Warehouse.css"


export default function Warehouse () {
    const dispatch = useDispatch();
    const rows = useSelector(state => state.warehouse.warehouseRows);
    const vaults = useSelector(state => state.warehouse.warehouseVaults)
    const rowsArr = Object.values(rows);
    let vaultsArr;

    useEffect(() => {
        if (vaults) vaultsArr = Object.values(vaults);
    },[vaults])

    const [selectedField, setSelectedField] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null)
    const [selectedFieldIndex, setSelectedFieldIndex] = useState(0);
    let [top, setTop] = useState(null);
    let [middle, setMiddle] = useState(null);
    let [bottom, setBottom] = useState(null);
    const [position, setPosition] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isConfirmStagingModalOpen, setIsConfirmStagingModalOpen] = useState(false);
    // const [selectedVaultToDelete, setSelectedVaultToDelete] = useState(null);
    const [updatedVault, setUpdatedVault] = useState(null);
    const [selectedVaultToStage, setSelectedVaultToStage] = useState(null);

    useEffect(() => {
        dispatch(getWarehouseInfoThunk());
        dispatch(getAllWarehouseVaultsThunk());
    }, [dispatch])

    useEffect(() => {
        if (updatedVault) {
          if (updatedVault.position === "T") setTop(updatedVault);
          if (updatedVault.position === "M") setMiddle(updatedVault);
          if (updatedVault.position === "B") setBottom(updatedVault);
        }
      }, [updatedVault]);

      useEffect(() => {
        console.log("🍿 selected vault", selectedVaultToStage)
      }, [selectedVaultToStage])

    const handleFieldClick = async (field, row, index) => {
        console.log("🥝", selectedField)
        await setSelectedField(field);
        await setSelectedRow(row.id);
        await setSelectedFieldIndex(index + 1);

        setTop(null)
        setMiddle(null)
        setBottom(null)
        
        if (field.vaults.length > 0) {
            await setTop(field.vaults.find(vault => vault.position === "T"))
            await setMiddle(field.vaults.find(vault => vault.position === "M"))
            await setBottom(field.vaults.find(vault => vault.position === "B"))
        }
    };

    const handleOpenModal = async (position) => {
        await setPosition(position);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const handleStageClick = async (vault) => {
    await setSelectedVaultToStage(vault);
    };

    // Add a new useEffect to open the modal when selectedVaultToStage changes
    useEffect(() => {
    if (selectedVaultToStage) {
        openConfirmStagingModal();
    }
    }, [selectedVaultToStage]);

    const openConfirmStagingModal = () => {
    console.log(
        "🥞 open modal staging..",
        "vaultCustomer",
        selectedVaultToStage.customer.name,
        "vaultNumber",
        selectedVaultToStage.vault_id,
        "vaultId",
        selectedVaultToStage.id,
        "onClose",
        closeConfirmStagingModal,
        "fieldId",
        selectedField?.id,
        "updateVaultPosition",
        updateVaultPosition,
        "tmb",
        position
    );

    setIsConfirmStagingModalOpen(true);
    };

    // const openDeleteModal = () => {
    //     setIsDeleteModalOpen(true);
    // };

    // const closeDeleteModal = () => {
    //     setIsDeleteModalOpen(false);
    // };

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
                <RenderTMB top={top} middle={middle} bottom={bottom} handleStageClick={handleStageClick} handleOpenModal={handleOpenModal} />
          ) : (
                <div>
                    Select a field to view its info
                </div>
            )}
            </div>
            <div className="warehouse">
            {rowsArr.map((row) => (
                 <div className="row" key={row.id}>
                 <div className="fields">
                 {row.fields.map((field, index) => (
                 <div
                    className="field"
                    key={field.id}
                    style={{ backgroundColor: `${field.vaults.length ? "#ea373d" : "var(--lightgrey)"}`, border: `${selectedField?.id === field?.id ? "3px solid var(--blue)" : "blue"}` }}
                    onClick={() => handleFieldClick(field, row, index)}
                >
                    <div className="field-number">{row.id}{index + 1}</div>
                </div>
                ))}
                 </div>
             </div>
            ))}
            </div>
            <Modal open={isModalOpen}>
                <AddVaultModal 
                    onClose={handleCloseModal} 
                    selectedField={selectedField} 
                    tmb={position}
                    updateTMB={setUpdatedVault}
                />
            </Modal>
            {/* <Modal open={isDeleteModalOpen} onClose={closeDeleteModal}>
                <DeleteVaultModal 
                    open={isDeleteModalOpen} 
                    onClose={closeDeleteModal} 
                    vaultId={selectedVaultToDelete?.vault.id} 
                    vaultCustomer={selectedVaultToDelete?.vault.customer.name}
                    vaultNumber={selectedVaultToDelete?.vault.vault_id}
                />
            </Modal> */}
            <Modal open={isConfirmStagingModalOpen} onClose={setIsConfirmStagingModalOpen}>                
                <ConfirmStaging 
                    vaultCustomer={selectedVaultToStage?.customer.name}
                    vaultNumber={selectedVaultToStage?.vault_id}
                    vaultId={selectedVaultToStage?.id}
                    onClose={closeConfirmStagingModal}
                    fieldId={selectedField?.id}
                    updateVaultPosition={updateVaultPosition}
                    tmb={position}
                />
            </Modal>
        </div>
    )
}