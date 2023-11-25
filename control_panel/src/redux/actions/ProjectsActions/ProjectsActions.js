import ApiMessagesConstants from "../../../ApiMessagesConstants";
import Constants from "../../../Constants";
import SendApiRequest from "../../../services/ApiService";
import ACTIONS from "../actionConstants/Projects/ProjectsActionsConstants";
import { DispatchError, Successful } from "../ApiHandlerActions";

const GetProjects = (projects) => ({
    type: ACTIONS.GET_ALL_PROJECTS,
    payload: projects
});

const AddProject = (form, temp_images) => ({
    type: ACTIONS.ADD_PROJECT,
    payload: {
        form,
        Images: temp_images
    }
});

const UpdateProject = (project) => ({
    type: ACTIONS.UPDATE_PROJECT,
    payload: project
});

const DeleteProject = (id) => ({
    type: ACTIONS.DELETE_PROJECT,
    payload: id
});

const EditProject = (id, title, text) => ({
    type: ACTIONS.PATCH_PROJECT,
    payload: {
        id,
        title,
        text
    }
})

export const GetProjectsAction = () => {
    return async (dispatch) => {
        try {
            const projects = await SendApiRequest(`/projects`);
            dispatch(GetProjects(projects));
        } catch (err) {
            DispatchError(dispatch, err, ApiMessagesConstants.projects.getProjects);
        }
    };
};


export const AddProjectAction = (form, temp_url) => {
    return async (dispatch) => {
        try {
            dispatch(AddProject(form, temp_url));
            const project = await SendApiRequest(`/projects`, Constants.API_METHODS.POST, form);
            dispatch(UpdateProject(project));
            dispatch(Successful(ApiMessagesConstants.projects.addProject.successful));
        } catch (err) {
            dispatch(UpdateProject());
            DispatchError(dispatch, err, ApiMessagesConstants.projects.addProject.failed);
        }
    };
};


export const DeleteProjectAction = (id) => {
    return async (dispatch) => {
        try {
            dispatch(DeleteProject(id));
            await SendApiRequest(`/projects/${id}`, Constants.API_METHODS.DELETE);
            dispatch(Successful(ApiMessagesConstants.projects.deleteProject.successful));
        } catch (err) {
            DispatchError(dispatch, err, ApiMessagesConstants.projects.deleteProject.failed);
        }
    };
};

export const EditProjectAction = (id, title, text) => {
    return async (dispatch) => {
        try {
            dispatch(EditProject(id, title, text));
            await SendApiRequest(`/projects/${id}`, Constants.API_METHODS.PATCH, {
                Title: title,
                Text: text
            });
            dispatch(Successful(ApiMessagesConstants.projects.patchProject.successful));
        } catch (err) {
            DispatchError(dispatch, err, ApiMessagesConstants.projects.patchProject.failed);
        }
    };
};