import { GET_WAREHOUSE_INFO } from "./warehouse";

const GET_FIELD = "field/GET_FIELD";
const GET_ALL_FIELDS = "field/GET_ALL_FIELDS"; // Add this new action type
const TOGGLE_COUCHBOX_FIELD = "field/TOGGLE_COUCHBOX_FIELD"
// const REMOVE_VAULT_FROM_FIELD = "field/REMOVE_VAULT_FROM_FIELD"; // New action type for removing a vault from a field

// Action creator for getting a single field
const getFieldAction = (field) => ({
  type: GET_FIELD,
  field
});

const toggleCouchBoxFieldAction = (field) => ({
  type: TOGGLE_COUCHBOX_FIELD,
  field
})

// Action creator for getting all fields
const getAllFieldsAction = (fields) => ({
  type: GET_ALL_FIELDS,
  fields
});

// // Action creator for removing a vault from a field
// const removeVaultFromFieldAction = (fieldId, vaultId) => ({
//   type: REMOVE_VAULT_FROM_FIELD,
//   fieldId,
//   vaultId
// });


export const toggleCouchBoxFieldThunk = (fieldId) => async (dispatch) => {
  console.log("💖 in thunk", fieldId)
  try {
    const res = await fetch(`/api/fields/${fieldId}`, {
    method: 'PUT',
    });
    if (res.ok) {
      const data = await res.json();
      dispatch(toggleCouchBoxFieldAction(data));
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

// // Thunk action creator for removing a vault from a field
// export const removeVaultFromFieldThunk = (fieldId, vaultId) => async (dispatch) => {
//   try {
//     const res = await fetch(`/api/fields/${fieldId}/vaults/${vaultId}`, {
//       method: 'DELETE',
//     });
//     if (res.ok) {
//       dispatch(removeVaultFromFieldAction(fieldId, vaultId));
//     } else {
//       const err = await res.json();
//       console.error("Error removing vault from field:", err); // Log the error
//       return err;
//     }
//   } catch (error) {
//     console.error("Error removing vault from field:", error);
//     return error;
//   }
// };

const initialState = {
  fields: {},
  currentField: {}
};

const fieldReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_COUCHBOX_FIELD:
      console.log("💋", action.field)
      return {
        ...state,
        [action.field.id]: action.field
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
          ...action.payload.warehouse_info.fields
        },
      }
    // case REMOVE_VAULT_FROM_FIELD:
    // // Check if the field exists in the state
    // if (!state.fields[action.fieldId]) {
    //     // Field doesn't exist, return the current state
    //     return state;
    // }
    
    // const updatedField = { ...state.fields[action.fieldId] };
    // // Check if the 'vaults' property exists in the field object
    // if (updatedField.vaults && Array.isArray(updatedField.vaults)) {
    //     updatedField.vaults = updatedField.vaults.filter(vault => vault.id !== action.vaultId);
    // }
    
    // return {
    //     ...state,
    //     fields: {
    //     ...state.fields,
    //     [action.fieldId]: updatedField
    //     }
    // };
      
    default:
      return state;
  }
};

export default fieldReducer;
