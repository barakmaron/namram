import ACTIONS from "../../actions/actionConstants/CustomersActionsConstants";
import reducerUtilities from "../reducerUtilities";

function GetAllCustomers(state, payload) {
    return {
        ...state,
        customers: payload
    };
}

function PatchCustomer(state, payload) {
    const { id, param_name, value } = payload
    const { object: customer, filtered_array: filtered_customers } = reducerUtilities.destructorArray(state.customers, id);
    customer[param_name] = value;
    return {
        ...state,
        customers: [ 
            ...filtered_customers,
            customer
        ]
    };
}

function DeleteCustomer (state, payload) {
    const { filtered_array: filtered_customers } = reducerUtilities.destructorArray(state.customers, payload);
    return {
        ...state,
        customers: [ 
            ...filtered_customers
        ]
    };
}

const CustomerReducerFunctions = {
    [ACTIONS.GET_ALL_CUSTOMERS]: GetAllCustomers,
    [ACTIONS.PATCH_CUSTOMER]: PatchCustomer,
    [ACTIONS.DELETE_CUSTOMER]: DeleteCustomer
};

export default CustomerReducerFunctions;