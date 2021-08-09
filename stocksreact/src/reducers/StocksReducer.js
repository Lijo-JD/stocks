import {
  GET_SINGLE_STOCK_BEGIN,
  GET_SINGLE_STOCK_FAIL,
  GET_SINGLE_STOCK_SUCCESS,
  GET_STOCK_NAMES_BEGIN,
  GET_STOCK_NAMES_FAIL,
  GET_STOCK_NAMES_SUCCESS,
  SET_STOCK_TO_NULL
} from "../actions/stocksAction";

const initstate = {
  loading: false,
  loadingStock: false,
  error: null,
  stockNames: [],
  singleStock: null,
};

const StocksReducer = (state = initstate, action) => {
  console.log(action);
  switch (action.type) {
    case GET_STOCK_NAMES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_STOCK_NAMES_SUCCESS:
      return {
        ...state,
        loading: false,
        stockNames: action.payload,
      };
    case GET_STOCK_NAMES_FAIL:
      return {
        ...state,
        loading: false,
        stockNames: [],
        error: action.payload.error,
      };
    case GET_SINGLE_STOCK_BEGIN:
      return {
        ...state,
        loadingStock: true,
        error: null,
      };
    case GET_SINGLE_STOCK_SUCCESS:
      return {
        ...state,
        loadingStock: false,
        singleStock: action.payload,
      };
    case GET_SINGLE_STOCK_FAIL:
      return {
        ...state,
        loadingStock: false,
        singleStock: null,
        error: action.payload.error,
      };
    case SET_STOCK_TO_NULL: 
      return {
          ...state,
          singleStock: null
      }
    default:
      return state;
  }
};

export default StocksReducer;
