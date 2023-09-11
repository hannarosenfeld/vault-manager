const STAGE_VAULT = "vault/STAGE_VAULT";
const GET_ALL_STAGED_VAULTS = "vault/GET_ALL_STAGED_VAULTS";


const getAllStagedVaultsAction = (vaults) => ({
    type: GET_ALL_STAGED_VAULTS,
    vaults
  });

const stageVaultAction = (vaultId) => ({
    type: STAGE_VAULT,
    vaultId
  });



export const getAllStagedVaultsThunk = () => async (dispatch) => {
    try {
        const res = await fetch('/api/stage'); // Adjust the API endpoint for staged vaults
        if (res.ok) {
        const data = await res.json();
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


export const stageVaultThunk = (vaultId) => async (dispatch) => {
  console.log("🐚 in thunk")
    try {
        const response = await fetch(`/api/stage/${vaultId}`, {
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

const initialState = {
    vaults: {},
    currentVault: {}
  };
  
  const stageReducer = (state = initialState, action) => {
    switch (action.type) {
      case STAGE_VAULT:
        console.log('⭐️ Action object:', action);
        // Ensure that action.vault exists and has a vaultId property
        if (action.vaultId) {
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
          };
        } else {
          // Handle the case where action.vault is missing or vaultId is missing
          return state; // Or you can handle it differently based on your requirements
        }
        case GET_ALL_STAGED_VAULTS:
          console.log('⭐️ Action object:', action); // Log the action object to inspect its structure
          return {
            ...state,
            vaults: action.vaults
          };
        
      default:
        return state;
    }
  };
  
  export default stageReducer;
  