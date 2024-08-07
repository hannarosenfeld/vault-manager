import { setWarehouseSearchModeAction } from './warehouse';
import { DELETE_VAULT } from './vault';
const GET_CUSTOMER = "customer/GET_CUSTOMER";
const GET_ALL_CUSTOMERS = "customer/GET_ALL_CUSTOMERS";
const ADD_CUSTOMER = "customer/ADD_CUSTOMER";
const UPDATE_CUSTOMER_NAME = "customer/UPDATE_CUSTOMER_NAME";


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
      dispatch(updateCustomerNameAction(customerId, newName));
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
    const res = await fetch(`/api/customers/${customerId}`); 
    // TODO: How is this even working?? The route is commented out. Check customer route in backend
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
    const res = await fetch('/api/customers/');
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

const initialState = {};

const customerReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case GET_CUSTOMER:
      return {
          ...state,
          [action.customer.id]: action.customer
        // currentCustomer: action.customer
      };    
    case GET_ALL_CUSTOMERS:
      newState = { ...state, ...action.customers }
      return newState;
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
    case DELETE_VAULT:
      console.log("🥰 in reducer", action.payload)
      console.log("💧cusomers before delete: ", state)
      // Check if customer_to_delete is present in the action payload
      if (action.payload && action.payload.customer_to_delete) {
        const { customer_to_delete } = action.payload;
        // Remove the customer from the state
        const { [customer_to_delete]: removedCustomer, ...remainingCustomers } = state;
        console.log("👙 remaining customers: ", remainingCustomers)
        return remainingCustomers;
      }
      return state;
    default:
      return state;
  }
};

export default customerReducer;
