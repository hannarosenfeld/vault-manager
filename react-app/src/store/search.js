// store/search.js

export const SEARCH_ON = 'search/SEARCH_ON';
export const SEARCH_OFF = 'search/SEARCH_OFF';

export const setSearchOnAction = (item) => ({
  type: SEARCH_ON,
  item
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

const initialState = {
  search: null
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_ON:
        console.log("🥭", action.item)
        return {
            ...state,
            search: action.item
        }
    default:
      return state;
  }
};

export default searchReducer;
