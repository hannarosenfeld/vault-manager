const GET_ALL_WAREHOUSES = "warehouse/GET_ALL_WAREHOUSES";
const SET_CURRENT_WAREHOUSE = "warehouse/SET_CURRENT_WAREHOUSE";
const SET_CURRENT_FIELD = "warehouse/SET_CURRENT_FIELD";
const ADD_VAULT = "warehouse/ADD_VAULT";
const UPDATE_WAREHOUSE_AFTER_STAGING = "warehouse/UPDATE_WAREHOUSE_AFTER_STAGING";
const MOVE_VAULT_TO_WAREHOUSE = "warehouse/MOVE_VAULT_TO_WAREHOUSE";
const ADD_ATTACHMENT = "warehouse/ADD_ATTACHMENT";
const DELETE_VAULT = "warehouse/DELETE_VAULT";

import { removeVaultFromStage } from "./stage";

export const getAllWarehouses = (warehouses) => ({
  type: GET_ALL_WAREHOUSES,
  warehouses,
});

export const setCurrentWarehouse = (warehouse) => ({
  type: SET_CURRENT_WAREHOUSE,
  warehouse,
});

export const setCurrentField = (field) => ({
  type: SET_CURRENT_FIELD,
  field,
});

export const addVault = (payload) => ({
  type: ADD_VAULT,
  payload,
});

export const updateWarehouseAfterStaging = (payload) => ({
  type: UPDATE_WAREHOUSE_AFTER_STAGING,
  payload,
});

export const moveVaultToWarehouse = (payload) => ({
  type: MOVE_VAULT_TO_WAREHOUSE,
  payload,
});

export const addAttachment = (attachment) => ({
  type: ADD_ATTACHMENT,
  attachment,
});

export const deleteVault = (vaultId, customerToDelete) => ({
  type: DELETE_VAULT,
  payload: { vaultId, customerToDelete },
});



export const deleteVaultThunk = (vaultId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/vaults/${vaultId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(deleteVault(vaultId));
      return data;
    } else {
      const err = await res.json();
      console.error("Error deleting vault:", err);
      return err;
    }
  } catch (error) {
    console.error("Error deleting vault:", error);
    return error;
  }
};

export const uploadAttachmentThunk = (file, vaultId) => async (dispatch) => {
  const formData = new FormData();
  formData.append("attachment", file);
  formData.append("vault_id", vaultId);

  try {
    const res = await fetch("/api/vaults/upload", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(addAttachment(data.attachment));
      return data;
    } else {
      const err = await res.json();
      console.error("Error uploading attachment:", err);
      return err;
    }
  } catch (error) {
    console.error("Error uploading attachment:", error);
    return error;
  }
};

export const moveVaultToWarehouseThunk =
  (vaultId, fieldId, position) => async (dispatch) => {
    const input = JSON.stringify({ vaultId, fieldId, position });
    try {
      const res = await fetch(`/api/vaults/move`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: input,
      });
      if (res.ok) {
        const data = await res.json();
        dispatch(moveVaultToWarehouse(data));
        dispatch(removeVaultFromStage(vaultId));
        return data;
      } else {
        const err = await res.json();
        console.error("Error moving vault:", err);
        return err;
      }
    } catch (error) {
      console.error("Error moving vault:", error);
      return error;
    }
  };

export const getAllWarehousesThunk = () => async (dispatch) => {
  try {
    const response = await fetch("/api/warehouse/");
    if (response.ok) {
      const data = await response.json();
      dispatch(getAllWarehouses(data));
      return data;
    } else {
      const errorData = await response.json();
      console.error("Error fetching warehouses:", errorData.errors);
      return errorData;
    }
  } catch (error) {
    console.error("Error fetching warehouses:", error);
    return error;
  }
};

export const addVaultThunk = (vaultData) => async (dispatch) => {
  try {
    const res = await fetch("/api/vaults/", {
      method: "POST",
      body: vaultData,
    });
    if (res.ok) {
      const data = await res.json();
      dispatch(addVault(data));
      return data;
    } else {
      const err = await res.json();
      console.error("Error adding vault:", err);
      return err;
    }
  } catch (error) {
    console.error("Error adding vault:", error);
    return error;
  }
};

