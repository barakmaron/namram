import ApiMessagesConstants from "../../ApiMessagesConstants";
import SendApiRequest from "../../services/ApiService";
import ACTIONS from "./actionConstants/BlogsActionsConstants";
import { DispatchError } from "./ApiHandlerActions";

const GetBlogs = (blogs) => ({
    type: ACTIONS.GET_BLOGS,
    payload: blogs
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
