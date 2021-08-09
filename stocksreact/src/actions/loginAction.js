import axios from "axios";

export const LOGIN_ACTION_BEGIN = "LOGIN_ACTION_BEGIN";
export const LOGIN_ACTION_SUCCESS = "LOGIN_ACTION_SUCCESS";
export const LOGIN_ACTION_FAIL = "LOGIN_ACTION_FAIL";

export const loginBegin = () => ({
  type: LOGIN_ACTION_BEGIN,
});

export const loginSuccess = (data) => ({
  type: LOGIN_ACTION_SUCCESS,
  payload: data,
});

export const loginFail = (error) => ({
  type: LOGIN_ACTION_FAIL,
  payload: { error },
});

export const loginMethodAction = (data) => {
  return (dispatch) => {
    dispatch(loginBegin());
    return axios
      .post("/login", data)
      .then((res) => {
        dispatch(loginSuccess(res));
      })
      .catch((err) => {
        dispatch(loginFail(err));
      });
  };
};
