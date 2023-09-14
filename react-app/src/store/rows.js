// const GET_ROW = "row/GET_ROW";
// const GET_ALL_ROWS = "row/GET_ALL_ROWS"; // Add this new action type

// // Action creator for getting a single row
// const getRowAction = (row) => ({
//   type: GET_ROW,
//   row
// });

// // Action creator for getting all rows
// const getAllRowsAction = (rows) => ({
//   type: GET_ALL_ROWS,
//   rows
// });

// // Thunk action creator for getting a single row
// export const getRowThunk = (rowId) => async (dispatch) => {
//   try {
//     const res = await fetch(`/api/rows/${rowId}`); // Adjust the API endpoint
//     if (res.ok) {
//       const data = await res.json();
//       dispatch(getRowAction(data));
//       return data;
//     } else {
//       const err = await res.json();
//       return err;
//     }
//   } catch (error) {
//     console.error("Error fetching row:", error);
//     return error;
//   }
// };

// // Thunk action creator for getting all rows
// export const getAllRowsThunk = () => async (dispatch) => {
//   try {
//     const res = await fetch('/api/rows/');
//     if (res.ok) {
//       const data = await res.json();
//       dispatch(getAllRowsAction(data));
//       return data;
//     } else {
//       const err = await res.json();
//       console.error("Error fetching rows:", err); // Log the error
//       return err;
//     }
//   } catch (error) {
//     console.error("Error fetching rows:", error);
//     return error;
//   }
// };

// const initialState = {
//   rows: {},
//   currentRow: {}
// };

// const rowReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case GET_ROW:
//       return {
//         ...state,
//         rows: {
//           ...state.rows,
//           [action.row.id]: action.row
//         },
//         currentRow: action.row
//       };
//     case GET_ALL_ROWS:
//       return {
//         ...state,
//         rows: action.rows
//       };
//     default:
//       return state;
//   }
// };

// export default rowReducer;
