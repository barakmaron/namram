import ACTIONS from "../../actions/actionConstants/Projects/ProjectsActionsConstants";
import reducerUtilities from "../reducerUtilities";

function AddProject(state, payload) {
    const { form, Images } = payload;
    return {
        ...state,
        projects: [
            ...state.projects, {
                ...form,
                ProjectsImages: Images.map(image => ({
                    TempUrl: image
                }))
            }
        ]
    };
}

function UpdateProject(state, payload) {
    const { filtered_array: projects } = reducerUtilities.destructorArray(state.projects);
    return {
        ...state,
        projects: [
            ...projects, 
            payload
        ]
    };
}

function PatchProject(state, payload) {
    const { id, title, text } = payload;
    const { object: project, filtered_array: projects } = reducerUtilities.destructorArray(state.projects, id);
    project.Title = title;
    project.Text = text;
    return {
        ...state,
        projects: [
            ...projects,
            project
        ]
    };
}

function DeleteProject(state, payload) {
    const { filtered_array: projects } = reducerUtilities.destructorArray(state.projects, payload);
    return {
        ...state,
        projects: [
            ...projects
        ]
    };
}

function GetProjects(state, payload) {
    return {
        ...state,
        projects: payload
    };
}

const ProjectsReducerFunctions = {
    [ACTIONS.ADD_PROJECT]: AddProject,
    [ACTIONS.UPDATE_PROJECT]: UpdateProject,
    [ACTIONS.PATCH_PROJECT]: PatchProject,
    [ACTIONS.DELETE_PROJECT]: DeleteProject,
    [ACTIONS.GET_ALL_PROJECTS]: GetProjects
};

export default ProjectsReducerFunctions;