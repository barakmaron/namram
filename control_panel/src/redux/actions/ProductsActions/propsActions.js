import ApiMessagesConstants from "../../../ApiMessagesConstants";
import Constants from "../../../Constants";
import SendApiRequest from "../../../services/ApiService";
import ACTIONS from "../actionConstants/Products/PropsActionConstants";
import { DispatchError, Successful } from "../ApiHandlerActions";

const PatchProductProps = (prop_id, category_id, product_id, name, value, product_type) => ({
    type: ACTIONS.PATCH_PRODUCT_PROP,
    payload: {
        prop_id,
        category_id,
        product_id,
        name,
        value,
        product_type
    }
});

const NewProductProp = (category_id, product_id, product_type) => ({
    type: ACTIONS.ADD_PRODUCT_PROP,
    payload: {
        product_id: product_id,
        category_id: category_id,
        product_type
    }
});

const UpdateProductProp = (category_id, product_id, prop, product_type) => ({
    type:  ACTIONS.UPDATE_PRODUCT_PROP,
    payload: {
        category_id,
        product_id,
        prop,
        product_type
    }
});

const DeleteProductProp = (category_id, product_id, prop_id, product_type) => ({
    type: ACTIONS.DELETE_PRODUCT_PROP,
    payload: {
        category_id,
        product_id,
        prop_id,
        product_type
    }
});

export const PatchProductPropsAction = (prop_id, category_id, product_id, name, value, product_type) => {
    return async (dispatch) => {
        try {
            dispatch(PatchProductProps(prop_id, category_id, product_id, name, value, product_type));
            await SendApiRequest(`/products/props/${prop_id}`, Constants.API_METHODS.PATCH, { name, value });
            dispatch(Successful(ApiMessagesConstants.product.props.patchProp.successful));
        } catch (err) {
            DispatchError(dispatch, err, ApiMessagesConstants.product.props.patchProp.failed);
        }
    };
};


export const NewProductPropAction = (category_id, product_id, product_type) => {
    return async (dispatch) => {
        try {
            dispatch(NewProductProp(category_id, product_id, product_type));
            const new_prop = await SendApiRequest(`/products/props`, Constants.API_METHODS.POST, { product_id });
            dispatch(UpdateProductProp(category_id, product_id, new_prop, product_type));
            dispatch(Successful(ApiMessagesConstants.product.props.addProp.successful));
        } catch (err) {
            dispatch(UpdateProductProp(category_id, product_id, {}, product_type));
            DispatchError(dispatch, err, ApiMessagesConstants.product.props.addProp.failed);
        }
    };
};

export const DeletePropAction = (category_id, product_id, prop_id, product_type) => {
    return async (dispatch) => {
        try {
            dispatch(DeleteProductProp(category_id, product_id, prop_id, product_type));
            await SendApiRequest(`/products/props/${prop_id}`, Constants.API_METHODS.DELETE);
            dispatch(Successful(ApiMessagesConstants.product.props.deleteProp.successful));
        } catch (err) {
            DispatchError(dispatch, err, ApiMessagesConstants.product.props.deleteProp.failed);
        }
    };
};