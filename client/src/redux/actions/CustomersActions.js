import Constants from "../../Constants";
import SendApiRequest from "../../services/ApiService";
import ACTIONS from "./actionConstants/CustomersActionsConstants";

const GetAllCustomers = (customers) => ({
    type: ACTIONS.GET_ALL_CUSTOMERS,
    payload: customers
});

const PatchCustomer = (customer_id, param_name, value) => ({
    type: ACTIONS.PATCH_CUSTOMER,
    payload: {
        id: customer_id,
        param_name,
        value
    }
});

const DeleteCustomer = (customer_id) => ({
    type: ACTIONS.DELETE_CUSTOMER,
    payload: customer_id
});

export const GetAllCustomersAction = () => {
    return async (dispatch) => {
        try {
            const customers = await SendApiRequest(`/customers`);
            dispatch(GetAllCustomers(customers));
        } catch (err) {

        }
    }
};

export const PatchCustomerAction = (customer_id, param_name, value) => {
    return async (dispatch) => {
        try {
            dispatch(PatchCustomer(customer_id, param_name, value));
            await SendApiRequest(`/customers/${customer_id}`, Constants.API_METHODS.PATCH, { param_name, value });
        } catch (err) {

        }
    }
}

export const DeleteCustomerAction = (customer_id) => {
    return async (dispatch) => {
        try {
            dispatch(DeleteCustomer(customer_id));
            await SendApiRequest(`/customers/${customer_id}`, Constants.API_METHODS.DELETE);
        } catch (err) {

        }
    }
}