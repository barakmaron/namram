import Constants from "../../../Constants";
import SendApiRequest from "../../../services/ApiService";
import ACTIONS from "../actionConstants/Products/PropsActionConstants";

const PatchProductProps = (prop_id, name, value) => ({
    type: ACTIONS.PATCH_PRODUCT_PROP,
    payload: {
        prop_id,
        name,
        value
    }
});

export const PatchProductPropsAction = (prop_id, name, value) => {
    return async (dispatch) => {
        try {
            dispatch(PatchProductProps(prop_id, name, value));
            await SendApiRequest(`/products/props/${prop_id}`, Constants.API_METHODS.PATCH, { name, value });
        } catch (err) {

        }
    };
};