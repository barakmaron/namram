import ACTIONS from "../actions/actionConstants/CustomersActionsConstants";
import CustomerReducerFunctions from "./CustomerReducerFunctions/CustomerReducerFunctions";

const iniState = {
    customers: []
};

const reducer = (state = iniState, action) => {
    const { type, payload } = action;
    switch(type) {
        case ACTIONS.GET_ALL_CUSTOMERS: 
        case ACTIONS.PATCH_CUSTOMER: 
        case ACTIONS.DELETE_CUSTOMER: {
           return CustomerReducerFunctions[type](state, payload);
        }
        default: {
            return state;
        }
    }
};

export default reducer;