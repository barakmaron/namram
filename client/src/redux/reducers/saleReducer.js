import ACTIONS from "../actions/actionConstants/saleActionConstants";

const initState = {
    categories: []
};

const reducer = (state = initState, action) => {
    const { type, payload } = action;
    switch(type) {
        case ACTIONS.GET_SALE: {
            return { 
                ...state, 
                categories: payload 
            };
        }
        default: {
            return state;
        }
    }
};

export default reducer;