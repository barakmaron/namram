import { combineReducers } from "redux";
import userReducer from './userReducer';
import saleReducer from './saleReducer';

export default combineReducers({
    userReducer,
    saleReducer
});