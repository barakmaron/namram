import ACTIONS from "../actions/actionConstants/BlogsActionsConstants";
import BlogsReducerFunctions from "./ReducerFunctions/BlogsReducerFunctions";

const initState = {
    blogs: []
};

const reducer = (state = initState, action) => {
    const { type, payload } = action;
    switch(type) {
        case ACTIONS.GET_BLOGS: {
            return BlogsReducerFunctions[type](state, payload);
        }
        default: {
            return state;
        }
    }
};

export default reducer;