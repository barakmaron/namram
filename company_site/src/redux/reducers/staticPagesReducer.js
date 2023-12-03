import ACTIONS from "../actions/actionConstants/StaticPageActionsConstants";
import StaticPageReducerFunctions from "./ReducerFunctions/StaticPageReducerFunctions";

const initState = {
    static_pages: []
};

const reducer = (state = initState, action) => {
    const { type, payload } = action;
    switch(type) {
        case ACTIONS.INIT_STATIC_PAGES: {
            return initState;
        }
        case ACTIONS.GET_STATIC_PAGES:  {
           return StaticPageReducerFunctions[type](state, payload);
        }
        default: {
            return state;
        }
    }
};

export default reducer;