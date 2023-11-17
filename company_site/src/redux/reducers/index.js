import { combineReducers } from "redux";
import categoriesReducer from './categoriesReducer';
import blogsReducer from './blogsReducer';
import projectsReducer from './projectsReducer';
import staticPagesReducer from './staticPagesReducer';
import apiHandlerReducer from './apiHandlerReducer';

export default combineReducers({
    apiHandlerReducer,
    categoriesReducer,
    blogsReducer,
    projectsReducer,
    staticPagesReducer
});