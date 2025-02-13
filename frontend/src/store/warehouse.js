const GET_ALL_WAREHOUSES = 'warehouse/GET_ALL_WAREHOUSES';
const SET_CURRENT_WAREHOUSE = 'warehouse/SET_CURRENT_WAREHOUSE';
const ADD_VAULT = 'warehouse/ADD_VAULT';

export const getAllWarehouses = (warehouses) => ({
  type: GET_ALL_WAREHOUSES,
  warehouses,
});

export const setCurrentWarehouse = (warehouse) => ({
  type: SET_CURRENT_WAREHOUSE,
  warehouse,
});

export const addVault = (payload) => ({
  type: ADD_VAULT,
  payload,
});

export const getAllWarehousesThunk = () => async (dispatch) => {
  try {
    const response = await fetch('/api/warehouse/');
    if (response.ok) {
      const data = await response.json();
      dispatch(getAllWarehouses(data));
      return data;
    } else {
      const errorData = await response.json();
      console.error('Error fetching warehouses:', errorData.errors);
      return errorData;
    }
  } catch (error) {
    console.error('Error fetching warehouses:', error);
    return error;
  }
};

export const addVaultThunk = (vaultData) => async (dispatch) => {
  try {
    const res = await fetch('/api/vaults/', {
      method: 'POST',
      body: vaultData
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


const initialState = {
  warehouses: {},
  currentWarehouse: null,
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
    case ADD_VAULT:
      const { fieldId, vault } = action.payload;
      const { id: vaultId } = vault;
      
      // Find the warehouse containing the field
      const warehouseId = Object.keys(state.warehouses).find(id =>
        state.warehouses[id].fields[fieldId]
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
            [vaultId]: vault
          }
        }
      };

      // Update the current warehouse if it matches the warehouseId
      const updatedCurrentWarehouse = state.currentWarehouse && state.currentWarehouse.id === parseInt(warehouseId)
        ? {
            ...state.currentWarehouse,
            fields: updatedFields
          }
        : state.currentWarehouse;
      
      return {
        ...state,
        warehouses: {
          ...state.warehouses,
          [warehouseId]: {
            ...state.warehouses[warehouseId],
            fields: updatedFields
          }
        },
        currentWarehouse: updatedCurrentWarehouse
      };
    default:
      return state;
  }
};

export default warehouseReducer;