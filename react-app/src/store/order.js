const GET_ORDER = "order/GET_ORDER";
const GET_ALL_ORDERS = "order/GET_ALL_ORDERS";
const ADD_ORDER = "order/ADD_ORDER";
// const UPDATE_ORDER_NUMBER = "order/UPDATE_ORDER_NUMBER";

const getOrderAction = (order) => ({
  type: GET_ORDER,
  order,
});

const addOrderAction = (order) => ({
  type: ADD_ORDER,
  order,
});

// const updateOrderNumberAction = (orderId, newOrderNumber) => ({
//   type: UPDATE_ORDER_NUMBER,
//   orderId,
//   newOrderNumber,
// });

const getAllOrdersAction = (orders) => ({
    type: GET_ALL_ORDERS,
    orders,
});
  
export const getAllOrdersThunk = () => async (dispatch) => {
    try {
        const res = await fetch('/api/orders/');
        if (res.ok) {
        const data = await res.json();
        dispatch(getAllOrdersAction(data));
        return data;
        } else {
        const err = await res.json();
        console.error("Error fetching orders:", err); // Log the error
        return err;
        }
    } catch (error) {
        console.error("Error fetching orders:", error);
        return error;
    }
};

// export const updateOrderNumberThunk = (orderId, newOrderNumber) => async (dispatch) => {
//   try {
//     const res = await fetch(`/api/orders/${orderId}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ orderNumber: newOrderNumber }),
//     });

//     if (res.ok) {
//       const updatedOrder = await res.json();
//       dispatch(updateOrderNumberAction(orderId, newOrderNumber)); // Update the state with the new order number
//       return updatedOrder;
//     } else {
//       const err = await res.json();
//       console.error("Error updating order number:", err);
//       return err;
//     }
//   } catch (error) {
//     console.error("Error updating order number:", error);
//     return error;
//   }
// };

export const getOrderThunk = (orderId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/orders/${orderId}`); // Adjust the API endpoint
    if (res.ok) {
      const data = await res.json();
      dispatch(getOrderAction(data));
      return data;
    } else {
      const err = await res.json();
      return err;
    }
  } catch (error) {
    console.error("Error fetching order:", error);
    return error;
  }
};

export const addOrderThunk = (orderData) => async (dispatch) => {
  try {
    const res = await fetch('/api/orders/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(addOrderAction(data)); // Update the state with the new order
      return data;
    } else {
      const err = await res.json();
      console.error("Error adding order:", err);
      return err;
    }
  } catch (error) {
    console.error("Error adding order:", error);
    return error;
  }
};

const initialState = {
  orders: {},
  currentOrder: {},
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ORDERS:
      return {
        ...state,
        orders: {
          ...state.orders,
          ...action.orders,
        },
      };    
    case GET_ORDER:
      return {
        ...state,
        orders: {
          ...state.orders,
          [action.order.id]: action.order,
        },
        currentOrder: action.order,
      };
    case ADD_ORDER:
      return {
        ...state,
        orders: {
          ...state.orders,
          [action.order.id]: action.order,
        },
      };
    // case UPDATE_ORDER_NUMBER:
    //   const updatedOrder = { ...state.orders[action.orderId], orderNumber: action.newOrderNumber };
    //   return {
    //     ...state,
    //     orders: {
    //       ...state.orders,
    //       [action.orderId]: updatedOrder,
    //     },
    //   };
    default:
      return state;
  }
};

export default orderReducer;
