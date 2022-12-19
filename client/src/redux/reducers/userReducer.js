import ACTIONS from "../actions/actionConstants/UserActionsConstants";

const initState = {
    logged_in: false
};

const reducer = (state = initState, action) => {
    const { type } = action;
    switch(type) {
        case ACTIONS.LOGIN: {
            return { logged_in: true };
        }
        case ACTIONS.LOGOUT: {
            return { logged_in: false };
        }
        default: {
            return state;
        }
    }
};

export default reducer;