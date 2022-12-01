import ApiMessagesConstants from "../../ApiMessagesConstants";
import ACTIONS from "./actionConstants/apiHandlerActionsConstants";

export const Successful = (message) => ({
    type: ACTIONS.SUCCESSFUL,
    payload: message
});

export const InitApiHandlerAction = () => ({
    type: ACTIONS.INIT_API_HANDLER
});

const Failed = (message) => ({
    type: ACTIONS.FAILED,
    payload: message
})

const FailedWithForm = (errors, message) => ({
    type: ACTIONS.FAILED_WITH_FORM,
    payload: {
        errors,
        message
    }
});

export const DispatchError = (dispatch, err, message) => {
    if(err.response.status === 400)
        dispatch(FailedWithForm(err.response.data.errors, message));
    else 
        dispatch(Failed(ApiMessagesConstants.server_error));
};