import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { getAllWarehousesThunk  } from "../../../store/warehouse";
import MiniWareHouse from "./MiniWareHouse";
import RenderTMB from "../../Warehouse/RenderTMB";
import "./StageToWareHouseModal.css";


export default function StageToWareHouseModal({ closeModal, selectedVault }) {
  const dispatch = useDispatch();
  const [selectedWarehouse, setSelectedWarehouse] = useState(1);
  // const vaults = useSelector(state => state.vault.vaults);
  const warehousesObj = useSelector(state => state.warehouse);
  const warehouses = Object.values(warehousesObj)
  const [selectedField, setSelectedField] = useState(null);
  const [selectedFieldIndex, setSelectedFieldIndex] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);
  const [position, setPosition] = useState(null);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [loadingVaults, setLoadingVaults] = useState(false);


  let fieldName = selectedRow && selectedFieldIndex ? selectedRow + selectedFieldIndex : null;
  let vaultsArr;

  useEffect(() => {
    console.log("👏🏻 selectedField in stage", selectedField)
  }, [selectedField])

  useEffect(() => {
    dispatch(getAllWarehousesThunk());
  }, []);

  // useEffect(() => {
  //   vaultsArr = Object.values(vaults);
  // }, [vaults]);

  // useEffect(() => {
  //   vaultsArr = Object.values(vaults);
  // }, [vaults]);

  const handleFieldClick = async (field, row, index) => {
    setLoadingVaults(true);
    await setSelectedField(field);
    await setSelectedRow(row.id);
    await setSelectedFieldIndex(index + 1);
    setLoadingVaults(false);
  };
  
  const openConfirmationModal = (position) => {
    setPosition(position);
    setConfirmationModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setConfirmationModalOpen(false);
  };

  const moveVault = async (vault, position) => {
    if (loadingVaults) {
      // Don't proceed if vaults are still loading
      return;
    }
  
    if (selectedField) {
      // await dispatch(moveVaultFromStageToWarehouseThunk(vault.id, selectedField.id, fieldName, position));
  
      closeConfirmationModal();
      closeModal();
    }
  };
  
  const ConfirmationModal = () => {
    return (
       <div className="modal-container">
        <div className="modal-content">
          <p style={{ marginBottom: "1em" }}>Are you sure you want to move the vault to the warehouse?</p>
          <div style={{ display: "flex", margin: "0 auto", float: "right", gap: "1em" }}>
            <Button variant="contained" onClick={() => moveVault(selectedVault, position)}>Yes</Button>
            <Button variant="outlined" color="error" onClick={closeConfirmationModal}>No</Button>
          </div>
        </div>
      </div>
    );
  };
  
//   const sortFields = (fields) => {
//     const sortedFields = {};
//     let sortedFieldsArr;

//     for (let field of fields) {
//         sortedFields[field.id] = field
//     }

//     sortedFieldsArr = Object.values(sortedFields)

//     return sortedFieldsArr
// }

  const toggleWarehouse = async(warehouseId) => {  
    setSelectedWarehouse(warehouseId);
  }

  return (
    <div className="stage-to-warehouse-modal-wrapper">
      <div className="stage-to-warehouse-modal-content">
        <div className="modal-content-wrapper">
          <div className="modal-close-button">
            <IconButton
              aria-label="Close"
              onClick={closeModal}
            >
              <CloseIcon />
            </IconButton>
          </div>
          {selectedVault && (
            <div>
              <div style={{display: "flex"}}>
              <div className="vault-info">
                <h3>Selected Vault Information</h3>
                <p><b>Customer:</b> {selectedVault.customer_name}</p>
                <p><b>Vault ID:</b> {selectedVault.name}</p>
              </div>
              <div className="warehouses-button-container">
                {warehouses.map(warehouse => (
                    <button onClick={() => toggleWarehouse(warehouse.id)} type="button" className={`${warehouse.id === selectedWarehouse ? 'btn btn-primary' : 'btn btn-secondary'}`}>{warehouse.name}</button>
                ))}
              </div>
              </div>
              <div className="warehouse-wrapper">
                <div className="field-info">
                  {selectedField ? (
                    <RenderTMB 
                      handleOpenModal={openConfirmationModal} 
                      selectedFieldId={selectedField.id}
                    />
                  ) : (
                    <div>
                      Select a field to view its info
                    </div>
                  )}
                </div>
                  <MiniWareHouse warehouseId={selectedWarehouse} setSelectedField={setSelectedField} selectedField={selectedField}/>                
              </div>
            </div>
          )}
        </div>
        {confirmationModalOpen && <ConfirmationModal fieldId={selectedField.id} />}
      </div>
    </div>
  );
}