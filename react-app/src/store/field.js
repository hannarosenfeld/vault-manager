// const GET_FIELD = "field/GET_FIELD";
// const GET_ALL_FIELDS = "field/GET_ALL_FIELDS"; // Add this new action type

// // Action creator for getting a single field
// const getFieldAction = (field) => ({
//   type: GET_FIELD,
//   field
// });

// // Action creator for getting all fields
// const getAllFieldsAction = (fields) => ({
//   type: GET_ALL_FIELDS,
//   fields
// });

// // Thunk action creator for getting a single field
// export const getFieldThunk = (fieldId) => async (dispatch) => {
//   try {
//     const res = await fetch(`/api/fields/${fieldId}`); // Adjust the API endpoint
//     if (res.ok) {
//       const data = await res.json();
//       dispatch(getFieldAction(data));
//       return data;
//     } else {
//       const err = await res.json();
//       return err;
//     }
//   } catch (error) {
//     console.error("Error fetching field:", error);
//     return error;
//   }
// };

// // Thunk action creator for getting all fields
// export const getAllFieldsThunk = () => async (dispatch) => {
//   try {
//     const res = await fetch('/api/fields/');
//     if (res.ok) {
//       const data = await res.json();
//       dispatch(getAllFieldsAction(data));
//       return data;
//     } else {
//       const err = await res.json();
//       console.error("Error fetching fields:", err); // Log the error
//       return err;
//     }
//   } catch (error) {
//     console.error("Error fetching fields:", error);
//     return error;
//   }
// };

// const initialState = {
//   fields: {},
//   currentField: {}
// };

// const fieldReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case GET_FIELD:
//       return {
//         ...state,
//         fields: {
//           ...state.fields,
//           [action.field.id]: action.field
//         },
//         currentField: action.field
//       };
//     case GET_ALL_FIELDS:
//       return {
//         ...state,
//         fields: action.fields
//       };
//     default:
//       return state;
//   }
// };

// export default fieldReducer;
