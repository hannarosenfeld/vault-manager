const ADD_WAREHOUSE = 'warehouse/ADD_WAREHOUSE';
const GET_ALL_WAREHOUSES = 'warehouse/GET_ALL_WAREHOUSES'
const EDIT_WAREHOUSE = 'warehouse/EDIT_WAREHOUSE';

export const getAllWarehouses = (warehouses) => ({
  type: GET_ALL_WAREHOUSES,
  warehouses
})

export const addWarehouseAction = (warehouseData) => ({
  type: ADD_WAREHOUSE,
  payload: warehouseData,
});

export const editWarehouse = (warehouseData) => ({
  type: EDIT_WAREHOUSE,
  warehouseData
});
  

export const addWarehouseThunk = (warehouseData) => async (dispatch) => {
  try {
    const response = await fetch('/api/warehouse/add-warehouse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(warehouseData),
    });

    if (response.ok) {
      const newWarehouse = await response.json();
      dispatch(addWarehouseAction(newWarehouse));
      return newWarehouse;
    } else {
      const errorData = await response.json();
      console.error('Error adding warehouse:', errorData.errors);
      return errorData;
    }
  } catch (error) {
    console.error('Error adding warehouse:', error);
    return error;
  }
};


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

export const editWarehouseThunk = (warehouseId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/warehouse/${warehouseId}`);
    if (response.ok) {
      const data = await response.json();
      dispatch(editWarehouse(data));
      return data;
    } else {
      const errorData = await response.json();
      console.error('Error edit warehouse:', errorData.errors);
      return errorData;
    }
  } catch (error) {
    console.error('Error editing warehouse:', error);
    return error;
  }
}


const initialState = {};

const warehouseReducer = (state = initialState, action) => {
  let newState = {...state}
  switch (action.type) {
    case GET_ALL_WAREHOUSES:
        const warehouses = action.warehouses
        warehouses.map(warehouse => {
          newState[warehouse.id] = warehouse
        })
        return newState;
    case ADD_WAREHOUSE:
      return {
        ...state,
        warehouses: [...state.warehouses, action.payload],
      };
    case EDIT_WAREHOUSE:
      console.log("🍒 in reducer")
    default:
      return state;
  }
};

export default warehouseReducer;
