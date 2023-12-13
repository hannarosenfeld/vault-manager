const GET_VAULT_ATTACHMENTS = "attachment/GET_VAULT_ATTACHMENTS"

export const getVaultAttachmentsAction = (attachments) => ({
    type: GET_VAULT_ATTACHMENTS,
    attachments
})

export const getAllVaultAttachmentsThunk = (vaultId) => async (dispatch) => {
    console.log("🪫 in thunk")
    try {
        const res = await fetch(`/api/attachments/${vaultId}`);
        if (res.ok) {
          const data = await res.json();
          dispatch(getVaultAttachmentsAction(data));
          return data;
        } else {
          const err = await res.json();
          return err;
        }
      } catch (error) {
        console.error("Error fetching field:", error);
        return error;
      }
}

const initialState = {
    vaultAttachments: {},
};


const attachmentReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_VAULT_ATTACHMENTS:
            console.log("🧧 action", action.attachments)
            return {
                ...state,
                vaultAttachments: action.attachments,
            };
        default: return state
    }

}
  
export default attachmentReducer;
  