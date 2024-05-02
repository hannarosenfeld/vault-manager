import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { getAllWarehousesThunk  } from "../../../store/warehouse";
import { moveVaultFromStageToWarehouseThunk, getVaultsThunk } from "../../../store/vault";
import MiniWareHouse from "./MiniWareHouse";
import RenderTMB from "../../Warehouse/RenderTMB";
import "./StageToWareHouseModal.css";
import { setSelectedFieldAction } from "../../../store/field";


export default function StageToWareHouseModal({ closeModal, selectedVault }) {
  const dispatch = useDispatch();
  const [selectedWarehouse, setSelectedWarehouse] = useState(1);
  const warehousesObj = useSelector((state) => state.warehouse);
  const warehouses = Object.values(warehousesObj);
  const warehouse = useSelector((state) => state.warehouse[selectedWarehouse]);
  const selectedField = useSelector((state )=> state.field.selectedField);
  // const [loadingVaults, setLoadingVaults] = useState(false);


  useEffect(() => {
    // dispatch(getAllWarehousesThunk());
    dispatch(setSelectedFieldAction(null));
    // setLoadingVaults(true);
  }, [selectedWarehouse]);


  const moveVault = async (vault, position) => {
    // if (loadingVaults) {
    //   return;
    // }
    if (selectedField) {
      await dispatch(moveVaultFromStageToWarehouseThunk(vault.id, selectedField.id, position))
      await dispatch(getVaultsThunk())
     closeModal();
    }
  };
  
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
                <h4>Selected Vault Information</h4>
                <p><b>Customer:</b> {selectedVault.customer_name}</p>
                <p><b>Vault ID:</b> {selectedVault.name}</p>
              </div>
              <div className="warehouses-button-container">
                {warehouses.map(warehouse => (
                    <button onClick={() => setSelectedWarehouse(warehouse.id)} type="button" className={`${warehouse.id === selectedWarehouse ? 'btn btn-primary' : 'btn btn-secondary'}`}>{warehouse.name}</button>
                ))}
              </div>
              </div>
              <div>
                <div className="field-info">
                  {selectedField ? (
                    <RenderTMB 
                      selectedFieldId={selectedField.id}
                      selectedVault={selectedVault}
                      moveVault={moveVault}
                      warehouse={warehouse}
                      component={'stage'}
                    />
                  ) : (
                    <div style={{height: "9em"}}>
                      Select a field to view its info
                    </div>
                  )}
                </div>
                  <MiniWareHouse warehouseId={selectedWarehouse}/>                
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}