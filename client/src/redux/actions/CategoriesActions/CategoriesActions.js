import ApiMessagesConstants from "../../../ApiMessagesConstants";
import Constants from "../../../Constants";
import SendApiRequest from "../../../services/ApiService";
import ACTIONS from "../actionConstants/Categories/CategoriesActionConstants";
import { DispatchError, Successful } from "../ApiHandlerActions";

const GetCategory = (category) => ({
    type: ACTIONS.GET_CATEGORY,
    payload: [category]
});

const AddCategory = (form_data, temp_url, product_type) => ({
    type: ACTIONS.ADD_CATEGORY,
    payload: {
        form_data,
        temp_url,
        product_type
    }
});

const UpdateCategory = (category, product_type) => ({
    type: ACTIONS.UPDATE_CATEGORY,
    payload: {
        category,
        product_type
    }
});

const DeleteCategory = (id, product_type) => ({
    type: ACTIONS.DELETE_CATEGORY,
    payload: {
        id, 
        product_type
    }
});

const EditCategory = (id, name, product_type) => ({
    type: ACTIONS.EDIT_CATEGORY,
    payload: {
        id,
        name,
        product_type
    }
});

export const AddCategoryAction = (form_data, temp_url, product_type) => {
    return async (dispatch) => {
        try {
            dispatch(AddCategory(form_data, temp_url, product_type));
            const category = await SendApiRequest(`/${product_type}/categories`, Constants.API_METHODS.POST, form_data);
            dispatch(UpdateCategory(category));
            dispatch(Successful(ApiMessagesConstants.categories.addCategory.successful));
        } catch (err) {
            dispatch(UpdateCategory());
            DispatchError(dispatch, err, ApiMessagesConstants.categories.addCategory.failed);
        }
    };
};

export const DeleteCategoryAction = (id, product_type) => {
    return async (dispatch) => {
        try {
            dispatch(DeleteCategory(id, product_type));
            await SendApiRequest(`/${product_type}/categories/${id}`, Constants.API_METHODS.DELETE);
            dispatch(Successful(ApiMessagesConstants.categories.deleteCategory.successful));
        } catch (err) {
            DispatchError(dispatch, err, ApiMessagesConstants.categories.deleteCategory.failed);
        }
    };
};

export const EditCategoryAction = (id, form, product_type) => {
    return async (dispatch) => {
        try {
            dispatch(EditCategory(id, form.name, product_type));
            await SendApiRequest(`/${product_type}/categories/${id}`, Constants.API_METHODS.PATCH, form);
            dispatch(Successful(ApiMessagesConstants.categories.editCategory.successful));
        } catch (err) {
            DispatchError(dispatch, err, ApiMessagesConstants.categories.editCategory.failed);
        }
    };
};

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