import ACTIONS from "../actions/actionConstants/StaticPageActionsConstants";
import reducerUtilities from "./reducerUtilities";

const initState = {
    static_pages: []
};

const reducer = (state = initState, action) => {
    const { type, payload } = action;
    switch(type) {
        case ACTIONS.GET_STATIC_PAGES: {
            return {
                ...state,
                static_pages: payload
            };
        }
        case ACTIONS.ADD_STATIC_PAGE: {
            return {
                ...state,
                static_pages: [
                    ...state.static_pages,
                    payload
                ]
            };
        }
        case ACTIONS.UPDATE_STATIC_PAGE: {
            const { filtered_array: static_pages_data } = reducerUtilities.destructorArray(state.static_pages);
            return {
                ...state,
                static_pages: [
                    ...static_pages_data,
                    payload
                ]
            };
        }
        case ACTIONS.DELETE_STATIC_PAGE: {
            const { filtered_array: static_pages_data } = reducerUtilities.destructorArray(state.static_pages, payload);
            return {
                ...state,
                static_pages: [
                    ...static_pages_data
                ]
            };
        }
        default: {
            return state;
        }
    }
};

export default reducer;