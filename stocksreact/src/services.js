import history from "./history";

export const AuthService = () => {
  const token = localStorage.getItem("stocks_token");
  if (token) {
    return true;
  } else {
    return false;
  }
};

export const logout = () => {
  localStorage.removeItem("stocks_token");
  history.push("");
  window.location.reload();
};
