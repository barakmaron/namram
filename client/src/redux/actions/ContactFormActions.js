import Constants from "../../Constants"
import SendApiRequest from "../../services/ApiService"

export const SendContactForm = (form) => {
    return async (dispatch) => {
        try {
            const contact = await SendApiRequest(`/contact`, Constants.API_METHODS.POST, form);
            
        } catch (err) {

        }
    }
}