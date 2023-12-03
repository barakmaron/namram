import ApiMessagesConstants from "../../ApiMessagesConstants";
import SendApiRequest from "../../services/ApiService";
import ACTIONS from "./actionConstants/StaticPageActionsConstants";
import { DispatchError } from "./ApiHandlerActions";

const InitStaticPageData = () => ({
    type: ACTIONS.INIT_STATIC_PAGES
});

const GetStaticPages = (data) => ({
    type: ACTIONS.GET_STATIC_PAGES,
    payload: data
});

export const GetStaticPagesAction = () => {
    return async (dispatch) => {
        try {
            const data = await SendApiRequest(`/static_pages`);
            dispatch(GetStaticPages(data));
        } catch (err) {
            DispatchError(dispatch, err, ApiMessagesConstants.static_page.getPages.failed);
        }
    }
}


export const GetStaticPageDataPerPageAction = (page_route) => {
    return async (dispatch) => {
        try {
            const data = await SendApiRequest(`/static_pages?route=${page_route}`);
            dispatch(GetStaticPages(data));
        } catch (err) {
            DispatchError(dispatch, err, ApiMessagesConstants.static_page.getPage.failed);
        }
    }
}

export const InitStaticPageDataAction = () => {
    return dispatch => dispatch(InitStaticPageData());
}