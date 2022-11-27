import ACTIONS from "../../actions/actionConstants/BlogsActionsConstants";
import reducerUtilities from "../reducerUtilities";

function AddBlog(state, payload) {
    return {
        ...state,
        blogs: [
            ...state.blogs, {
                ...payload
            }
        ]
    };
}

function UpdateBlog(state, payload) {
    const { filtered_array: filtered_blogs } = reducerUtilities.destructorArray(state.blogs);
    return {
        ...state,
        blogs: [
            ...filtered_blogs,
            payload
        ]
    };
}

function PatchBlog(state, payload) {
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

function DeleteBlog(state, payload) {
    const { filtered_array: filtered_blogs } = reducerUtilities.destructorArray(state.blogs, payload);
    return {
        ...state,
        blogs: [
            ...filtered_blogs
        ]
    };
}

function GetBlogs(state, payload) {
    return {
        ...state,
        blogs: payload
    };
}

const BlogsReducerFunctions = {
    [ACTIONS.ADD_BLOG]: AddBlog,
    [ACTIONS.UPDATE_BLOG]: UpdateBlog,
    [ACTIONS.PATCH_BLOG]: PatchBlog,
    [ACTIONS.DELETE_BLOG]: DeleteBlog,
    [ACTIONS.GET_BLOGS]: GetBlogs
};

export default BlogsReducerFunctions;