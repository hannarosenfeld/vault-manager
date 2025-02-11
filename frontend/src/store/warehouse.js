const GET_ALL_WAREHOUSES = 'warehouse/GET_ALL_WAREHOUSES'

export const getAllWarehouses = (warehouses) => ({
  type: GET_ALL_WAREHOUSES,
  warehouses
})

export const getAllWarehousesThunk = () => async (dispatch) => {
  try {
    const response = await fetch('/api/warehouse/');
    if (response.ok) {
      const data = await response.json();
      dispatch(getAllWarehouses(data));
      return data;
    } else {
      const errorData = await response.json();
      console.error('Error fetching warehouses:', errorData.errors);
      return errorData;
    }
  } catch (error) {
    console.error('Error fetching warehouses:', error);
    return error;
  }
};

const initialState = {};

const warehouseReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_ALL_WAREHOUSES:
      const warehouses = action.warehouses;
      warehouses.map((warehouse) => {
        newState[warehouse.id] = warehouse;
      });
      return newState;
    default:
      return state;
  }
};


export default warehouseReducer;
