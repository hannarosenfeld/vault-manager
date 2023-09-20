import React, { useDebugValue, useEffect } from "react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Button from '@mui/material/Button';

import { addVaultToWarehouseThunk, getAllWarehouseVaultsThunk, getWarehouseInfoThunk } from "../../../store/warehouse";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./StageToWareHouseModal.css";


export default function StageToWareHouseModal({ closeModal, selectedVault }) {
  const dispatch = useDispatch();
  const vaults = useSelector(state => state.warehouse.warehouseVaults);
  const rows = useSelector(state => state.warehouse.warehouseRows);
  const rowsArr = Object.values(rows);
  const [selectedField, setSelectedField] = useState(null);
  const [selectedFieldIndex, setSelectedFieldIndex] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null)
  const [position, setPosition] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVaultToDelete, setSelectedVaultToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false); // New state for confirmation modal
  const [confirmationVault, setConfirmationVault] = useState(null); // Vault to be confirmed
  let [top, setTop] = useState(null);
  let [middle, setMiddle] = useState(null);
  let [bottom, setBottom] = useState(null);
  let vaultsArr;

  useEffect(() => {
    dispatch(getAllWarehouseVaultsThunk());
    dispatch(getWarehouseInfoThunk());
  }, [])

  useEffect(() => {
    vaultsArr = Object.values(vaults)
    // rowsArr = Object.values(rows);
  }, [vaults, rows])

  const handleFieldClick = async (field, row, index) => {
    await setSelectedField(field);

    setSelectedRow(row.id);
    setSelectedFieldIndex(index + 1);

    setTop(null)
    setMiddle(null)
    setBottom(null)
    
    if (field.vaults.length > 0) {
        setTop(field.vaults.find(vault => vault.position === "T"))
        setMiddle(field.vaults.find(vault => vault.position === "M"))
        setBottom(field.vaults.find(vault => vault.position === "B"))
    }
  };

  const handleOpenModal = (position) => {
    setPosition(position);
    setIsModalOpen(true);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const AddVaultButton = ({ position }) => {
    return (
        <div className="add-vault-button" onClick={() => openConfirmationModal(position)}>
            <i className="fa-solid fa-plus" />
            <span> Move here</span>
        </div>
    );
  };

  const VaultInstance = (vault) => {
    const handleDeleteClick = () => {
        setSelectedVaultToDelete(vault);
        openDeleteModal();
    };

      return (
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              <div style={{ display: "flex", width: "60%", gap: "5px" }}>
                  <div>{vault.vault.customer.name}</div>
                  <div>{vault.vault.vault_id}</div>
              </div>
          </div>
      );
    };

  const RenderTMB = () => {
    const onlyBottom = !top && !middle && !bottom;
    const onlyMiddle = !top && !middle && bottom;
    const onlyTop = !top && middle && bottom;

    return (
        <>
            <div className="selected-field-vaults-tmb">
                <div className="top">
                    <span className="position">T</span>
                    {onlyTop ? <AddVaultButton position="T" /> : top ? <VaultInstance vault={top} /> : ""}
                </div>
                <div className="middle">
                    <span className="position">M</span>
                    {onlyMiddle ? <AddVaultButton position="M" /> : middle ? <VaultInstance vault={middle} /> : ""}
                </div>
                <div className="bottom">
                    <span className="position">B</span>
                    {onlyBottom ? <AddVaultButton position="B" /> : bottom ? <VaultInstance vault={bottom} /> : ""}
                </div>
            </div>
            <div className="selected-field-id">{selectedRow + selectedFieldIndex}</div>
        </>
    );
};

  const openConfirmationModal = (vault) => {
    setConfirmationVault(vault);
    setConfirmationModalOpen(true);
  };

  // Function to close the confirmation modal
  const closeConfirmationModal = () => {
    setConfirmationModalOpen(false);
  };

  const moveVault = async (vault) => {
    if (selectedField) {
      console.log("⭐️", vault.id, selectedField.id)
      await dispatch(addVaultToWarehouseThunk(vault.id, selectedField.id));
    }
  };
  
  const ConfirmationModal = ({ fieldId }) => {
    return (
      <div className="modal-container">
        <div className="modal-content">
          <p style={{marginBottom: "1em"}}>Are you sure you want to move vault to warehouse?</p>
          <div style={{display: "flex", margin: "0 auto", float: "right", gap: "1em"}}>
            <Button variant="contained" onClick={() => moveVault(selectedVault)}>Yes</Button>
            <Button variant="outlined" color="error" onClick={closeConfirmationModal}>No</Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="stage-to-warehouse-modal-wrapper">
      <div className="stage-to-warehouse-modal-content">
        <IconButton
          aria-label="Close"
          style={{ position: "absolute", top: 10, right: 10 }}
          onClick={closeModal}
        >
          <CloseIcon />
        </IconButton>
        {selectedVault && (
          <div >
            <div className="vault-info">
              <h3>Selected Vault Information</h3>
              <p><b>Name:</b> {selectedVault.customer.name}</p>
              <p><b>Vault ID:</b> {selectedVault.vault_id}</p>
            </div>
            <div className="warehouse-wrapper">
              <div className="field-info">
              {selectedField ? (
                <RenderTMB />
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
            </div>            
          </div>
        )}
      </div>
      {confirmationModalOpen && <ConfirmationModal fieldId={selectedField.id} />}
    </div>
  );
}