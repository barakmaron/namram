import { combineReducers } from "redux";
import userReducer from './userReducer';
import categoriesReducer from './categoriesReducer';
import rentalAgreementsReducer from './rentalAgreementsReducer';
import customersReducer from './customersReducer';
import serviceReducer from './serviceReducer';

export default combineReducers({
    userReducer,
    categoriesReducer,
    rentalAgreementsReducer,
    customersReducer,
    serviceReducer
});