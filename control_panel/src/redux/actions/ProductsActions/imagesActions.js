import ApiMessagesConstants from "../../../ApiMessagesConstants";
import Constants from "../../../Constants";
import SendApiRequest from "../../../services/ApiService";
import ACTIONS from "../actionConstants/Products/ImagesActionConstants";
import { DispatchError, Successful } from "../ApiHandlerActions";

const DeleteImage = (category_id, product_id, image_id, product_type) => ({
    type: ACTIONS.DELETE_PRODUCT_IMAGE,
    payload: {
        category_id,
        product_id,
        image_id,
        product_type
    }
});

const AddImages = (category_id, product_id, images, product_type) => ({
    type: ACTIONS.ADD_PRODUCT_IMAGE,
    payload: {
        category_id,
        product_id,
        images,
        product_type
    }
});

const UpdatedImages = (category_id, product_id, images, product_type) => ({
    type: ACTIONS.UPDATE_PRODUCT_IMAGE,
    payload: {
        category_id,
        product_id,
        images,
        product_type
    }
});

export const DeleteImageAction = (category_id, product_id, product_type, image_id) => {
    return async (dispatch) => {
        try {
            dispatch(DeleteImage(category_id, product_id, image_id, product_type));
            await SendApiRequest(`/products/images/${image_id}`, Constants.API_METHODS.DELETE);
            dispatch(Successful(ApiMessagesConstants.product.images.deleteImage.successful));
        } catch (err) {
            DispatchError(dispatch, err, ApiMessagesConstants.product.images.deleteImage.failed);
        }
    }
};

export const AddImagesAction = (category_id, product_id, product_type, form) => {
    return async (dispatch) => {
        try {
            dispatch(AddImages(category_id, product_id, form, product_type));
            form.product_id = product_id;
            const new_images = await SendApiRequest(`/products/images`, Constants.API_METHODS.POST, form);
            dispatch(UpdatedImages(category_id, product_id, new_images));
            dispatch(Successful(ApiMessagesConstants.product.images.addImage.successful));
        } catch (err) {
            dispatch(UpdatedImages(category_id, product_id, []));
            DispatchError(dispatch, err, ApiMessagesConstants.product.images.addImage.failed);
        }
    }
};