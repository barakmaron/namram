import ApiMessagesConstants from "../../ApiMessagesConstants";
import Constants from "../../Constants"
import SendApiRequest from "../../services/ApiService"
import { Successful, DispatchError } from "./ApiHandlerActions";

export const SendContactForm = (form) => {
    return async (dispatch) => {
        try {
            await SendApiRequest(`/contact`, Constants.API_METHODS.POST, form);
            dispatch(Successful(ApiMessagesConstants.contact.successful));
        } catch (err) {
            DispatchError(dispatch, err, ApiMessagesConstants.contact.failed)
        }
    }
}