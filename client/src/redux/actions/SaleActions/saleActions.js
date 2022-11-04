import SendApiRequest from "../../../services/ApiService";
import ACTIONS from "../actionConstants/sale/saleActionConstants";

const GetSale = (data) => ({
    type: ACTIONS.GET_SALE,
    payload: data
});

export const GetSaleAction = () => {
    return async (dispatch) => {
        try {
            const categories = await SendApiRequest('/sale');
            dispatch(GetSale(categories));
        } catch(err) {

        }
    }
}