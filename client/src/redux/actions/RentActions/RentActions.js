import SendApiRequest from "../../../services/ApiService";
import ACTIONS from "../actionConstants/rent/rentActionConstants";

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

        }
    }
};

export const GetRentAction = () => {
    return async (dispatch) => {
        try {
            const categories = await SendApiRequest(`/rent`);
            dispatch(GetRent(categories));
        } catch (err) {

        }
    }
};