export const getCurrentFieldThunk = (field) => async (dispatch) => {
  const fieldId = field.id;
  const warehouseId = field.warehouse_id;

  try {
    const res = await fetch(`/api/warehouse/${warehouseId}/${fieldId}`);
    if (res.ok) {
      const data = await res.json();
      dispatch(setCurrentField(data));
      return data;
    } else {
      const err = await res.json();
      console.error("Error fetching field:", err);
      return err;
    }
  } catch (error) {
    console.error("Error fetching field:", error);
    return error;
  }
};


const initialState = {
  warehouses: {},
  currentWarehouse: null,
  currentField: null,
};

const warehouseReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_WAREHOUSES:
      const newWarehouses = action.warehouses.reduce((acc, warehouse) => {
        acc[warehouse.id] = warehouse;
        return acc;
      }, {});
      return {
        ...state,
        warehouses: newWarehouses,
      };
    case SET_CURRENT_WAREHOUSE:
      return {
        ...state,
        currentWarehouse: action.warehouse,
      };
    case SET_CURRENT_FIELD:
      return {
        ...state,
        currentField: action.field,
      };
    case ADD_VAULT:
      const { fieldId: addFieldId, vault } = action.payload;
      const { id: vaultId } = vault;

      // Find the warehouse containing the field
      const addWarehouseId = Object.keys(state.warehouses).find(
        (id) => state.warehouses[id].fields[addFieldId]
      );

      if (!addWarehouseId) {
        // If no warehouse contains the field, return the current state
        return state;
      }

      // Update the fields with the new vault
      const updatedFields = {
        ...state.warehouses[addWarehouseId].fields,
        [addFieldId]: {
          ...state.warehouses[addWarehouseId].fields[addFieldId],
          vaults: {
            ...state.warehouses[addWarehouseId].fields[addFieldId].vaults,
            [vaultId]: vault,
          },
        },
      };

      // Update the current warehouse if it matches the warehouseId
      const updatedCurrentWarehouse =
        state.currentWarehouse &&
        state.currentWarehouse.id === parseInt(addWarehouseId)
          ? {
              ...state.currentWarehouse,
              fields: updatedFields,
            }
          : state.currentWarehouse;

      // Update the current field if it matches the fieldId
      const updatedCurrentField =
        state.currentField && state.currentField.id === parseInt(addFieldId)
          ? {
              ...state.currentField,
              vaults: {
                ...state.currentField.vaults,
                [vaultId]: vault,
              },
            }
          : state.currentField;

      return {
        ...state,
        warehouses: {
          ...state.warehouses,
          [addWarehouseId]: {
            ...state.warehouses[addWarehouseId],
            fields: updatedFields,
          },
        },
        currentWarehouse: updatedCurrentWarehouse,
        currentField: updatedCurrentField,
      };

    case ADD_ATTACHMENT:
      const { vault_id, ...attachment } = action.attachment;
      const updatedVault = {
        ...state.currentField.vaults[vault_id],
        attachments: [
          ...state.currentField.vaults[vault_id].attachments,
          attachment,
        ],
      };

      return {
        ...state,
        currentField: {
          ...state.currentField,
          vaults: {
            ...state.currentField.vaults,
            [vault_id]: updatedVault,
          },
        },
      };

    case UPDATE_WAREHOUSE_AFTER_STAGING:
      const stagedVaultId = action.payload.id;
      const stagedFieldId = action.payload.old_field_id;

      // Find the warehouse containing the field
      const stagedWarehouseId = Object.keys(state.warehouses).find(
        (id) => state.warehouses[id].fields[stagedFieldId]
      );
      if (!stagedWarehouseId) {
        // If no warehouse contains the field, return the current state
        return state;
      }

      const vaultsArr = Object.values(
        state.warehouses[stagedWarehouseId].fields[stagedFieldId].vaults
      );

      const updatedVaults = vaultsArr.filter(
        (vault) => vault.id !== stagedVaultId
      );

      const updatedVaultsObj = updatedVaults.reduce((acc, vault) => {
        acc[vault.id] = vault;
        return acc;
      }, {});

      // Remove the vault from the fields
      const updatedFieldsAfterStaging = {
        ...state.warehouses[stagedWarehouseId].fields,
        [stagedFieldId]: {
          ...state.warehouses[stagedWarehouseId].fields[stagedFieldId],
          vaults: updatedVaultsObj,
        },
      };

      // Update the current warehouse if it matches the warehouseId
      const updatedCurrentWarehouseAfterStaging =
        state.currentWarehouse &&
        state.currentWarehouse.id === parseInt(stagedWarehouseId)
          ? {
              ...state.currentWarehouse,
              fields: {
                ...state.currentWarehouse.fields,
                [stagedFieldId]: {
                  ...state.currentWarehouse.fields[stagedFieldId],
                  vaults: updatedVaultsObj,
                },
              },
            }
          : state.currentWarehouse;

      // Remove the vault from the current field
      const updatedCurrenField =
        state.currentField && state.currentField.id === parseInt(stagedFieldId)
          ? {
              ...state.currentField,
              vaults: updatedVaultsObj,
            }
          : state.currentField;

      return {
        ...state,
        warehouses: {
          ...state.warehouses,
          [stagedWarehouseId]: {
            ...state.warehouses[stagedWarehouseId],
            fields: updatedFieldsAfterStaging,
          },
        },
        currentWarehouse: updatedCurrentWarehouseAfterStaging,
        currentField: updatedCurrenField,
      };

    case MOVE_VAULT_TO_WAREHOUSE:
      const {
        vaultId: moveVaultId,
        fieldId: moveFieldId,
        position: movePosition,
        vault: moveVault,
      } = action.payload;

      // Find the warehouse containing the field
      const targetWarehouseId = Object.keys(state.warehouses).find(
        (id) => state.warehouses[id].fields[moveFieldId]
      );

      if (!targetWarehouseId) {
        // If no warehouse contains the field, return the current state
        return state;
      }

      // Update the fields with the moved vault
      const updatedTargetFields = {
        ...state.warehouses[targetWarehouseId].fields,
        [moveFieldId]: {
          ...state.warehouses[targetWarehouseId].fields[moveFieldId],
          vaults: {
            ...state.warehouses[targetWarehouseId].fields[moveFieldId].vaults,
            [moveVaultId]: moveVault,
          },
        },
      };

      // Update the current warehouse if it matches the target warehouseId
      const updatedTargetCurrentWarehouse =
        state.currentWarehouse &&
        state.currentWarehouse.id === parseInt(targetWarehouseId)
          ? {
              ...state.currentWarehouse,
              fields: updatedTargetFields,
            }
          : state.currentWarehouse;

      return {
        ...state,
        warehouses: {
          ...state.warehouses,
          [targetWarehouseId]: {
            ...state.warehouses[targetWarehouseId],
            fields: updatedTargetFields,
          },
        },
        currentWarehouse: null,
        currentField: null,
      };
      case DELETE_VAULT:
        const deletedVaultId = action.payload.vaultId;

        // Remove the vault from the current field
        const updatedCurrentFieldAfterVaultDeletion = {
          ...state.currentField,
          vaults: Object.keys(state.currentField.vaults)
            .filter((id) => id !== deletedVaultId)
            .reduce((acc, id) => {
              acc[id] = state.currentField.vaults[id];
              return acc;
            }, {}),
        };
  
        // Remove the vault from the current warehouse
        const updatedCurrentWarehouseAfterVaultDeletion = {
          ...state.currentWarehouse,
          fields: {
            ...state.currentWarehouse.fields,
            [state.currentField.id]: updatedCurrentFieldAfterVaultDeletion,
          },
        };
  
        // Remove the vault from the warehouses
        const updatedWarehouses = {
          ...state.warehouses,
          [state.currentWarehouse.id]: {
            ...state.warehouses[state.currentWarehouse.id],
            fields: {
              ...state.warehouses[state.currentWarehouse.id].fields,
              [state.currentField.id]: updatedCurrentFieldAfterVaultDeletion,
            },
          },
        };
  
        return {
          ...state,
          currentField: updatedCurrentFieldAfterVaultDeletion,
          currentWarehouse: updatedCurrentWarehouseAfterVaultDeletion,
          warehouses: updatedWarehouses,
        };
    default:
      return state;
  }
};

export default warehouseReducer;
