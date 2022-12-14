import ApiMessagesConstants from "../../ApiMessagesConstants";
import Constants from "../../Constants";
import SendApiRequest from "../../services/ApiService";
import ACTIONS from "./actionConstants/StaticPageActionsConstants";
import { DispatchError, Successful } from "./ApiHandlerActions";

const InitStaticPageData = () => ({
    type: ACTIONS.INIT_STATIC_PAGES
});

const GetStaticPages = (data) => ({
    type: ACTIONS.GET_STATIC_PAGES,
    payload: data
});

const AddStaticPage = (form, category_id, page_route) => ({
    type: ACTIONS.ADD_STATIC_PAGE,
    payload: {
        ...form,
        CategoryId: category_id,
        PageRoute: page_route 
    }
});

const UpdateStaticPage = (static_page) => ({
    type: ACTIONS.UPDATE_STATIC_PAGE,
    payload: static_page
});

const DeleteStaticPage = (id) => ({
    type: ACTIONS.DELETE_STATIC_PAGE,
    payload: id
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

export const AddStaticPageAction = (form, category_id, page_route) => {
    return async (dispatch) => {
        try {
            dispatch(AddStaticPage(form, category_id, page_route));
            const static_page = await SendApiRequest(`/static_pages`, Constants.API_METHODS.POST, {
                ...form,
                CategoryId: category_id,
                PageRoute: page_route 
            });
            dispatch(UpdateStaticPage(static_page));
            dispatch(Successful(ApiMessagesConstants.static_page.addPage.successful));
        } catch (err) {
            dispatch(UpdateStaticPage());
            DispatchError(dispatch, err, ApiMessagesConstants.static_page.addPage.failed);
        }
    }
};

export const DeleteStaticPageAction = (id) => {
    return async (dispatch) => {
        try {
            dispatch(DeleteStaticPage(id));
            await SendApiRequest(`/static_pages/${id}`, Constants.API_METHODS.DELETE);
            dispatch(Successful(ApiMessagesConstants.static_page.deletePage.successful));
        } catch (err) {
            DispatchError(dispatch, err, ApiMessagesConstants.static_page.deletePage.failed);
        }
    }
}

export const InitStaticPageDataAction = () => {
    return dispatch => dispatch(InitStaticPageData());
}