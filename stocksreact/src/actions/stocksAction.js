import axios from "axios";

export const GET_STOCK_NAMES_BEGIN = "GET_STOCK_NAMES_BEGIN";
export const GET_STOCK_NAMES_SUCCESS = "GET_STOCK_NAMES_SUCCESS";
export const GET_STOCK_NAMES_FAIL = "GET_STOCK_NAMES_FAIL";

export const GET_SINGLE_STOCK_BEGIN = "GET_SINGLE_STOCK_BEGIN";
export const GET_SINGLE_STOCK_SUCCESS = "GET_SINGLE_STOCK_SUCCESS";
export const GET_SINGLE_STOCK_FAIL = "GET_SINGLE_STOCK_FAIL";

export const SET_STOCK_TO_NULL = "SET_STOCK_TO_NULL";

export const getStockNamesBegin = () => ({
  type: GET_STOCK_NAMES_BEGIN,
});

export const getStockNamesSuccess = (data) => ({
  type: GET_STOCK_NAMES_SUCCESS,
  payload: data,
});

export const getStockNamesFail = (error) => ({
  type: GET_STOCK_NAMES_FAIL,
  payload: { error },
});

export const getSingleStockBegin = () => ({
  type: GET_SINGLE_STOCK_BEGIN,
});

export const getSingleStockSuccess = (data) => ({
  type: GET_SINGLE_STOCK_SUCCESS,
  payload: data,
});

export const getSingleStockFail = (error) => ({
  type: GET_SINGLE_STOCK_FAIL,
  payload: { error },
});

export const setStockToNull = () => ({
    type: SET_STOCK_TO_NULL
})

export const getStocksNames = () => {
  return (dispatch) => {
    dispatch(getStockNamesBegin());
    return axios
      .get("/stocks/stock_name")
      .then((res) => {
        const arr = res.data.result;
        const fin = arr.map((item) => ({
          id: item.SNo,
          name: item.Name,
        }));
        dispatch(getStockNamesSuccess(fin));
      })
      .catch((err) => {
        dispatch(getStockNamesFail(err));
      });
  };
};

export const getSingleStock = (data) => {
  return (dispatch) => {
    dispatch(getSingleStockBegin());
    return axios
      .post("/stocks/get_stock", data)
      .then((res) => {
        const doc = res.data.result[0];
        dispatch(getSingleStockSuccess(doc));
      })
      .catch((err) => {
        dispatch(getSingleStockFail(err));
      });
  };
};

export const setStock = () => {
    return dispatch => {
        dispatch(setStockToNull());
    }
}
