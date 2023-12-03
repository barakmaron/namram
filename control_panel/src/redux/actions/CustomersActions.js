import ApiMessagesConstants from "../../ApiMessagesConstants";
import Constants from "../../Constants";
import SendApiRequest from "../../services/ApiService";
import ACTIONS from "./actionConstants/CustomersActionsConstants";
import { Successful, DispatchError } from "./ApiHandlerActions";

const GetAllCustomers = (customers) => ({
    type: ACTIONS.GET_ALL_CUSTOMERS,
    payload: customers
});

const AddCustomer = (form) => ({
    type: ACTIONS.ADD_CUSTOMER,
    payload: form
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
            dispatch(GetAllCustomers([]));
            DispatchError(dispatch, err, ApiMessagesConstants.getCustomers.failed);
        }
    }
};

export const PatchCustomerAction = (customer_id, param_name, value) => {
    return async (dispatch) => {
        try {
            dispatch(PatchCustomer(customer_id, param_name, value));
            await SendApiRequest(`/customers/${customer_id}`, Constants.API_METHODS.PATCH, { param_name, value });
            dispatch(Successful(ApiMessagesConstants.customers.patchCustomer.successful));
        } catch (err) {
            DispatchError(dispatch, err, ApiMessagesConstants.customers.patchCustomer.failed);
        }
    }
}

export const DeleteCustomerAction = (customer_id) => {
    return async (dispatch) => {
        try {
            dispatch(DeleteCustomer(customer_id));
            await SendApiRequest(`/customers/${customer_id}`, Constants.API_METHODS.DELETE);
            dispatch(Successful(ApiMessagesConstants.customers.deleteCustomer.successful));
        } catch (err) {
            DispatchError(dispatch, err, ApiMessagesConstants.customers.deleteCustomer.failed);
        }
    }
}


export const AddCustomerAction = (form) => {
    return async (dispatch) => {
        try {
            dispatch(AddCustomer(form));
            const new_customer = await SendApiRequest(`/customers`, Constants.API_METHODS.POST, form);
            dispatch(Successful(ApiMessagesConstants.customers.addCustomer.successful));
            dispatch(AddCustomer(new_customer));
        } catch (err) {
            DispatchError(dispatch, err, ApiMessagesConstants.customers.addCustomer.failed);
        }
    }
}