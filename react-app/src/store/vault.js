const GET_VAULT = "vault/GET_VAULT";
const GET_ALL_VAULTS = "vault/GET_ALL_VAULTS"; // Add this new action type

// Action creator for getting a single vault
const getVaultAction = (vault) => ({
  type: GET_VAULT,
  vault
});

// Action creator for getting all vaults
const getAllVaultsAction = (vaults) => ({
  type: GET_ALL_VAULTS,
  vaults
});

// Thunk action creator for getting a single vault
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

// Thunk action creator for getting all vaults
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
    default:
      return state;
  }
};


export default vaultReducer;
