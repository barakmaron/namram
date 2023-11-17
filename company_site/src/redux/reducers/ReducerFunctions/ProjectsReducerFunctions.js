import ACTIONS from "../../actions/actionConstants/ProjectsActionsConstants";

function GetProjects(state, payload) {
    return {
        ...state,
        projects: payload
    };
}

const ProjectsReducerFunctions = {
    [ACTIONS.GET_ALL_PROJECTS]: GetProjects
};

export default ProjectsReducerFunctions;