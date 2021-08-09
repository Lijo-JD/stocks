import {
  LOGIN_ACTION_BEGIN,
  LOGIN_ACTION_FAIL,
  LOGIN_ACTION_SUCCESS,
} from "../actions/loginAction";

const initstate = {
  loading: false,
  loginResponse: null,
  error: null,
};

const LoginReducer = (state = initstate, action) => {
  console.log(action);
  switch (action.type) {
    case LOGIN_ACTION_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_ACTION_SUCCESS:
      return {
        ...state,
        loading: false,
        loginResponse: action.payload,
      };
    case LOGIN_ACTION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default LoginReducer;
