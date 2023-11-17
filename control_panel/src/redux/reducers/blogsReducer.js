import ACTIONS from "../actions/actionConstants/BlogsActionsConstants";
import BlogsReducerFunctions from "./BlogsReducerFunctions/BlogsReducerFunctions";

const initState = {
    blogs: []
};

const reducer = (state = initState, action) => {
    const { type, payload } = action;
    switch(type) {
        case ACTIONS.GET_BLOGS: 
        case ACTIONS.ADD_BLOG: 
        case ACTIONS.UPDATE_BLOG: 
        case ACTIONS.PATCH_BLOG: 
        case ACTIONS.DELETE_BLOG: {
            return BlogsReducerFunctions[type](state, payload);
        }
        default: {
            return state;
        }
    }
};

export default reducer;