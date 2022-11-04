import Constants from "../../../Constants";
import SendApiRequest from "../../../services/ApiService";
import ACTIONS from "../actionConstants/sale/SaleProductsActionConstants";

const AddProduct = (category_id, form, temp_url) => ({
    type: ACTIONS.ADD_PRODUCT,
    payload: {
        category_id,
        form,
        temp_url
    }   
});

const UpdateProduct = (product) => ({
    type: ACTIONS.UPDATE_PRODUCT,
    payload: {
        product
    }
});

const DeleteProduct = (category, product) => ({
    type: ACTIONS.DELETE_PRODUCT,
    payload: {
        product_id: product,
        category_id: category
    }
});

const PatchProduct = (product_id, param_name, value) => ({
    type: ACTIONS.PATCH_PRODUCT,
    payload: {
        product_id,
        param_name,
        value
    }
});

export const AddProductAction = (category_id, form_data, temp_url) => {
    return async (dispatch) => {
        try {
            dispatch(AddProduct(category_id, form_data, temp_url));
            form_data.append("category_id", category_id);
            const product = await SendApiRequest('/sale/products', Constants.API_METHODS.POST, form_data);
            dispatch(UpdateProduct(product));
        } catch (err) {

        }
    };
};


export const DeleteProductAction = (category_id, product_id) => {
    return async (dispatch) => {
        try {
            dispatch(DeleteProduct(category_id, product_id));
            await SendApiRequest(`/sale/products/${product_id}`, Constants.API_METHODS.DELETE);
        } catch (err) {

        }
    };
};

export const PatchProductAction = (product_id, param_name, value) => {
    return async (dispatch) => {
        try {
            dispatch(PatchProduct(product_id, param_name, value));
            await SendApiRequest(`/sale/products/${product_id}`, Constants.API_METHODS.PATCH, { param_name, value });
        } catch (err) {

        }
    };
};
