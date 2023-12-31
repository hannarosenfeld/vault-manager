const ADD_VAULT_TO_WAREHOUSE = 'warehouse/ADD_VAULT_TO_WAREHOUSE';
const REMOVE_VAULT_FROM_WAREHOUSE = 'warehouse/REMOVE_VAULT_FROM_WAREHOUSE';
const GET_ALL_WAREHOUSE_VAULTS = 'warehouse/GET_ALL_WAREHOUSE_VAULTS'; // New action type
export const GET_WAREHOUSE_INFO = 'warehouse/GET_ALL_WAREHOUSE_INFO';
export const SET_WAREHOUSE_SEARCH_MODE = 'warehouse/SET_WAREHOUSE_SEARCH_MODE';

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

export const getWarehouseInfoThunk = () => async (dispatch) => {
  try {
    // Simulate an API call to fetch all warehouse information (replace with your actual API call)
    const response = await fetch('/api/warehouse');

    if (response.ok) {
      // Assuming the response includes the complete warehouse information
      const warehouseInfo = await response.json();
      // Dispatch the action with the fetched warehouse information
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
  warehouseVaults: [],
  warehouseFields: [],
  // warehouseRows: [],
  searchmode: null
};
  

const warehouseReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WAREHOUSE_INFO:
      return {
        ...state,
        // warehouseVaults: action.payload.warehouse_info.vaults,
        warehouseFields: action.payload.warehouse_info.fields,
        // warehouseRows: action.payload.warehouse_info.rows,
        searchmode: action.payload.warehouse_info.searchmode
      };
    case ADD_VAULT_TO_WAREHOUSE:
      // Add the vault to the warehouseVaults array in state
      const newVaults = Array.isArray(action.payload) ? action.payload : [];

      return {
        ...state,
        warehouseVaults: [...state.warehouseVaults, ...newVaults],
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