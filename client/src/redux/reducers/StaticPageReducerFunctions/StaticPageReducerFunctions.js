import ACTIONS from "../../actions/actionConstants/StaticPageActionsConstants";
import reducerUtilities from "../reducerUtilities";

function GetStaticPages(state, payload) {
    return {
        ...state,
        static_pages: payload
    };
}

function AddStaticPage(state, payload) {
    return {
        ...state,
        static_pages: [
            ...state.static_pages,
            payload
        ]
    };
}


function UpdateStaticPage(state, payload) {
    const { filtered_array: static_pages_data } = reducerUtilities.destructorArray(state.static_pages);
    return {
        ...state,
        static_pages: [
            ...static_pages_data,
            payload
        ]
    };
}



function DeleteStaticPage(state, payload) {
    const { filtered_array: static_pages_data } = reducerUtilities.destructorArray(state.static_pages, payload);
    return {
        ...state,
        static_pages: [
            ...static_pages_data
        ]
    };
}


const StaticPageReducerFunctions = {
    [ACTIONS.GET_STATIC_PAGES]: GetStaticPages,
    [ACTIONS.ADD_STATIC_PAGE]: AddStaticPage,
    [ACTIONS.UPDATE_STATIC_PAGE]: UpdateStaticPage,
    [ACTIONS.DELETE_STATIC_PAGE]: DeleteStaticPage
};

export default StaticPageReducerFunctions;