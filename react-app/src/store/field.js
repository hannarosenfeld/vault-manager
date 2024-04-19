import { STAGE_VAULT } from "./vault";
const GET_ALL_FIELDS = "field/GET_ALL_FIELDS";
const EDIT_FIELD_TYPE = "field/EDIT_FIELD_TYPE";
const TOGGLE_FIELD_FULL = "field/TOGGLE_FIELD_FULL";
const SET_SELECTED_FIELD = "field/SET_SELECTED_FIELD";
const ADD_FIELDS = "field/ADD_FIELDS";

export const setSelectedFieldAction = (field) => ({
  type: SET_SELECTED_FIELD,
  field
})

const editFieldAction = (fields) => ({
  type: EDIT_FIELD_TYPE,
  fields
})

const editSingleFieldAction = (field) => ({
  type: TOGGLE_FIELD_FULL,
  field
})

const getAllFieldsAction = (fields, warehouseId) => ({
  type: GET_ALL_FIELDS,
  fields, warehouseId
});

const addFieldsAction = (fields, warehouseId) => ({
  type: ADD_FIELDS,
  fields, warehouseId
})

export const editFieldThunk = (fieldData) => async (dispatch) => {
  try {
    const res = await fetch(`/api/fields/${fieldData.field_id_1}`, {
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

export const addFieldsThunk = (formData) => async (dispatch) => {
  try {
    const res = await fetch(`/api/fields/`, {
      method: 'POST',
      body: formData
    });
    console.log(res)
    if (res.ok) {
      const data = await res.json()
      dispatch(addFieldsAction(data.fields, data.warehouseId))
      return data;
    } else {
      const err = await res.json()
      console.log("Error adding new fields: ", err);
      return err;
    }
  } catch (error) {
    console.error("Error adding new fields: ", error)
  }
}

const initialState = {};

const fieldReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case SET_SELECTED_FIELD:
      return {
        ...state,
        selectedField: action.field
      }
    case EDIT_FIELD_TYPE:
      const [topField, bottomField] = action.fields
      newState[topField.warehouse_id][topField.id] = topField
      newState[bottomField.warehouse_id][bottomField.id] = bottomField
      return {
        ...state,
        selectedField: topField
      }
    case TOGGLE_FIELD_FULL:
      return {
        ...state,
        [action.field.warehouse_id]: {
        ...state[action.field.warehouse_id],
        [action.field.id]: action.field
      },
      selectedField: action.field
    }
    case GET_ALL_FIELDS:
      newState[action.warehouseId] = { ...action.fields }
      return newState
    case STAGE_VAULT:
        const field = action.stagingInfo.field
        return {
          ...state,
          [field.warehouse_id] : {
            ...state[field.warehouse_id],
            [field.id] : field
          },
          selectedField: field
        }
    case ADD_FIELDS:
      console.log(action)
      newState[action.warehouseId] = { ...action.fields }
      return newState
    default:
      return state;
  }
};

export default fieldReducer;