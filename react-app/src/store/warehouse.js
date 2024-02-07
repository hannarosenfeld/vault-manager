const ADD_WAREHOUSE = 'warehouse/ADD_WAREHOUSE';
const ADD_VAULT_TO_WAREHOUSE = 'warehouse/ADD_VAULT_TO_WAREHOUSE';
const REMOVE_VAULT_FROM_WAREHOUSE = 'warehouse/REMOVE_VAULT_FROM_WAREHOUSE';
const GET_ALL_WAREHOUSE_VAULTS = 'warehouse/GET_ALL_WAREHOUSE_VAULTS'; // New action type
export const GET_WAREHOUSE_INFO = 'warehouse/GET_WAREHOUSE_INFO';
export const SET_WAREHOUSE_SEARCH_MODE = 'warehouse/SET_WAREHOUSE_SEARCH_MODE';
const GET_ALL_WAREHOUSES = 'warehouse/GET_ALL_WAREHOUSES'

export const getAllWarehouses = (warehouses) => ({
  type: GET_ALL_WAREHOUSES,
  warehouses
})

export const setWarehouseSearchModeAction = (searchmode) => ({
  type: SET_WAREHOUSE_SEARCH_MODE,
  searchmode,
});

export const getWarehouseInfoAction = (warehouseInfo) => ({
  type: GET_WAREHOUSE_INFO,
  payload: warehouseInfo,
});

export const removeVaultFromWarehouse = (vaultId) => ({
    type: REMOVE_VAULT_FROM_WAREHOUSE,
    payload: vaultId,
  });

export const getAllWarehouseVaultsAction = (vaults) => ({
    type: GET_ALL_WAREHOUSE_VAULTS,
    vaults,
});

export const addVaultToWarehouseAction = (vault) => ({
  type: ADD_VAULT_TO_WAREHOUSE,
  payload: vault,
});

export const addWarehouseAction = (warehouseData) => ({
  type: ADD_WAREHOUSE,
  payload: warehouseData,
});
  

export const addWarehouseThunk = (warehouseData) => async (dispatch) => {
  try {
    const response = await fetch('/api/warehouse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(warehouseData),
    });

    if (response.ok) {
      const newWarehouse = await response.json();
      dispatch(addWarehouseAction(newWarehouse));
      return newWarehouse;
    } else {
      const errorData = await response.json();
      console.error('Error adding warehouse:', errorData.errors);
      return errorData;
    }
  } catch (error) {
    console.error('Error adding warehouse:', error);
    return error;
  }
};


export const getAllWarehousesThunk = () => async (dispatch) => {
  try {
    const response = await fetch('/api/warehouse');
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

export const addVaultToWarehouseThunk = (vaultId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/warehouse/vaults/${vaultId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const updatedVault = await response.json();
      const addDispatch = dispatch(addVaultToWarehouseAction(updatedVault));
      return updatedVault;
    } else {
      const errorData = await response.json();
      console.error('Error adding vault to warehouse:', errorData.errors);
      return errorData;
    }
  } catch (error) {
    console.error('Error adding vault to warehouse:', error);
    return error;
  }
}; 



export const getWarehouseInfoThunk = (warehouseId) => async (dispatch) => {
  if (!warehouseId) return
  try {
    const response = await fetch(`/api/warehouse/${warehouseId}`);
    if (response.ok) {
      const warehouseInfo = await response.json();
      dispatch(getWarehouseInfoAction(warehouseInfo));
      return warehouseInfo;
    } else {
      const errorData = await response.json();
      console.error('Error fetching warehouse information:', errorData.errors);
      return errorData;
    }
  } catch (error) {
    console.error('Error fetching warehouse information:', error);
    return error;
  }
};

export const getAllWarehouseVaultsThunk = () => async (dispatch) => {
    try {
      // Simulate an API call to fetch all warehouse vaults (replace with your actual API call)
      const response = await fetch('/api/warehouse/vaults');
  
      if (response.ok) {
        // Assuming the response includes the warehouse vaults data
        const vaults = await response.json();
        // Dispatch the action with the fetched vaults
        dispatch(getAllWarehouseVaultsAction(vaults));
  
        return vaults;
      } else {
        const errorData = await response.json();
        console.error('Error fetching warehouse vaults:', errorData.errors);
        return errorData;
      }
    } catch (error) {
      console.error('Error fetching warehouse vaults:', error);
      return error;
    }
  };

  export const moveVaultFromStageToWarehouseThunk = (vaultId, fieldId, fieldName, position) => async (dispatch) => {

    try {
      const response = await fetch(`/api/warehouse/vaults/${vaultId}`, {
        method: 'PUT',
        body: JSON.stringify({ fieldId, fieldName, position }), 
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const updatedVault = await response.json();
        dispatch(addVaultToWarehouseAction(updatedVault));
        return updatedVault;
      } else {
        const errorData = await response.json();
        console.error('Error adding vault to warehouse:', errorData.errors);
        return errorData;
      }
    } catch (error) {
      console.error('Error adding vault to warehouse:', error);
      return error;
    }
  }; 

export const removeVaultFromWarehouseThunk = (vaultId) => async (dispatch) => {
  try {
    // Simulate an API call to remove the vault from the warehouse (replace with your actual API call)
    const response = await fetch(`/api/warehouse/vaults/${vaultId}`, {
      method: 'DELETE', // Assuming you use DELETE to remove a vault from the warehouse
    });

    if (response.ok) {
      // Dispatch the action to remove the vault from the warehouse
      dispatch(removeVaultFromWarehouse(vaultId));
      return vaultId;
    } else {
      const errorData = await response.json();
      console.error('Error removing vault from warehouse:', errorData.errors);
      return errorData;
    }
  } catch (error) {
    console.error('Error removing vault from warehouse:', error);
    return error;
  }
};



  
const initialState = {
  warehouses: [],
  warehouseVaults: [],
  warehouseFields: [],
  // warehouseRows: [],
  searchmode: null
};
  

const warehouseReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_WAREHOUSES:
      const warehouses = Object.values(action.warehouses)
      return {
        ...state,
        warehouses: [...warehouses]
      }
    case GET_WAREHOUSE_INFO:
      const warehouseInfo = action.payload?.warehouse_info;
      if (warehouseInfo) {
        return {
          ...state,
          warehouseFields: warehouseInfo.fields,
          searchmode: warehouseInfo.searchmode
        };
      } else {
        console.error('Warehouse info is undefined');
        return state;
      }
    case ADD_VAULT_TO_WAREHOUSE:
      // Add the vault to the warehouseVaults array in state
      const newVaults = Array.isArray(action.payload) ? action.payload : [];

      return {
        ...state,
        warehouseVaults: [...state.warehouseVaults, ...newVaults],
      };
    case ADD_WAREHOUSE:
      return {
        ...state,
        warehouses: [...state.warehouses, action.payload]
      };
    case GET_ALL_WAREHOUSE_VAULTS:
    return {
        ...state,
        warehouseVaults: action.vaults,
    };
    case REMOVE_VAULT_FROM_WAREHOUSE:
        // Remove the vaultId from the warehouseVaults array in state
        return {
          ...state,
          warehouseVaults: state.warehouseVaults.filter(
            (vault) => vault.id !== action.payload            
          ),
        };
    case SET_WAREHOUSE_SEARCH_MODE:
      return {
        ...state,
        searchmode: action.searchmode,
      };  
    default:
      return state;
  }
};

export default warehouseReducer;
