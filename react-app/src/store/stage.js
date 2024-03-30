const GET_STAGE_INFO = 'stage/GET_STAGE_INFO';
export const ADD_VAULT_TO_STAGE = 'stage/ADD_VAULT_TO_STAGE';
const GET_ALL_STAGED_VAULTS = 'stage/GET_ALL_STAGED_VAULTS';
export const REMOVE_VAULT_FROM_STAGE = 'stage/REMOVE_VAULT_FROM_STAGE';

export const getStageInfoAction = (stageInfo) => ({
  type: GET_STAGE_INFO,
  payload: stageInfo,
});

export const addVaultToStageAction = (vault) => ({
  type: ADD_VAULT_TO_STAGE,
  vault,
});

export const getAllStagedVaultsAction = (stagedVaults) => ({
  type: GET_ALL_STAGED_VAULTS,
  stagedVaults,
});

export const removeVaultFromStageAction = (vaultId) => ({
  type: REMOVE_VAULT_FROM_STAGE,
  vaultId,
});

export const getStageInfoThunk = () => async (dispatch) => {
  try {
    const response = await fetch('/api/stage');
    if (response.ok) {
      const stageInfo = await response.json();
      dispatch(getStageInfoAction(stageInfo.stage_info));
      return stageInfo;
    } else {
      const errorData = await response.json();
      console.error('Error fetching stage information:', errorData.errors);
      return errorData;
    }
  } catch (error) {
    console.error('Error fetching stage information:', error);
    return error;
  }
};

export const addVaultToStageThunk = (vaultId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/stage/vaults/${vaultId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },      
    });

    if (response.ok) {
      const updatedVault = await response.json();
      dispatch(addVaultToStageAction(updatedVault));
      return updatedVault;
    } else {
      const errorData = await response.json();
      console.error('Error adding vault to stage:', errorData.errors);
      return errorData;
    }
  } catch (error) {
    console.error('Error adding vault to stage:', error);
    return error;
  }
};


export const getAllStagedVaultsThunk = () => async (dispatch) => {
  try {
    const response = await fetch('/api/vaults/staged');
    if (response.ok) {
      const stagedVaults = await response.json();
      dispatch(getAllStagedVaultsAction(stagedVaults));
      return stagedVaults;
    } else {
      const errorData = await response.json();
      console.error('Error fetching staged vaults:', errorData.errors);
      return errorData;
    }
  } catch (error) {
    console.error('Error fetching staged vaults:', error);
    return error;
  }
};

export const removeVaultFromStageThunk = (vaultId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/stage/vaults/${vaultId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      dispatch(removeVaultFromStageAction(vaultId));
      return vaultId;
    } else {
      const errorData = await response.json();
      console.error('Error removing vault from stage:', errorData.errors);
      return errorData;
    }
  } catch (error) {
    console.error('Error removing vault from stage:', error);
    return error;
  }
};


const initialState = {};


const stageReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    // case GET_STAGE_INFO:
    //   return {
    //     ...state,
    //     stageInfo: action.payload,
    //   };
    case ADD_VAULT_TO_STAGE:
      newState = { ...state }
      newState[action.vault.id] = action.vault;
      return newState;  
    case GET_ALL_STAGED_VAULTS:
      newState = { ...state, ...action.stagedVaults }
      return newState
    case REMOVE_VAULT_FROM_STAGE:
      newState = { ...state };
      delete newState[action.vaultId];
      return newState;
    default:
      return state;
  }
};

export default stageReducer;
