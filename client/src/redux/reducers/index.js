import { combineReducers } from "redux";
import userReducer from './userReducer';
import categoriesReducer from './categoriesReducer';
import rentalAgreementsReducer from './rentalAgreementsReducer';
import customersReducer from './customersReducer';
import serviceReducer from './serviceReducer';
import blogsReducer from './blogsReducer';
import projectsReducer from './projectsReducer';
import staticPagesReducer from './staticPagesReducer';
import apiHandlerReducer from './apiHandlerReducer';

export default combineReducers({
    userReducer,
    apiHandlerReducer,
    categoriesReducer,
    rentalAgreementsReducer,
    customersReducer,
    serviceReducer,
    blogsReducer,
    projectsReducer,
    staticPagesReducer
});