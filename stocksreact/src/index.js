import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import AppReducer from "./reducers/AppReducer";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import Axios from "axios";
import { ToastContainer } from "react-toastify";

const store = createStore(AppReducer, applyMiddleware(thunk));

Axios.defaults.baseURL = `http://localhost:${process.env.REACT_APP_PORT || 6060}`;

Axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("stocks_token");
  config.headers.Authorization = "Bearer " + token;
  return config;
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
