import ACTIONS from "../../actions/actionConstants/Projects/ProjectsImagesActionsConstants";
import reducerUtilities from "../reducerUtilities";

function AddImages(state, payload) {
    const { project_id, Images } = payload;
    const { object: project, filtered_array: filtered_projects } = reducerUtilities.destructorArray(state.projects, project_id);
    const temp_images = Images.map(image => ({
        TempUrl: image
    }));
    project.ProjectsImages = [
        ...project.ProjectsImages,
        ...temp_images
    ];
    return {
        ...state,
        projects: [
            ...filtered_projects,
            project
        ]
    };
}

function UpdateImages(state, payload) {
    const { project_id, Images } = payload;
    const { object: project, filtered_array: filtered_projects } = reducerUtilities.destructorArray(state.projects, project_id);
    const { filtered_array: filtered_images } = reducerUtilities.destructorArray(project.ProjectsImages);
    project.ProjectsImages = Images.length ? [
        ...filtered_images,
        ...Images
    ] : [ ...filtered_images ];
    return {
        ...state,
        projects: [
            ...filtered_projects,
            project
        ]
    };
}

function DeleteImage(state, payload) {
    const { project_id, image_id } = payload;
    const { object: project, filtered_array: filtered_projects } = reducerUtilities.destructorArray(state.projects, project_id);
    const { filtered_array: filtered_images } = reducerUtilities.destructorArray(project.ProjectsImages, image_id);
    project.ProjectsImages = [
        ...filtered_images
    ];
    return {
        ...state,
        projects: [
            ...filtered_projects,
            project
        ]
    };
}

const ProjectsImagesReducerFunctions = {
    [ACTIONS.ADD_PROJECT_IMAGES]: AddImages,
    [ACTIONS.UPDATE_PROJECT_IMAGES]: UpdateImages,
    [ACTIONS.DELETE_PROJECT_IMAGE]: DeleteImage
};

export default ProjectsImagesReducerFunctions;