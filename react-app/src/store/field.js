const GET_ALL_FIELDS = "field/GET_ALL_FIELDS";
const EDIT_FIELD = "field/EDIT_FIELD";


const editFieldAction = (field) => ({
  type: EDIT_FIELD,
  field
})

const getAllFieldsAction = (fields) => ({
  type: GET_ALL_FIELDS,
  fields
});


export const editFieldThunk = (fieldData) => async (dispatch) => {
  try {
    const res = await fetch(`/api/fields/${fieldData.id}`, {
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

export const getAllFieldsThunk = (warehouseId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/fields/${warehouseId}`);
    if (res.ok) {
      const data = await res.json();
      dispatch(getAllFieldsAction(data));
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
      const {id, name, type, vaults, warehouseId, full} = action.field;
      newState[id] = {name, type, vaults, warehouseId, full};
      return state
    case GET_ALL_FIELDS:
      newState = { ...newState, ...action.fields }
      return newState
    default:
      return state;
  }
};

export default fieldReducer;