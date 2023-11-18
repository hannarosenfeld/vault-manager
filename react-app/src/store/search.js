export const SEARCH_ON = 'search/SEARCH_ON';
export const SEARCH_OFF = 'search/SEARCH_OFF';

export const setSearchOnAction = (payload) => ({
  type: SEARCH_ON,
  payload
});

export const setSearchOffAction = () => ({
  type: SEARCH_OFF,
});

export const searchThunk = (item, type) => async (dispatch) => {
  console.log("🍊 in thunk!!");
  console.log("🍊 item: ", item);
  console.log("🍊 type: ", type);

  try {
    let res = await fetch(`/api/search/${type}/${item.id}`)
    console.log("🍎", res)
    if (res.ok) {
        const data = await res.json();
        dispatch(setSearchOnAction(data));
        return data;
    } else {
        const err = await res.json();
        return err;
    }
  } catch (error) {
    console.log("Error fetching searched item: ", error);
    return error;
  }
};

export const setSearchOffThunk = (item, type) => async (dispatch) => {
  console.log("🟣 search off thunk", item, type)
  try {
    const res = await fetch(`/api/search/${type}/${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      dispatch(setSearchOffAction());
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

const initialState = {
  fields: null
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_ON:
        console.log("🥭", action.payload)
        return {
            ...state,
            fields: action.payload
        }
    case SEARCH_OFF:
      console.log("🥭", action.payload)
      return {
          ...state,
          fields: null
      }  
    default:
      return state;
  }
};

export default searchReducer;
