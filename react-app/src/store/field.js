import { STAGE_VAULT } from "./vault";
const GET_ALL_FIELDS = "field/GET_ALL_FIELDS";
const EDIT_FIELD = "field/EDIT_FIELD";
const EDIT_SINGLE_FIELD = "field/EDIT_SINGLE_FIELD";


const editFieldAction = (fields) => ({
  type: EDIT_FIELD,
  fields
})

const editSingleFieldAction = (field) => ({
  type: EDIT_SINGLE_FIELD,
  field
})

const getAllFieldsAction = (fields, warehouseId) => ({
  type: GET_ALL_FIELDS,
  fields, warehouseId
});


export const editFieldThunk = (fieldData) => async (dispatch) => {
  try {
    const res = await fetch(`/api/fields/${fieldData.field_id_1}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fieldData)
    });
    if (res.ok) {
      const data = await res.json();
      dispatch(editFieldAction(data));
      return data;
    } else {
      const err = await res.json();
      return err;
    }
  } catch (error) {
    console.error("Error editting field:", error);
    return error;
  }
};
export const editSingleFieldThunk = (fieldId, data) => async (dispatch) => {
  try {
    const res = await fetch(`/api/fields/single/${fieldId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      const data = await res.json();
      dispatch(editSingleFieldAction(data));
      return data;
    } else {
      const err = await res.json();
      return err;
    }
  } catch (error) {
    console.error("Error editting field:", error);
    return error;
  }
};

export const getAllFieldsThunk = (warehouseId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/fields/${warehouseId}`);
    if (res.ok) {
      const data = await res.json();
      dispatch(getAllFieldsAction(data, warehouseId));
      return data;
    } else {
      const err = await res.json();
      console.error("Error fetching fields:", err); // Log the error
      return err;
    }
  } catch (error) {
    console.error("Error fetching fields:", error);
    return error;
  }
};

const initialState = {};

const fieldReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case EDIT_FIELD:
      const [topField, bottomField] = action.fields
      newState[topField.id] = topField
      newState[bottomField.id] = bottomField
      return newState
    case EDIT_SINGLE_FIELD:
      console.log("😎", action.field)
      return {
        ...state,
        [action.field.warehouse_id]: {
        ...state[action.field.warehouse_id],
        [action.field.id]: action.field
      }
    }
    case GET_ALL_FIELDS:
      newState[action.warehouseId] = { ...action.fields }
      return newState
    case STAGE_VAULT:
        const fieldId = action.stagingInfo.field_id
        const field = newState[fieldId]
        let fieldVaults = field.vaults
        let index = fieldVaults.indexOf(action.stagingInfo.vault.id)
        field.vaults = [...fieldVaults.slice(0, index), ...fieldVaults.slice(index+1)]
        
        return newState
    default:
      return state;
  }
};

export default fieldReducer;