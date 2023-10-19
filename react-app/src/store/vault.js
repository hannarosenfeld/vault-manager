const GET_VAULT = "vault/GET_VAULT";
const GET_ALL_VAULTS = "vault/GET_ALL_VAULTS"; // Add this new action type
const ADD_VAULT = "vault/ADD_VAULT"; // Add this new action type
const EDIT_VAULT = "vault/EDIT_VAULT";
const DELETE_VAULT = "vault/DELETE_VAULT";


const editVaultAction = (vault) => ({
  type: EDIT_VAULT,
  vault
});

const deleteVaultAction = (vaultId) => ({
  type: DELETE_VAULT,
  vaultId
});

export const getVaultAction = (vault) => ({
  type: GET_VAULT,
  payload: vault,
});

const getAllVaultsAction = (vaults) => ({
  type: GET_ALL_VAULTS,
  vaults
});

const addVaultAction = (vault) => ({
  type: ADD_VAULT,
  vault
});


export const editVaultThunk = (vaultId, vaultData) => async (dispatch) => {
  try {
    const res = await fetch(`/api/vaults/${vaultId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(vaultData)
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(editVaultAction(data)); // Update the state with the edited vault
      return data;
    } else {
      const err = await res.json();
      console.error("Error editing vault:", err);
      return err;
    }
  } catch (error) {
    console.error("Error editing vault:", error);
    return error;
  }
};

export const deleteVaultThunk = (vaultId) => async (dispatch) => {

  try {
    const res = await fetch(`/api/vaults/${vaultId}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      dispatch(deleteVaultAction(vaultId)); // Update the state by removing the deleted vault
      return vaultId;
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


export const getVaultThunk = (vaultId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/vaults/${vaultId}`); // Adjust the API endpoint
    if (res.ok) {
      const data = await res.json();
      dispatch(getVaultAction(data));
      return data;
    } else {
      const err = await res.json();
      return err;
    }
  } catch (error) {
    console.error("Error fetching vault:", error);
    return error;
  }
};

export const getAllVaultsThunk = () => async (dispatch) => {
  try {
    const res = await fetch('/api/vaults/');
    if (res.ok) {
      const data = await res.json();
      dispatch(getAllVaultsAction(data));
      return data;
    } else {
      const err = await res.json();
      console.error("Error fetching vaults:", err); // Log the error
      return err;
    }
  } catch (error) {
    console.error("Error fetching vaults:", error);
    return error;
  }
};

export const addVaultThunk = (vaultData) => async (dispatch) => {
  try {
    const res = await fetch('/api/vaults/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(vaultData)
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(addVaultAction(data));
      return data;
    } else {
      const err = await res.json();
      console.error("Error adding vault:", err); // Log the error
      return err;
    }
  } catch (error) {
    console.error("Error adding vault:", error); // Log any exceptions
    return error;
  }
};


const initialState = {
  vaults: {},
  currentVault: {}
};

const vaultReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VAULT:
      return {
        ...state,
        vaults: {
          ...state.vaults,
          [action.payload.id]: action.payload
        },
        currentVault: action.payload
      };
    case GET_ALL_VAULTS:
      return {
        ...state,
        vaults: {
          ...state.vaults,
          ...action.vaults
        }
      };
    case ADD_VAULT:
      return {
        ...state,
        vaults: {
          ...state.vaults,
          [action.vault.vaultId]: action.vault
        }
      };
    case EDIT_VAULT:
      return {
        ...state,
        vaults: {
          ...state.vaults,
          [action.vault.vaultId]: action.vault
        },
        currentVault: {}
      };
    case DELETE_VAULT:
      // Create a copy of the state.vaults object without the deleted vault
      const updatedVaults = { ...state.vaults };
      delete updatedVaults[action.vaultId];

      return {
        ...state,
        vaults: updatedVaults
      };
      
    default:
      return state;
  }
};

export default vaultReducer;