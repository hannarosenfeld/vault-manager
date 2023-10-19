import { setWarehouseSearchModeAction } from './warehouse'; // Import the action creator for changing searchmode in your warehouse actions
const GET_CUSTOMER = "customer/GET_CUSTOMER";
const GET_ALL_CUSTOMERS = "customer/GET_ALL_CUSTOMERS";
const ADD_CUSTOMER = "customer/ADD_CUSTOMER";
const UPDATE_CUSTOMER_NAME = "customer/UPDATE_CUSTOMER_NAME";
const SET_SELECTED_CUSTOMER = "/customer/SET_SELECTED_CUSTOMER";
const RESET_SELECTED_CUSTOMER = "customer/RESET_SELECTED_CUSTOMER";

const resetSelectedCustomerAction = () => ({
  type: RESET_SELECTED_CUSTOMER,
});

const updateCustomerNameAction = (customerId, newName) => ({
  type: UPDATE_CUSTOMER_NAME,
  customerId,
  newName
});

const getCustomerAction = (customer) => ({
  type: GET_CUSTOMER,
  customer
});

const getAllCustomersAction = (customers) => ({
  type: GET_ALL_CUSTOMERS,
  customers
});

const addCustomerAction = (customer) => ({
  type: ADD_CUSTOMER,
  customer
});
 

export const resetSelectedCustomerThunk = (customerId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/customers/${customerId}/reset-selected`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      dispatch(resetSelectedCustomerAction());
      return { success: true };
    } else {
      const err = await res.json();
      console.error("Error resetting selected customer:", err);
      return { error: err };
    }
  } catch (error) {
    console.error("Error resetting selected customer:", error);
    return { error: error };
  }
};

export const setSelectedCustomerThunk = (customerId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/customers/${customerId}/selected`, {
      method: 'PUT', // Set the HTTP method to PUT
      headers: {
        'Content-Type': 'application/json',
      },
      // If you need to send data in the request body, add it here:
      // body: JSON.stringify({ /* your data */ }),
    });

    if (res.ok) {
      const selectedCustomer = await res.json();
      dispatch({
        type: SET_SELECTED_CUSTOMER,
        payload: selectedCustomer,
      });

      dispatch(setWarehouseSearchModeAction(true));

      return selectedCustomer;
    } else {
      const err = await res.json();
      console.error("Error setting selected customer:", err);
      return err;
    }
  } catch (error) {
    console.error("Error setting selected customer:", error);
    return error;
  }
};


export const updateCustomerNameThunk = (customerId, newName) => async (dispatch) => {
  try {
    const res = await fetch(`/api/customers/${customerId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: newName })
    });

    if (res.ok) {
      const updatedCustomer = await res.json();
      dispatch(updateCustomerNameAction(customerId, newName)); // Update the state with the new name
      return updatedCustomer;
    } else {
      const err = await res.json();
      console.error("Error updating customer name:", err);
      return err;
    }
  } catch (error) {
    console.error("Error updating customer name:", error);
    return error;
  }
};

export const getCustomerThunk = (customerId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/customers/${customerId}`); // Adjust the API endpoint
    if (res.ok) {
      const data = await res.json();
      dispatch(getCustomerAction(data));
      return data;
    } else {
      const err = await res.json();
      return err;
    }
  } catch (error) {
    console.error("Error fetching customer:", error);
    return error;
  }
};

export const getAllCustomersThunk = () => async (dispatch) => {
  try {
    const res = await fetch('/api/customers');
    if (res.ok) {
      const data = await res.json();
      dispatch(getAllCustomersAction(data));
      return data;
    } else {
      const err = await res.json();
      console.error("Error fetching customers:", err); // Log the error
      return err;
    }
  } catch (error) {
    console.error("Error fetching customers:", error);
    return error;
  }
};

export const addCustomerThunk = (customerData) => async (dispatch) => {
  try {
    const res = await fetch('/api/customers/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customerData)
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(addCustomerAction(data)); // Update the state with the new customer
      return data;
    } else {
      const err = await res.json();
      console.error("Error adding customer:", err);
      return err;
    }
  } catch (error) {
    console.error("Error adding customer:", error);
    return error;
  }
};

const initialState = {
  customers: {},
  currentCustomer: {},
  selectedCustomer: null,
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_SELECTED_CUSTOMER:
      return {
        ...state,
        selectedCustomer: null, 
      };    
    case SET_SELECTED_CUSTOMER:
      return {
        ...state,
        selectedCustomer: action.payload,
      };    
    case GET_CUSTOMER:
      return {
        ...state,
        customers: {
          ...state.customers,
          [action.customer.id]: action.customer
        },
        currentCustomer: action.customer
      };    
    case GET_ALL_CUSTOMERS:
      return {
        ...state,
        customers: {
          ...state.customers,
          ...action.customers
        }
      };
    case ADD_CUSTOMER:
      return {
        ...state,
        customers: {
          ...state.customers,
          [action.customer.id]: action.customer
        }
      };
    case UPDATE_CUSTOMER_NAME:
      const updatedCustomer = { ...state.customers[action.customerId], name: action.newName };
    
      return {
        ...state,
        customers: {
          ...state.customers,
          [action.customerId]: updatedCustomer
        }
      };      
    default:
      return state;
  }
};

export default customerReducer;
