import ACTIONS from "../actions/actionConstants/BlogsActionsConstants";
import reducerUtilities from "./reducerUtilities";

const initState = {
    blogs: []
};

const reducer = (state = initState, action) => {
    const { type, payload } = action;
    switch(type) {
        case ACTIONS.GET_BLOGS: {
            return {
                ...state,
                blogs: payload
            };
        }
        case ACTIONS.ADD_BLOG: {
            return {
                ...state,
                blogs: [
                    ...state.blogs, {
                        ...payload
                    }
                ]
            };
        }
        case ACTIONS.UPDATE_BLOG: {
            const { filtered_array: filtered_blogs } = reducerUtilities.destructorArray(state.blogs);
            return {
                ...state,
                blogs: [
                    ...filtered_blogs,
                    payload
                ]
            };
        }
        case ACTIONS.PATCH_BLOG: {
            const { blog_id, title, text } = payload;
            const { object: blog, filtered_array: filtered_blogs } = reducerUtilities.destructorArray(state.blogs, blog_id);
            blog.Title = title;
            blog.Text = text;
            return {
                ...state,
                blogs: [
                    ...filtered_blogs,
                    blog
                ]
            };
        }
        case ACTIONS.DELETE_BLOG: {
            const { filtered_array: filtered_blogs } = reducerUtilities.destructorArray(state.blogs, payload);
            return {
                ...state,
                blogs: [
                    ...filtered_blogs
                ]
            };
        }
        default: {
            return state;
        }
    }
};

export default reducer;