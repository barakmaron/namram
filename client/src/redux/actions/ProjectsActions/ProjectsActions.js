import Constants from "../../../Constants";
import SendApiRequest from "../../../services/ApiService";
import ACTIONS from "../actionConstants/Projects/ProjectsActionsConstants";

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

        }
    };
};


export const AddProjectAction = (form, temp_url) => {
    return async (dispatch) => {
        try {
            dispatch(AddProject(Object.fromEntries(form), temp_url));
            const project = await SendApiRequest(`/projects`, Constants.API_METHODS.POST, form);
            dispatch(UpdateProject(project));
        } catch (err) {

        }
    };
};


export const DeleteProjectAction = (id) => {
    return async (dispatch) => {
        try {
            dispatch(DeleteProject(id));
            await SendApiRequest(`/projects/${id}`, Constants.API_METHODS.DELETE);
        } catch (err) {

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
        } catch (err) {

        }
    };
};