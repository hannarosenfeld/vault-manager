const GET_CUSTOMER = "customer/GET_CUSTOMER";
const GET_ALL_CUSTOMERS = "customer/GET_ALL_CUSTOMERS";
const ADD_CUSTOMER = "customer/ADD_CUSTOMER";

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

const initialState = {
  customers: {},
  currentCustomer: {}
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};

export default customerReducer;
