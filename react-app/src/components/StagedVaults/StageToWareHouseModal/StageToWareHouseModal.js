import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import {
  moveVaultFromStageToWarehouseThunk,
  getAllWarehouseVaultsThunk,
  getWarehouseInfoThunk,
  getAllWarehousesThunk,
} from "../../../store/warehouse";
import { getAllStagedVaultsThunk } from "../../../store/stage";
import { useDispatch, useSelector } from "react-redux";
import RenderTMB from "../../RenderTMB";
// import { rowCreator } from "../../utility";

import "./StageToWareHouseModal.css";


export default function StageToWareHouseModal({ closeModal, selectedVault }) {
  const dispatch = useDispatch();
  const vaults = useSelector(state => state.vault.vaults);
  const rowsArr = useSelector(state => state.warehouse.currentWarehouse.rows);
  const warehouses = useSelector(state => state.warehouse.warehouses);
  const [selectedField, setSelectedField] = useState(null);
  const [selectedFieldIndex, setSelectedFieldIndex] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);
  const [position, setPosition] = useState(null);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [loadingVaults, setLoadingVaults] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState(1);


  let fieldName = selectedRow && selectedFieldIndex ? selectedRow + selectedFieldIndex : null;
  let vaultsArr;

  useEffect(() => {
    dispatch(getAllWarehousesThunk());
  }, []);

  useEffect(() => {
    vaultsArr = Object.values(vaults);
  }, [vaults]);

  useEffect(() => {
    dispatch(getAllWarehouseVaultsThunk());
  }, [selectedField]);

  useEffect(() => {
    vaultsArr = Object.values(vaults);
  }, [vaults]);

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
      await dispatch(moveVaultFromStageToWarehouseThunk(vault.id, selectedField.id, fieldName, position));
      await dispatch(getAllStagedVaultsThunk());
      await dispatch(getWarehouseInfoThunk(1));
  
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

  const toggleWarehouse = async(warehouseId) => {
    await dispatch(getWarehouseInfoThunk(warehouseId));
  
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
                <p><b>Customer:</b> {selectedVault.customer.name}</p>
                <p><b>Vault ID:</b> {selectedVault.vault_id}</p>
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
                    <RenderTMB handleOpenModal={openConfirmationModal} selectedField={selectedField}/>
                  ) : (
                    <div>
                      Select a field to view its info
                    </div>
                  )}
                </div>
                <div className="warehouse" style={{height: "60%"}}>
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
                              border: selectedField?.id === field?.id ? "3px solid var(--blue)" : "",
                              marginBottom: `${field.type === "couchbox" ? "-1.7em" : ''}`,
                              width: `${field.bottom_couch_box ? "0px" : ''}`,                              
                          }}   
                            onClick={() => handleFieldClick(field, row, index)}
                          >
                    {field.bottom_couch_box ? "" : field.type === "vault" ? <div className="field-number">{row.name}{index + 1}</div> : field.type === "couchbox" ? <div className="field-number">{row.name}{index + 1} / {row.name}{index + 2}</div> : ''}
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