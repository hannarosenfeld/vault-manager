const GET_ALL_STAGED_VAULTS = "warehouse/GET_ALL_STAGED_VAULTS";

export const getAllStagedVaultsAction = (vaults) => ({
  type: GET_ALL_STAGED_VAULTS,
  vaults,
});

