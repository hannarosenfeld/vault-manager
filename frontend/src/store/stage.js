import { createAsyncThunk } from '@reduxjs/toolkit';

const GET_ALL_STAGED_VAULTS = "warehouse/GET_ALL_STAGED_VAULTS";
const STAGE_VAULT = "warehouse/STAGE_VAULT";
const STAGE_VAULT_SUCCESS = "warehouse/STAGE_VAULT_SUCCESS";
const STAGE_VAULT_FAILURE = "warehouse/STAGE_VAULT_FAILURE";

export const getAllStagedVaultsAction = (vaults) => ({
  type: GET_ALL_STAGED_VAULTS,
  vaults,
});

export const stageVaultThunk = createAsyncThunk(
  STAGE_VAULT,
  async (vaultId, { rejectWithValue }) => {
    console.log("😎 IN THUNK", vaultId)
    try {
      const response = await fetch(`/api/stage/vaults/${vaultId}`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Failed to stage vault');
      }
      const data = await response.json();
      console.log("🚀 THUNK DATA", data)
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  stagedVaults: {},
  loading: false,
  error: null,
};

const stageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_STAGED_VAULTS:
      const newStagedVaults = action.vaults.reduce((acc, vault) => {
        acc[vault.id] = vault;
        return acc;
      }, {});
      return {
        ...state,
        stagedVaults: newStagedVaults,
      };
    case STAGE_VAULT:
      print("💁🏻‍♀️ STAGE_VAULT");
      return {
        ...state,
        loading: true,
        error: null,
      };
    case STAGE_VAULT_SUCCESS:  
    print("💁🏻‍♀️ STAGE_VAULT_SUCCESS");    
      return {
        ...state,
        loading: false,
        stagedVaults: {
          ...state.stagedVaults,
          [action.payload.id]: action.payload,
        },
      };
    case STAGE_VAULT_FAILURE:
      print("💁🏻‍♀️ STAGE_VAULT_FAILURE");

      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default stageReducer;