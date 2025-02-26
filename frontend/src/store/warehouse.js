const GET_ALL_WAREHOUSES = "warehouse/GET_ALL_WAREHOUSES";
const SET_CURRENT_WAREHOUSE = "warehouse/SET_CURRENT_WAREHOUSE";
const SET_CURRENT_FIELD = "warehouse/SET_CURRENT_FIELD";
const ADD_VAULT = "warehouse/ADD_VAULT";
const UPDATE_WAREHOUSE_AFTER_STAGING = "warehouse/UPDATE_WAREHOUSE_AFTER_STAGING";
const MOVE_VAULT_TO_WAREHOUSE = "warehouse/MOVE_VAULT_TO_WAREHOUSE"; // New action type
import { removeVaultFromStage } from './stage'; // Import the action creator


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

export const moveVaultToWarehouseThunk = (vaultId, fieldId, position) => async (dispatch) => {
  const input = JSON.stringify({ vaultId, fieldId, position });
  console.log("💖", input);
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
  console.log("❤️‍🔥 in thunk")
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
  console.log("🚀", vaultData);
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
      console.log("❤️‍🔥")
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
        const { vaultId: moveVaultId, fieldId: moveFieldId, position: movePosition, vault: moveVault } = action.payload;
  
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
      default:
        return state;
    }
  };

export default warehouseReducer;