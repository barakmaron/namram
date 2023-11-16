import ApiMessagesConstants from "../../../ApiMessagesConstants";
import Constants from "../../../Constants";
import SendApiRequest from "../../../services/ApiService";
import ACTIONS from "../actionConstants/ServiceActionsConstants/ServicePartsActionsConstants";
import { DispatchError, Successful } from "../ApiHandlerActions";

const AddChangedPart = (service_report, part) => ({
    type: ACTIONS.ADD_CHANGED_PART,
    payload: {
        service_report_id: service_report,
        part: part
    }
});

const UpdateChangedPart = (service_report, part) => ({
    type: ACTIONS.UPDATE_CHANGED_PART,
    payload: {
        service_report_id: service_report,
        part: part
    }
});

const DeleteChangedPart = (service_report, part_id) => ({
    type: ACTIONS.DELETE_CHANGED_PART,
    payload: {
        service_report_id: service_report,
        part_id: part_id
    }
})

export const AddChangedPartAction = (service_report, part) => {
    return async (dispatch) => {
        try {
            dispatch(AddChangedPart(service_report, part));
            const part_from_server = await SendApiRequest(`/service_reports/${service_report}/part_changed`, Constants.API_METHODS.POST, { part_id: part.id });
            dispatch(UpdateChangedPart(service_report, part_from_server));
            dispatch(Successful(ApiMessagesConstants.product.sparePart.addPart.successful));
        } catch (err) {
            dispatch(UpdateChangedPart(service_report, {}));
            DispatchError(dispatch, err, ApiMessagesConstants.product.sparePart.addPart.failed);
        }
    }
};

export const DeleteChangedPartAction = (service_report, part_id) => {
    return async (dispatch) => {
        try {
            dispatch(DeleteChangedPart(service_report, part_id));
            await SendApiRequest(`/service_reports/${service_report}/part_changed/${part_id}`, Constants.API_METHODS.DELETE);
            dispatch(Successful(ApiMessagesConstants.product.sparePart.deletePart.successful));
        } catch (err) {
            DispatchError(dispatch, err, ApiMessagesConstants.product.sparePart.deletePart.failed);
        }
    }
}