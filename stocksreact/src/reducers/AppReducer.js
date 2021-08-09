import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import StocksReducer from './StocksReducer';

export default combineReducers({
    LoginReducer,
    StocksReducer
})