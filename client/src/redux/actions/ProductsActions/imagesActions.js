import Constants from "../../../Constants";
import SendApiRequest from "../../../services/ApiService";
import ACTIONS from "../actionConstants/Products/ImagesActionConstants";

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

export const DeleteImageAction = (category_id, product_id, image_id, product_type) => {
    return async (dispatch) => {
        try {
            dispatch(DeleteImage(category_id, product_id, image_id, product_type));
            await SendApiRequest(`/products/images/${image_id}`, Constants.API_METHODS.DELETE);
        } catch (err) {

        }
    }
};

export const AddImagesAction = (category_id, product_id, images, temp_urls, product_type) => {
    return async (dispatch) => {
        try {
            dispatch(AddImages(category_id, product_id, temp_urls, product_type));
            images.append('product_id', product_id);
            const new_images = await SendApiRequest(`/products/images`, Constants.API_METHODS.POST, images);
            dispatch(UpdatedImages(category_id, product_id, new_images));
        } catch (err) {

        }
    }
};