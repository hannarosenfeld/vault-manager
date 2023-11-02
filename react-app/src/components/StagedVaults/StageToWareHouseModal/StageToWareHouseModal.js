import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import {
  moveVaultFromStageToWarehouseThunk,
  getAllWarehouseVaultsThunk,
  getWarehouseInfoThunk,
} from "../../../store/warehouse";
import { getAllStagedVaultsThunk } from "../../../store/stage";
import { useDispatch, useSelector } from "react-redux";
import RenderTMB from "../../RenderTMB";
import "./StageToWareHouseModal.css";

export default function StageToWareHouseModal({ closeModal, selectedVault }) {
  const dispatch = useDispatch();
  const vaults = useSelector((state) => state.warehouse.warehouseVaults);
  const rows = useSelector((state) => state.warehouse.warehouseRows);
  const rowsArr = Object.values(rows);
  const [selectedField, setSelectedField] = useState(null);
  const [selectedFieldIndex, setSelectedFieldIndex] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);
  const [position, setPosition] = useState(null);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [top, setTop] = useState(null);
  const [middle, setMiddle] = useState(null);
  const [bottom, setBottom] = useState(null);
  let fieldName = selectedRow && selectedFieldIndex ? selectedRow + selectedFieldIndex : null;
  let vaultsArr;

  useEffect(() => {
    
    dispatch(getAllWarehouseVaultsThunk());
    dispatch(getWarehouseInfoThunk());
  }, []);

  useEffect(() => {
    vaultsArr = Object.values(vaults);
  }, [vaults, rows]);

  const handleFieldClick = async (field, row, index) => {
    await setSelectedField(field);

    setSelectedRow(row.id);
    setSelectedFieldIndex(index + 1);

    setTop(null);
    setMiddle(null);
    setBottom(null);

    if (field.vaults.length > 0) {
      setTop(field.vaults.find((vault) => vault.position === "T"));
      setMiddle(field.vaults.find((vault) => vault.position === "M"));
      setBottom(field.vaults.find((vault) => vault.position === "B"));
    }
  };

  const openConfirmationModal = (position) => {
    setPosition(position);
    setConfirmationModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setConfirmationModalOpen(false);
  };

  const moveVault = async (vault, position) => {
    if (selectedField) {
      await dispatch(moveVaultFromStageToWarehouseThunk(vault.id, selectedField.id, fieldName, position));
      await dispatch(getAllStagedVaultsThunk());
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
              <div className="vault-info">
                <h3>Selected Vault Information</h3>
                <p><b>Customer:</b> {selectedVault.customer.name}</p>
                <p><b>Vault ID:</b> {selectedVault.vault_id}</p>
              </div>
              <div className="warehouse-wrapper">
                <div className="field-info">
                  {selectedField ? (
                    <RenderTMB top={top} middle={middle} bottom={bottom} handleOpenModal={openConfirmationModal} selectedField={selectedField}/>
                  ) : (
                    <div>
                      Select a field to view its info
                    </div>
                  )}
                </div>
                <div className="warehouse">
                  {rowsArr?.map(row => (
                    <div className="row" key={row.id}>
                      <div className="fields">
                      {row.fields.map((field, index) => (
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
                          }}   
                            onClick={() => handleFieldClick(field, row, index)}
                          >
                            <div className="field-number">{row.id}{index + 1}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        {confirmationModalOpen && <ConfirmationModal fieldId={selectedField.id} />}
      </div>
    </div>
  );
}
