import ApiMessagesConstants from "../../../ApiMessagesConstants";
import Constants from "../../../Constants";
import SendApiRequest from "../../../services/ApiService";
import ACTIONS from "../actionConstants/Products/ScheduledServiceConstants";
import { DispatchError, Successful } from "../ApiHandlerActions";

const AddScheduledService = (product_id, category_id, form) => ({
    type: ACTIONS.ADD_SCHEDULED_SERVICE,
    payload: {
        product_id,
        category_id,
        form
    }
});

const UpdateScheduledService = (product_id, category_id, service) => ({
    type: ACTIONS.UPDATE_SCHEDULED_SERVICE,
    payload: {
        product_id,
        category_id,
        service
    }
});

const PatchScheduledService = (service_id, product_id, category_id, param, value) => ({
    type: ACTIONS.PATCH_SCHEDULED_SERVICE,
    payload: {
        service_id,
        product_id,
        category_id,
        param, 
        value
    }
});

const DeleteScheduledService = (service_id, product_id, category_id) => ({
    type: ACTIONS.DELETE_SCHEDULED_SERVICE,
    payload: {
        service_id,
        product_id,
        category_id
    }
});

export const AddScheduledServiceAction = (product_id, category_id, form) => {
    return async (dispatch) => {
        try {
            dispatch(AddScheduledService(product_id, category_id, form));
            const service = await SendApiRequest('/products/scheduled_services', Constants.API_METHODS.POST, {
                product_id,
                ...form
            });
            dispatch(UpdateScheduledService(product_id, category_id, service));
            dispatch(Successful(ApiMessagesConstants.product.ScheduledService.addService.successful));
        } catch (err) {
            dispatch(UpdateScheduledService(product_id, category_id, {}));
            DispatchError(dispatch, err, ApiMessagesConstants.product.ScheduledService.addService.failed);
        }
    };
};

export const PatchScheduledServiceAction = (service_id, product_id, category_id, param, value) => {
    return async (dispatch) => {
        try {
            dispatch(PatchScheduledService(service_id, product_id, category_id, param, value));
            await SendApiRequest(`/products/scheduled_services/${service_id}`, Constants.API_METHODS.PATCH, { 
                param, 
                value
            });
            dispatch(Successful(ApiMessagesConstants.product.ScheduledService.patchService.successful));
        } catch (err) {
            DispatchError(dispatch, err, ApiMessagesConstants.product.ScheduledService.patchService.failed);
        }
    };
};

export const DeleteScheduledServiceAction = (service_id, product_id, category_id) => {
    return async (dispatch) => {
        try {
            dispatch(DeleteScheduledService(service_id, product_id, category_id));
            await SendApiRequest(`/products/scheduled_services/${service_id}`, Constants.API_METHODS.DELETE);
            dispatch(Successful(ApiMessagesConstants.product.ScheduledService.deleteService.successful));
        } catch (err) {
            DispatchError(dispatch, err, ApiMessagesConstants.product.ScheduledService.deleteService.failed);
        }
    };
};