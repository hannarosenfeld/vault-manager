// const GET_VAULT = "vault/GET_VAULT";
const GET_ALL_VAULTS = "vault/GET_ALL_VAULTS";
const ADD_VAULT = "vault/ADD_VAULT";
const EDIT_VAULT = "vault/EDIT_VAULT";
export const DELETE_VAULT = "vault/DELETE_VAULT";
export const STAGE_VAULT = "vault/STAGE_VAULT";
const MOVE_VAULT_FROM_STAGE_TO_WAREHOUSE = "vault/MOVE_VAULT_FROM_STAGE_TO_WAREHOUSE"

const editVaultAction = (vault) => ({
  type: EDIT_VAULT,
  vault
});

const deleteVaultAction = (payload) => ({
  type: DELETE_VAULT,
  payload
});

// export const getVaultAction = (vault) => ({
//   type: GET_VAULT,
//   payload: vault,
// });

const getAllVaultsAction = (vaults) => ({
  type: GET_ALL_VAULTS,
  vaults
});

const addVaultAction = (vault) => ({
  type: ADD_VAULT,
  vault
});

const stageVaultAction = (stagingInfo) => ({
  type: STAGE_VAULT,
  stagingInfo
})

const moveVaultFromStageToWarehouseAction = (vault) => ({
  type: MOVE_VAULT_FROM_STAGE_TO_WAREHOUSE,
  vault
})


export const editVaultThunk = (vaultId, vaultData) => async (dispatch) => {
  console.log("🧛🏿‍♀️", vaultData.get('customer_name'))
  try {
    const res = await fetch(`/api/vaults/${vaultId}`, {
      method: 'PUT',
      body: vaultData
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(editVaultAction(data));
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


export const stageVaultThunk = (vaultId, vaultData) => async (dispatch) => {
  try {
    const res = await fetch(`/api/vaults/${vaultId}`, {
      method: 'PUT',
      body: vaultData
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(stageVaultAction(data));
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

export const moveVaultFromStageToWarehouseThunk = (vaultId, selectedFieldId, position) => async (dispatch) => {
  try {
    const res = await fetch(`/api/vaults/moveVault/${selectedFieldId}/${vaultId}/${position}`, {
      method: 'PUT',
    })
    if (res.ok) {
      const data = await res.json();
      dispatch(moveVaultFromStageToWarehouseAction(data));
      return data;
    } else {
      const err = await res.json();
      console.error("Error moving vault to warehouse:", err);
      return err;
    }
  } catch (error) {
    console.error("Error moving vault:", error);
    return error;
  }
}

export const deleteVaultThunk = (vaultId) => async (dispatch) => {

  try {
    const res = await fetch(`/api/vaults/${vaultId}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      const data = await res.json()
      dispatch(deleteVaultAction(data));
      return data;
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

// export const getVaultThunk = (vaultId) => async (dispatch) => {
//   try {
//     const res = await fetch(`/api/vaults/${vaultId}`); // Adjust the API endpoint
//     if (res.ok) {
//       const data = await res.json();
//       dispatch(getVaultAction(data));
//       return data;
//     } else {
//       const err = await res.json();
//       return err;
//     }
//   } catch (error) {
//     console.error("Error fetching vault:", error);
//     return error;
//   }
// };

export const getVaultsThunk = () => async (dispatch) => {
  try {
    const res = await fetch(`/api/vaults/`);
    if (res.ok) {
      const data = await res.json();
      dispatch(getAllVaultsAction(data));
      return data;
    } else {
      const err = await res.json();
      console.error("Error fetching vaults:", err);
      return err;
    }
  } catch (error) {
    console.error("Error fetching vaults:", error);
    return error;
  }
};

export const getAllFieldVaultsThunk = (fieldId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/vaults/${fieldId}`);
    if (res.ok) {
      const data = await res.json();
      dispatch(getAllVaultsAction(data));
      return data;
    } else {
      const err = await res.json();
      console.error("Error fetching vaults:", err);
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
      body: vaultData
    });
    if (res.ok) {
      const data = await res.json();
      dispatch(addVaultAction(data));
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


const initialState = {};


const vaultReducer = (state = initialState, action) => {
  let newState = {}
  switch (action.type) {
    case GET_ALL_VAULTS:
      newState = { ...state, ...action.vaults }
      return newState
    case ADD_VAULT:
      newState[action.vault.id] = action.vault
      return newState
    case EDIT_VAULT:
      newState[action.vault.id] = action.vault
      return newState
    case DELETE_VAULT:
      console.log("🌞", action.payload.vaultId)
      delete newState[action.payload.vaultId];
      return newState
    case STAGE_VAULT:
      newState = { ...state }
      console.log('in stage vault case => ', action.stagingInfo)
      return newState
    case MOVE_VAULT_FROM_STAGE_TO_WAREHOUSE:
      newState = { ...state }
      delete newState[action.vaultId];
      return newState
    default:
      return newState;
  }
};

export default vaultReducer;