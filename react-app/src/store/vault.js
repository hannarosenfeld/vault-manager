const GET_VAULT = "vault/GET_VAULT";
const GET_ALL_VAULTS = "vault/GET_ALL_VAULTS"; // Add this new action type
const ADD_VAULT = "vault/ADD_VAULT"; // Add this new action type


const getVaultAction = (vault) => ({
  type: GET_VAULT,
  vault
});


const getAllVaultsAction = (vaults) => ({
  type: GET_ALL_VAULTS,
  vaults
});

const addVaultAction = (vault) => ({
  type: ADD_VAULT,
  vault
});


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
      dispatch(addVaultAction(data)); // Update the state with the new vault
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
          [action.vault.vaultId]: action.vault
        },
        currentVault: action.vault
      };
    case GET_ALL_VAULTS:
      return {
        ...state,
        ...action.vaults // Update the vaults directly
      };
    case ADD_VAULT:
      return {
        ...state,
        vaults: {
          ...state.vaults,
          [action.vault.vaultId]: action.vault
        }
      };      
    default:
      return state;
  }
};


export default vaultReducer;
