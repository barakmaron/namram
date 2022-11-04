import Constants from "../../../Constants";
import SendApiRequest from "../../../services/ApiService";
import ACTIONS from "../actionConstants/sale/saleCategoriesActionConstants";

const AddCategory = (form_data, temp_url) => ({
    type: ACTIONS.ADD_CATEGORY,
    payload: {
        form_data,
        temp_url
    }
});

const UpdateCategory = (category) => ({
    type: ACTIONS.UPDATE_CATEGORY,
    payload: {
        category
    }
});

const DeleteCategory = (id) => ({
    type: ACTIONS.DELETE_CATEGORY,
    payload: id
});

const EditCategory = (id, name) => ({
    type: ACTIONS.EDIT_CATEGORY,
    payload: {
        id: id,
        name: name
    }
});

export const AddCategoryAction = (form_data, temp_url) => {
    return async (dispatch) => {
        try {
            dispatch(AddCategory(form_data, temp_url));
            const category = await SendApiRequest('/sale/categories', Constants.API_METHODS.POST, form_data);
            dispatch(UpdateCategory(category));
        } catch (err) {

        }
    };
};

export const DeleteCategoryAction = (id) => {
    return async (dispatch) => {
        try {
            dispatch(DeleteCategory(id));
            await SendApiRequest(`/sale/categories/${id}`, Constants.API_METHODS.DELETE);
        } catch (err) {

        }
    };
};

export const EditCategoryAction = (id, form) => {
    return async (dispatch) => {
        try {
            dispatch(EditCategory(id, form.name));
            await SendApiRequest(`/sale/categories/${id}`, Constants.API_METHODS.PATCH);
        } catch (err) {

        }
    };
};
