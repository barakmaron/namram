import ApiMessagesConstants from "../../ApiMessagesConstants";
import SendApiRequest from "../../services/ApiService";
import ACTIONS from "./actionConstants/rentActionConstants";
import { DispatchError } from "./ApiHandlerActions";

const GetRent = (categories) => ({
    type: ACTIONS.GET_RENT,
    payload: categories
});

export const GetRentOnlyAvailableAction = () => {
    return async (dispatch) => {
        try {
            const categories = await SendApiRequest(`/rent?available=true`);
            dispatch(GetRent(categories));
        } catch (err) {
            DispatchError(dispatch, err, ApiMessagesConstants.rent.failed);
        }
    }
};

export const GetRentAction = () => {
    return async (dispatch) => {
        try {
            const categories = await SendApiRequest(`/rent`);
            dispatch(GetRent(categories));
        } catch (err) {
            DispatchError(dispatch, err, ApiMessagesConstants.rent.failed);
        }
    }
};