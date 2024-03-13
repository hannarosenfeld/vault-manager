const GET_VAULT_ATTACHMENTS = "attachment/GET_VAULT_ATTACHMENTS"
const DELETE_VAULT_ATTACHMENT = "attachment/DELETE_VAULT_ATTACHMENT"

export const getVaultAttachmentsAction = (attachments) => ({
    type: GET_VAULT_ATTACHMENTS,
    attachments
})

export const deleteVaultAttachmentAction = (attachmentId) => ({
    type: DELETE_VAULT_ATTACHMENT,
    attachmentId
})

export const getAllVaultAttachmentsThunk = (vaultId) => async (dispatch) => {
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
        console.error("Error fetching attachment: ", error);
        return error;
      }
}

export const deleteAttachmentThunk = (vaultId, attachmentData) => async (dispatch) => {
  let attachmentId = attachmentData.get("attachment_id")
  try {
    const res = await fetch(`/api/attachments/${vaultId}/${attachmentId}`, {
      method: 'DELETE',
      body: attachmentData
    });
    if (res.ok) {
      const data = await res.json();
      dispatch(deleteVaultAttachmentAction(data));
      return data;
    }
  } catch (error) {
    console.error("Error deleting attachment: ", error);
    return error;
  }
}

const initialState = {};

const attachmentReducer = (state = initialState, action) => {
    let newState = {}
    switch(action.type) {
      case GET_VAULT_ATTACHMENTS:
        newState = { ...state, ...action.attachments }
        return newState
      case DELETE_VAULT_ATTACHMENT:
        newState = { ...state }
        delete newState[action.attachmentId]
        return newState
      default: return state
    }

}
  
export default attachmentReducer;
  