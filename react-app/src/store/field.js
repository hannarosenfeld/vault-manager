import { GET_WAREHOUSE_INFO } from "./warehouse";
const GET_FIELD = "field/GET_FIELD";
const GET_ALL_FIELDS = "field/GET_ALL_FIELDS";
const TOGGLE_FIELD_TYPE = "field/TOGGLE_FIELD_TYPE"
const GET_FIELD_VAULTS = "vault/GET_FIELD_VAULTS";
const CLEAR_CURRENT_FIELD = "field/CLEAR_CURRENT_FIELD";


const getFieldVaultsAction = (vaults) => ({
  type: GET_FIELD_VAULTS,
  vaults
})

const getFieldAction = (field) => ({
  type: GET_FIELD,
  field
});

const toggleFieldTypeAction = (field) => ({
  type: TOGGLE_FIELD_TYPE,
  field
})

const getAllFieldsAction = (fields) => ({
  type: GET_ALL_FIELDS,
  fields
});

export const clearCurrentField = () => ({
  type: CLEAR_CURRENT_FIELD
})

export const getFieldVaultsThunk = (fieldId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/fields/${fieldId}/vaults`);

    if (res.ok) {
      const data = await res.json();
      dispatch(getFieldVaultsAction(data));
    } else {
      const errorMessage = await res.text(); // Get the error message
      console.error(`Error fetching field vaults: ${errorMessage}`);
      // Handle the error, e.g., show a notification or dispatch another action
    }
  } catch (error) {
    console.error("Error fetching field vaults:", error);
    // Handle other types of errors if needed
  }
};


export const toggleFieldTypeThunk = (fieldId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/fields/${fieldId}`, {
      method: 'PUT',
      body:
    });
    if (res.ok) {
      const data = await res.json();
      dispatch(toggleFieldTypeAction(data));
      return data;
    } else {
      const err = await res.json();
      return err;
    }
  } catch (error) {
    console.error("Error toggling field:", error);
    return error;
  }
};

// Thunk action creator for getting a single field
export const getFieldThunk = (fieldId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/fields/${fieldId}`);
    if (res.ok) {
      const data = await res.json();
      dispatch(getFieldAction(data));
      return data;
    } else {
      const err = await res.json();
      return err;
    }
  } catch (error) {
    console.error("Error fetching field:", error);
    return error;
  }
};

// Thunk action creator for getting all fields
export const getAllFieldsThunk = () => async (dispatch) => {
  try {
    const res = await fetch('/api/fields/');
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

const initialState = {
  fields: {},
  currentField: {},
  fieldVaults: {}
};

const fieldReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FIELD_TYPE:
      return {
        ...state,
        fields: {
          ...state.fields,
          [action.field.id]: action.field
        }
      }
    case GET_FIELD:
      return {
        ...state,
        fields: {
          ...state.fields,
          [action.field.id]: action.field
        },
        currentField: action.field
      };
    case GET_ALL_FIELDS:
      return {
        ...state,
        fields: action.fields
      };
      case GET_WAREHOUSE_INFO:
        return {
          ...state,
          fields: {
            ...state.fields,
            ...action.payload.fields
          },
        };
      
      case GET_FIELD_VAULTS:
        const updatedFieldVaults = action.vaults.reduce((accumulator, vault) => {
          accumulator[vault.position] = vault;
          return accumulator;
        }, {});
      
        return {
          ...state,
          fieldVaults: updatedFieldVaults
        };
      
      case CLEAR_CURRENT_FIELD:
        return { ...state, currentField: null }
           
    default:
      return state;
  }
};

export default fieldReducer;