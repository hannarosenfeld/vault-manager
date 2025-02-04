const ADD_RACK = 'rack/ADD_RACK';
const GET_ALL_RACKS = 'rack/GET_ALL_RACKS';
const DELETE_RACK = 'rack/DELETE_RACK';

export const getAllRacks = (racks) => ({
  type: GET_ALL_RACKS,
  racks,
});

export const addRackAction = (rackData) => ({
  type: ADD_RACK,
  payload: rackData,
});

export const deleteRackAction = (rackId) => ({
  type: DELETE_RACK,
  payload: rackId,
});

export const getAllRacksThunk = (warehouseId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/rack/${warehouseId}`);
    if (response.ok) {
      const data = await response.json();
      dispatch(getAllRacks(data));
      return data;
    } else {
      const errorData = await response.json();
      console.error('Error fetching racks:', errorData.errors);
      return errorData;
    }
  } catch (error) {
    console.error('Error fetching racks:', error);
    return error;
  }
};

export const addRackThunk = (warehouseId, rackData) => async (dispatch) => {
  try {
    const response = await fetch(`/api/rack/${warehouseId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rackData),
    });

    if (response.ok) {
      const newRack = await response.json();
      dispatch(addRackAction(newRack));
      return newRack;
    } else {
      const errorData = await response.json();
      console.error('Error adding rack:', errorData.errors);
      return errorData;
    }
  } catch (error) {
    console.error('Error adding rack:', error);
    return error;
  }
};

export const deleteRackThunk = (rackId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/rack/${rackId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      dispatch(deleteRackAction(rackId));
      return rackId;
    } else {
      const errorData = await response.json();
      console.error('Error deleting rack:', errorData.errors);
      return errorData;
    }
  } catch (error) {
    console.error('Error deleting rack:', error);
    return error;
  }
};


const initialState = {};

const rackReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_ALL_RACKS:
      const racks = action.racks;
      console.log("❤️‍🔥 racks in reducer: ", racks)
      racks.forEach((rack) => {
        newState[rack.id] = rack;
      });
      return newState;
    case ADD_RACK:
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    case DELETE_RACK:
      delete newState[action.payload]; // Remove the rack by ID
      return newState;
    default:
      return state;
  }
};

export default rackReducer;
