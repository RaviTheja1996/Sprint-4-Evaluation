import { USER_LOGIN, USER_LOGOUT } from "./actionTypes";

const initialState = {
  isAuth: false,
  userData: {},
  posts: []
}

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_LOGIN:
      {
        return { ...state, isAuth: true, userData: payload };
      }
    case USER_LOGOUT:
      {
        return initialState;
      }
    default:
      {
        return state;
      }
  }
}

export default reducer;