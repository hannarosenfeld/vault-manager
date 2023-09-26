const GET_STAGE_INFO = 'stage/GET_STAGE_INFO';
const ADD_VAULT_TO_STAGE = 'stage/ADD_VAULT_TO_STAGE';
const GET_ALL_STAGED_VAULTS = 'stage/GET_ALL_STAGED_VAULTS';
const REMOVE_VAULT_FROM_STAGE = 'stage/REMOVE_VAULT_FROM_STAGE';

export const getStageInfoAction = (stageInfo) => ({
  type: GET_STAGE_INFO,
  payload: stageInfo,
});

export const addVaultToStageAction = (vault) => ({
  type: ADD_VAULT_TO_STAGE,
  payload: vault,
});


export const getAllStagedVaultsAction = (vaults) => ({
  type: GET_ALL_STAGED_VAULTS,
  payload: vaults,
});

export const removeVaultFromStageAction = (vaultId) => ({
  type: REMOVE_VAULT_FROM_STAGE,
  payload: vaultId,
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
  console.log("🌾 in thunk")
  try {
    const response = await fetch(`/api/stage/vaults/${vaultId}`, {
      method: 'PUT',
    });

    if (response.ok) {
      const updatedVault = await response.json();
      console.log("🐚 in thunk, response ok. updatedVault: ", updatedVault)
      dispatch(addVaultToStageAction(updatedVault)); // Dispatch the entire vault object
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
    const response = await fetch('/api/stage/vaults');
    if (response.ok) {
      const vaults = await response.json();
      dispatch(getAllStagedVaultsAction(vaults.staged_vaults));
      return vaults;
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

const initialState = {
  stageInfo: {},
  stagedVaults: [],
};

const stageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STAGE_INFO:
      return {
        ...state,
        stageInfo: action.payload,
      };
    case ADD_VAULT_TO_STAGE:
      return {
        ...state,
        stagedVaults: [...state.stagedVaults, action.payload],
      };    
    case GET_ALL_STAGED_VAULTS:
      return {
        ...state,
        stagedVaults: action.payload,
      };
    case REMOVE_VAULT_FROM_STAGE:
      return {
        ...state,
        stagedVaults: state.stagedVaults.filter((vault) => vault !== action.payload),
      };
    default:
      return state;
  }
};

export default stageReducer;
