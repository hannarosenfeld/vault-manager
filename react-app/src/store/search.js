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
  console.log("🎄 in thunk", item, type)
  try {
    let res = await fetch(`/api/search/${type}/${item.id}`)
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
  fields: null
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_ON:
      console.log("🌈 search in reducer: ", action.payload)
        return {
            ...state,
            fields: action.payload
        }
    case SEARCH_OFF:
      return {
          ...state,
          fields: null
      }  
    default:
      return state;
  }
};

export default searchReducer;
