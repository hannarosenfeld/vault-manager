// // const GET_STAGE_INFO = 'stage/GET_STAGE_INFO';
// export const ADD_VAULT_TO_STAGE = 'stage/ADD_VAULT_TO_STAGE';
// const GET_ALL_STAGED_VAULTS = 'stage/GET_ALL_STAGED_VAULTS';
// export const REMOVE_VAULT_FROM_STAGE = 'stage/REMOVE_VAULT_FROM_STAGE';

// // export const getStageInfoAction = (stageInfo) => ({
// //   type: GET_STAGE_INFO,
// //   payload: stageInfo,
// // });

// export const addVaultToStageAction = (vault) => ({
//   type: ADD_VAULT_TO_STAGE,
//   vault,
// });

// export const getAllStagedVaultsAction = (stagedVaults) => ({
//   type: GET_ALL_STAGED_VAULTS,
//   stagedVaults,
// });

// export const removeVaultFromStageAction = (vaultId) => ({
//   type: REMOVE_VAULT_FROM_STAGE,
//   vaultId,
// });

// // export const getStageInfoThunk = () => async (dispatch) => {
// //   try {
// //     const response = await fetch('/api/stage');
// //     if (response.ok) {
// //       const stageInfo = await response.json();
// //       dispatch(getStageInfoAction(stageInfo.stage_info));
// //       return stageInfo;
// //     } else {
// //       const errorData = await response.json();
// //       console.error('Error fetching stage information:', errorData.errors);
// //       return errorData;
// //     }
// //   } catch (error) {
// //     console.error('Error fetching stage information:', error);
// //     return error;
// //   }
// // };

// // export const addVaultToStageThunk = (vaultId) => async (dispatch) => {
// //   console.log('gitting add vault to stage thunk')
// //   try {
// //     const res = await fetch(`/api/stage/vaults/${vaultId}`, {
// //       method: 'PUT',
// //       headers: {
// //         'Content-Type': 'application/json',
// //       },      
// //     });

// //     if (res.ok) {
// //       const updatedVault = await res.json();
// //       console.log('add vault to stage res ', updatedVault)
// //       dispatch(addVaultToStageAction(updatedVault));
// //       return updatedVault;
// //     } else {
// //       const errorData = await res.json();
// //       console.error('Error adding vault to stage:', errorData.errors);
// //       return errorData;
// //     }
// //   } catch (error) {
// //     console.error('Error adding vault to stage:', error);
// //     return error;
// //   }
// // };


// export const getAllStagedVaultsThunk = () => async (dispatch) => {
//   console.log('hitting get all stage vaults thunk')
//   try {
//     const res = await fetch('/api/vaults/staged');
//     if (res.ok) {
//       const stagedVaults = await res.json();
//       console.log('stage vaults res ', stagedVaults)
//       dispatch(getAllStagedVaultsAction(stagedVaults));
//       return stagedVaults;
//     } else {
//       const errorData = await res.json();
//       console.error('Error fetching staged vaults:', errorData.errors);
//       return errorData;
//     }
//   } catch (error) {
//     console.error('Error fetching staged vaults:', error);
//     return error;
//   }
// };

// export const removeVaultFromStageThunk = (vaultId) => async (dispatch) => {
//   console.log('hitting remove vault from stage thunk')
//   try {
//     const res = await fetch(`/api/stage/vaults/${vaultId}`, {
//       method: 'DELETE',
//     });

//     if (res.ok) {
//       console.log('remove vault from stage OK', res)
//       dispatch(removeVaultFromStageAction(vaultId));
//       return vaultId;
//     } else {
//       const errorData = await res.json();
//       console.error('Error removing vault from stage:', errorData.errors);
//       return errorData;
//     }
//   } catch (error) {
//     console.error('Error removing vault from stage:', error);
//     return error;
//   }
// };


// const initialState = {};


// const stageReducer = (state = initialState, action) => {
//   let newState;
//   switch (action.type) {
//     case ADD_VAULT_TO_STAGE:
//       console.log('inside add vault to stage => ', action.vault)
//       newState = { ...state }
//       newState[action.vault.id] = action.vault;
//       return newState;  
//     case GET_ALL_STAGED_VAULTS:
//       newState = { ...state, ...action.stagedVaults }
//       return newState
//     case REMOVE_VAULT_FROM_STAGE:
//       newState = { ...state };
//       delete newState[action.vaultId];
//       return newState;
//     default:
//       return state;
//   }
// };

// export default stageReducer;
