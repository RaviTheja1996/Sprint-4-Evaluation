import { USER_LOGIN, USER_LOGOUT } from "./actionTypes";

export const login = (email, password, dispatch) => {
  const payload = { email, password };
  fetch("https://dull-ruby-crane-ring.cyclic.app/users/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(payload)
  }).then((res) => res.json())
    .then((data) => {
      console.log(data);
      dispatch({ type: USER_LOGIN, payload: data });
    })
    .catch((err) => console.log(err.message));
}

export const logout = (dispatch) => {
  dispatch({ type: USER_LOGOUT });
}