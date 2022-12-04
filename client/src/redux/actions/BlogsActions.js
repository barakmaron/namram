import ApiMessagesConstants from "../../ApiMessagesConstants";
import Constants from "../../Constants";
import SendApiRequest from "../../services/ApiService";
import ACTIONS from "./actionConstants/BlogsActionsConstants";
import { DispatchError, Successful } from "./ApiHandlerActions";

const GetBlogs = (blogs) => ({
    type: ACTIONS.GET_BLOGS,
    payload: blogs
});

const AddBlog = (form, temp_url) => ({
    type: ACTIONS.ADD_BLOG,
    payload: {
        ...form,
        TempUrl: temp_url[0]
    }
});

const UpdateBlog = (blog) => ({
    type: ACTIONS.UPDATE_BLOG,
    payload: blog
});

const DeleteBlog = (blog_id) => ({
    type: ACTIONS.DELETE_BLOG,
    payload: blog_id
});

const EditBlog = (blog_id, title, text) => ({
    type: ACTIONS.PATCH_BLOG,
    payload: {
        blog_id,
        title,
        text
    }
});

export const GetBlogsAction = () => {
    return async(dispatch) => {
        try {
            const blogs = await SendApiRequest('/blogs');
            dispatch(GetBlogs(blogs));
        } catch (err) {
            DispatchError(dispatch, err, ApiMessagesConstants.blogs.getBlogs.failed);
        }
    }
};

export const AddBlogAction = (form, temp_image) => {
    return async(dispatch) => {        
        try {
            dispatch(AddBlog(Object.fromEntries(form), temp_image));
            const blog = await SendApiRequest('/blogs', Constants.API_METHODS.POST, form);
            dispatch(Successful(ApiMessagesConstants.blogs.addBlog.successful));
            dispatch(UpdateBlog(blog));
        } catch (err) {
            dispatch(UpdateBlog());
            DispatchError(dispatch, err, ApiMessagesConstants.blogs.addBlog.failed);
        }
    }
};

export const DeleteBlogAction = (blog_id) => {
    return async(dispatch) => {
        try {
            dispatch(DeleteBlog(blog_id));
            await SendApiRequest(`/blogs/${blog_id}`, Constants.API_METHODS.DELETE);
            dispatch(Successful(ApiMessagesConstants.blogs.deleteBlog.successful));
        } catch (err) {
            DispatchError(dispatch, err, ApiMessagesConstants.blogs.deleteBlog.failed);
        }
    }
};

export const EditBlogAction = (blog_id, title, text) => {
    return async(dispatch) => {
        try {
            dispatch(EditBlog(blog_id, title, text));
            await SendApiRequest(`/blogs/${blog_id}`, Constants.API_METHODS.PATCH, {
                Title: title,
                Text: text
            });            
            dispatch(Successful(ApiMessagesConstants.blogs.patchBlog.successful));
        } catch (err) {
            DispatchError(dispatch, err, ApiMessagesConstants.blogs.patchBlog.failed);
        }
    }
};