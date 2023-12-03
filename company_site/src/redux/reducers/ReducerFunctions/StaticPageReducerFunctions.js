import ACTIONS from "../../actions/actionConstants/StaticPageActionsConstants";

function GetStaticPages(state, payload) {
    return {
        ...state,
        static_pages: payload
    };
}

const StaticPageReducerFunctions = {
    [ACTIONS.GET_STATIC_PAGES]: GetStaticPages
};

export default StaticPageReducerFunctions;