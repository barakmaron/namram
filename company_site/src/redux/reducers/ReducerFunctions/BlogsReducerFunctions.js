import ACTIONS from "../../actions/actionConstants/BlogsActionsConstants";

function GetBlogs(state, payload) {
    return {
        ...state,
        blogs: payload
    };
}

const BlogsReducerFunctions = {
    [ACTIONS.GET_BLOGS]: GetBlogs
};

export default BlogsReducerFunctions;