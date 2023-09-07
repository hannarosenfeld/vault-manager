const GET_VAULT = "vault/GET_VAULT";
const GET_ALL_VAULTS = "vault/GET_ALL_VAULTS"; // Add this new action type
const ADD_VAULT = "vault/ADD_VAULT"; // Add this new action type
const EDIT_VAULT = "vault/EDIT_VAULT";
const DELETE_VAULT = "vault/DELETE_VAULT";
const STAGE_VAULT = "vault/STAGE_VAULT";
const GET_ALL_STAGED_VAULTS = "vault/GET_ALL_STAGED_VAULTS";


const getAllStagedVaultsAction = (vaults) => ({
  type: GET_ALL_STAGED_VAULTS,
  vaults
});

const editVaultAction = (vault) => ({
  type: EDIT_VAULT,
  vault
});

const deleteVaultAction = (vaultId) => ({
  type: DELETE_VAULT,
  vaultId
});

const stageVaultAction = (vaultId) => ({
  type: STAGE_VAULT,
  vaultId
});

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


export const editVaultThunk = (vaultData) => async (dispatch) => {
  try {
    const res = await fetch(`/api/vaults/${vaultData.vaultId}`, {
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


export const stageVaultThunk = (vaultId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/vaults/stage/${vaultId}`, {
      method: 'PUT',
    });

    if (response.ok) {
      // Assuming the response includes the staged vault data
      const updatedVault = await response.json();

      // Dispatch the action with the updated vault
      dispatch(stageVaultAction(vaultId));
      
      return updatedVault;
    } else {
      const errorData = await response.json();
      console.error("Error staging vault:", errorData.errors);
      return errorData;
    }
  } catch (error) {
    console.error("Error staging vault:", error);
    return error;
  }
};

export const getAllStagedVaultsThunk = () => async (dispatch) => {
  try {
    const res = await fetch('/api/vaults/stage'); // Adjust the API endpoint for staged vaults
    if (res.ok) {
      const data = await res.json();
      console.log("🌫️", data)
      dispatch(getAllStagedVaultsAction(data));
      return data;
    } else {
      const err = await res.json();
      console.error("Error fetching staged vaults:", err);
      return err;
    }
  } catch (error) {
    console.error("Error fetching staged vaults:", error);
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
  currentVault: {},
  stagedVaults: {}
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
        }
      };
    case DELETE_VAULT:
      // Create a copy of the state.vaults object without the deleted vault
      const updatedVaults = { ...state.vaults };
      delete updatedVaults[action.vaultId];

      return {
        ...state,
        vaults: updatedVaults
      };
    case STAGE_VAULT:
      // Ensure that action.vault exists and has a vaultId property
      if (action.vault && action.vault.vaultId) {
        const updatedVault = {
          ...state.vaults[action.vault.vaultId],
          staged: true,
        };
    
        return {
          ...state,
          vaults: {
            ...state.vaults,
            [action.vault.vaultId]: updatedVault,
          },
          stagedVaults: {
            ...state.stagedVaults,
            [action.vault.vaultId]: updatedVault,
          },
        };
      } else {
        // Handle the case where action.vault is missing or vaultId is missing
        return state; // Or you can handle it differently based on your requirements
      }
      case GET_ALL_STAGED_VAULTS:
        console.log('!!!!Action object:', action); // Log the action object to inspect its structure
        return {
          ...state,
          stagedVaults: action.vaults
        };
      
    default:
      return state;
  }
};

export default vaultReducer;
