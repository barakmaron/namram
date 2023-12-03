import ApiMessagesConstants from "../../ApiMessagesConstants";
import SendApiRequest from "../../services/ApiService";
import ACTIONS from "./actionConstants/ProjectsActionsConstants";
import { DispatchError } from "./ApiHandlerActions";

const GetProjects = (projects) => ({
    type: ACTIONS.GET_ALL_PROJECTS,
    payload: projects
});

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
