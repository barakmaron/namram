import ApiMessagesConstants from "../../../ApiMessagesConstants";
import Constants from "../../../Constants";
import SendApiRequest from "../../../services/ApiService";
import ACTIONS from "../actionConstants/Projects/ProjectsImagesActionsConstants";
import { DispatchError, Successful } from "../ApiHandlerActions";

const AddImages = (project_id, images) => ({
    type: ACTIONS.ADD_PROJECT_IMAGES,
    payload: {
        Images: images,
        project_id
    }
});

const UpdateImages = (project_id, images) => ({
    type: ACTIONS.UPDATE_PROJECT_IMAGES,
    payload: {
        Images: images,
        project_id
    }
});

const DeleteImage = (project_id, image_id) => ({
    type: ACTIONS.DELETE_PROJECT_IMAGE,
    payload: {
        image_id,
        project_id
    }
});

export const AddImagesAction = (project_id, images) => {
    return async (dispatch) => {
        try {
            dispatch(AddImages(project_id, images.images));
            const added_images = await SendApiRequest(`/projects/${project_id}/images`, Constants.API_METHODS.POST, images);
            dispatch(UpdateImages(project_id, added_images));
            dispatch(Successful(ApiMessagesConstants.projects.images.addImage.successful));
        } catch (err) {
            dispatch(UpdateImages(project_id, []));
            DispatchError(dispatch, err, ApiMessagesConstants.projects.images.addImage.failed);
        }
    }
};

export const DeleteImageAction = (project_id, image_id) => {
    return async (dispatch) => {
        try {
            dispatch(DeleteImage(project_id, image_id));
            await SendApiRequest(`/projects/${project_id}/images/${image_id}`, Constants.API_METHODS.DELETE);
            dispatch(Successful(ApiMessagesConstants.projects.images.deleteImage.successful));
        } catch (err) {
            DispatchError(dispatch, err, ApiMessagesConstants.projects.images.deleteImage.failed);
        }
    }
};
