const GET_USER = "user/GET_USER"

const getUserAction = (user) => ({
    type: GET_USER,
    user
})

export const getUserThunk = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}`)
    if (res.ok) {
        const data = await res.json()
        await dispatch(getUserAction(data))
        return data
    } else {
        const err = await res.json()
        return err
    }
}

const initialState = {
    users: {},
    currentUser: {}
  };

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER:
            return {
                ...state,
                users: {
                ...state.users,
                [action.user.userId]: action.user,
                currentUser: action.user
            },
        };
        default:
            return state;
    }
}

export default userReducer;