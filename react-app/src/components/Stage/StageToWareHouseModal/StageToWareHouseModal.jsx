import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { getAllWarehousesThunk } from "../../../store/warehouse";
import { moveVaultFromStageToWarehouseThunk, getVaultsThunk } from "../../../store/vault";
import MiniWareHouse from "./MiniWareHouse";
import RenderTMB from "../../Warehouse/FieldInfo";
import { setSelectedFieldAction } from "../../../store/field";

export default function StageToWareHouseModal({ closeModal, selectedVault }) {
  const dispatch = useDispatch();
  const [selectedWarehouse, setSelectedWarehouse] = useState(1);
  const warehousesObj = useSelector((state) => state.warehouse);
  const warehouses = Object.values(warehousesObj);
  const warehouse = useSelector((state) => state.warehouse[selectedWarehouse]);
  const selectedField = useSelector((state) => state.field.selectedField);

  useEffect(() => {
    dispatch(setSelectedFieldAction(null));
  }, [selectedWarehouse]);

  const moveVault = async (vault, position) => {
    if (selectedField) {
      await dispatch(moveVaultFromStageToWarehouseThunk(vault.id, selectedField.id, position));
      await dispatch(getVaultsThunk());
      closeModal();
    }
  };

  const styles = {
    modalWrapper: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "0.3em",
    },
    modalContent: {
      background: "#fff",
      padding: "1em",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
      width: "100%",
      maxWidth: "800px",
      height: "100%",
      overflow: "scroll",
    },
    vaultInfo: {
      width: "90%",
      display: "flex",
      gap: "1em"
    },
    warehousesButtonContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: "0.5em",
    },
    fieldInfo: {
      height: "9em",
    },
    closeButton: {
      position: "absolute",
      top: "0",
      right: "0",
      zIndex: 1,
    },
  };

  return (
    <div style={styles.modalWrapper}>
      <div style={styles.modalContent}>
        <div style={{ position: "relative" }}>
          <div style={styles.closeButton}>
            <IconButton aria-label="Close" onClick={closeModal}>
              <CloseIcon />
            </IconButton>
          </div>
          {selectedVault && (
            <div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5em"}}>
              <h4 style={{marginTop: "1em"}}>Move Vault into Warehouse</h4>
              <div style={styles.warehousesButtonContainer}>
                  {warehouses.map((warehouse) => (
                    <button
                      style={{margin: "0", }}
                      key={warehouse.id}
                      onClick={() => setSelectedWarehouse(warehouse.id)}
                      type="button"
                      className={`${
                        warehouse.id === selectedWarehouse ? "btn btn-primary" : "btn btn-secondary"
                      }`}
                    >
                      {warehouse.name}
                    </button>
                  ))}
                </div>
                <div style={styles.vaultInfo}>
                  <div><b>Customer:</b> {selectedVault.customer_name}</div>
                  <div><b>Vault ID:</b> {selectedVault.name}</div>
                </div>
              </div>
              <div>
                <div style={styles.fieldInfo}>
                  {selectedField ? (
                    <RenderTMB
                      selectedFieldId={selectedField.id}
                      selectedVault={selectedVault}
                      moveVault={moveVault}
                      warehouse={warehouse}
                      component={"stage"}
                    />
                  ) : (
                    <div style={styles.fieldInfo}>Select a field to view its info</div>
                  )}
                </div>
                <MiniWareHouse warehouseId={selectedWarehouse} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
