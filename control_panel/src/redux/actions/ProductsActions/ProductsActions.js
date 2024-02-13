import ApiMessagesConstants from "../../../ApiMessagesConstants";
import Constants from "../../../Constants";
import SendApiRequest from "../../../services/ApiService";
import ACTIONS from "../actionConstants/Products/ProductsActionConstants";
import { DispatchError, Successful } from "../ApiHandlerActions";

const AddProduct = (category_id, form, temp_url, product_type) => ({
    type: ACTIONS.ADD_PRODUCT,
    payload: {
        category_id,
        form,
        temp_url,
        product_type
    }
});

const UpdateProduct = (product, category_id, product_type) => ({
    type: ACTIONS.UPDATE_PRODUCT,
    payload: {
        id: category_id,
        product,
        product_type
    }
});

const DeleteProduct = (category, product, product_type) => ({
    type: ACTIONS.DELETE_PRODUCT,
    payload: {
        product_id: product,
        category_id: category,
        product_type
    }
});


const changeProductCategory = (category, product, newCategory, product_type) => ({
    type: ACTIONS.CHANGE_PRODUCT_CATEGORY,
    payload: {
        product_id: product,
        category_id: category,
        newCategory,
        product_type
    }
});

const PatchProduct = (product_id, category_id, param_name, value, product_type) => ({
    type: ACTIONS.PATCH_PRODUCT,
    payload: {
        product_id,
        category_id,
        param_name,
        value,
        product_type
    }
});

export const AddProductAction = (category_id, form_data, temp_url, product_type) => {
    return async (dispatch) => {
        try {
            dispatch(AddProduct(category_id, form_data, temp_url, product_type));
            form_data.category_id = category_id;
            const product = await SendApiRequest(`/${product_type}/products`, Constants.API_METHODS.POST, form_data);
            dispatch(UpdateProduct(product, category_id, product_type));
            dispatch(Successful(ApiMessagesConstants.product.addProduct.successful));
        } catch (err) {
            dispatch(UpdateProduct({}, category_id, product_type));
            DispatchError(dispatch, err, ApiMessagesConstants.product.addProduct.failed);
        }
    };
};


export const DeleteProductAction = (category_id, product_id, product_type) => {
    return async (dispatch) => {
        try {
            dispatch(DeleteProduct(category_id, product_id, product_type));
            await SendApiRequest(`/${product_type}/products/${product_id}`, Constants.API_METHODS.DELETE);
            dispatch(Successful(ApiMessagesConstants.product.deleteProduct.successful));
        } catch (err) {
            DispatchError(dispatch, err, ApiMessagesConstants.product.deleteProduct.failed);
        }
    };
};

export const ChangeProductCategoryAction = (category_id, product_id, newCategory, product_type) => {
    return async (dispatch) => {
        try {
            dispatch(changeProductCategory(category_id, product_id, newCategory, product_type));
            await SendApiRequest(`/${product_type}/products/${product_id}`, Constants.API_METHODS.POST, { newCategory });
            dispatch(Successful(ApiMessagesConstants.product.deleteProduct.successful));
        } catch (err) {
            DispatchError(dispatch, err, ApiMessagesConstants.product.deleteProduct.failed);
        }
    };
};

export const PatchProductAction = (param_name, value, product_id, category_id, product_type) => {
    return async (dispatch) => {
        try {
            dispatch(PatchProduct(product_id, category_id, param_name, value, product_type));
            await SendApiRequest(`/${product_type}/products/${product_id}`, Constants.API_METHODS.PATCH, { param_name, value });
            dispatch(Successful(ApiMessagesConstants.product.patchProduct.successful));
        } catch (err) {
            DispatchError(dispatch, err, ApiMessagesConstants.product.patchProduct.failed);
        }
    };
};
