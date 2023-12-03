import ApiMessagesConstants from "../../ApiMessagesConstants";
import SendApiRequest from "../../services/ApiService";
import ACTIONS from "./actionConstants/CategoriesActionConstants";
import { DispatchError } from "./ApiHandlerActions";

const GetCategory = (category) => ({
    type: ACTIONS.GET_CATEGORY,
    payload: [category]
});


export const GetCategoryAction = (id) => {
    return async (dispatch) => {
        try {            
            const category = await SendApiRequest(`/categories/${id}`);
            dispatch(GetCategory(category));
        } catch (err) {
            DispatchError(dispatch, err, ApiMessagesConstants.categories.getCategory.failed);
        }
    };
};