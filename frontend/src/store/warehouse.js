const GET_ALL_WAREHOUSES = "warehouse/GET_ALL_WAREHOUSES";
const SET_CURRENT_WAREHOUSE = "warehouse/SET_CURRENT_WAREHOUSE";
const SET_CURRENT_FIELD = "warehouse/SET_CURRENT_FIELD";
const ADD_VAULT = "warehouse/ADD_VAULT";
const UPDATE_WAREHOUSE_AFTER_STAGING = "warehouse/UPDATE_WAREHOUSE_AFTER_STAGING"; // New action type

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
      const { fieldId, vault } = action.payload;
      const { id: vaultId } = vault;

      // Find the warehouse containing the field
      const warehouseId = Object.keys(state.warehouses).find(
        (id) => state.warehouses[id].fields[fieldId]
      );

      if (!warehouseId) {
        // If no warehouse contains the field, return the current state
        return state;
      }

      // Update the fields with the new vault
      const updatedFields = {
        ...state.warehouses[warehouseId].fields,
        [fieldId]: {
          ...state.warehouses[warehouseId].fields[fieldId],
          vaults: {
            ...state.warehouses[warehouseId].fields[fieldId].vaults,
            [vaultId]: vault,
          },
        },
      };

      // Update the current warehouse if it matches the warehouseId
      const updatedCurrentWarehouse =
        state.currentWarehouse &&
        state.currentWarehouse.id === parseInt(warehouseId)
          ? {
              ...state.currentWarehouse,
              fields: updatedFields,
            }
          : state.currentWarehouse;

      // Update the current field if it matches the fieldId
      const updatedCurrentField =
        state.currentField && state.currentField.id === parseInt(fieldId)
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
          [warehouseId]: {
            ...state.warehouses[warehouseId],
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

      console.log("🚀 stagedWarehouseId", stagedWarehouseId);
      console.log("🚀 stagedFieldId", stagedFieldId);

      if (!stagedWarehouseId) {
        // If no warehouse contains the field, return the current state
        return state;
      }

      // Remove the vault from the fields
      delete state.warehouses[stagedWarehouseId].fields[stagedFieldId].vaults[stagedVaultId];

      // Update the current warehouse if it matches the warehouseId
      const updatedStagedCurrentWarehouse =
        state.currentWarehouse &&
        state.currentWarehouse.id === parseInt(stagedWarehouseId)
          ? {
              ...state.currentWarehouse,
              fields: {
                ...state.currentWarehouse.fields,
                [stagedFieldId]: {
                  ...state.currentWarehouse.fields[stagedFieldId],
                  vaults: {
                    ...state.currentWarehouse.fields[stagedFieldId].vaults,
                  },
                },
              },
            }
          : state.currentWarehouse;

      // Update the current field if it matches the fieldId
      const updatedStagedCurrentField =
        state.currentField && state.currentField.id === parseInt(stagedFieldId)
          ? {
              ...state.currentField,
              vaults: {
                ...state.currentField.vaults,
              },
            }
          : state.currentField;

      // Remove the vault from the current field
      console.log("❤️‍🔥",state.currentField && state.currentField.id === parseInt(stagedFieldId))
      if (state.currentField && state.currentField.id === parseInt(stagedFieldId)) {
        console.log("HIIIII", state.currentField.vaults[stagedVaultId]);
        delete state.currentField.vaults[stagedVaultId];
      }

      return {
        ...state,
        warehouses: {
          ...state.warehouses,
        },
        currentWarehouse: updatedStagedCurrentWarehouse,
        currentField: updatedStagedCurrentField,
      };
    default:
      return state;
  }
};

export default warehouseReducer;