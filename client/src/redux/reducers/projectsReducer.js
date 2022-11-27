import ACTIONS from "../actions/actionConstants/Projects/ProjectsActionsConstants";
import reducerUtilities from "./reducerUtilities";

const initState = {
    projects: []
};

const reducer = (state = initState, action) => {
    const { type, payload } = action;
    switch(type) {
        case ACTIONS.GET_ALL_PROJECTS: {
            return {
                ...state,
                projects: payload
            };
        }
        case ACTIONS.ADD_PROJECT: {
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
        case ACTIONS.UPDATE_PROJECT: {
            const { filtered_array: projects } = reducerUtilities.destructorArray(state.projects);
            return {
                ...state,
                projects: [
                    ...projects, 
                    payload
                ]
            };
        }
        case ACTIONS.DELETE_PROJECT: {
            const { filtered_array: projects } = reducerUtilities.destructorArray(state.projects, payload);
            return {
                ...state,
                projects: [
                    ...projects
                ]
            };
        }
        case ACTIONS.PATCH_PROJECT: {
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
        case ACTIONS.ImagesActions.ADD_PROJECT_IMAGES: {
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
        case ACTIONS.ImagesActions.UPDATE_PROJECT_IMAGES: {
            const { project_id, Images } = payload;
            const { object: project, filtered_array: filtered_projects } = reducerUtilities.destructorArray(state.projects, project_id);
            const { filtered_array: filtered_images } = reducerUtilities.destructorArray(project.ProjectsImages);
            project.ProjectsImages = [
                ...filtered_images,
                ...Images
            ];
            return {
                ...state,
                projects: [
                    ...filtered_projects,
                    project
                ]
            };
        }
        case ACTIONS.ImagesActions.DELETE_PROJECT_IMAGE: {
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
        default: {
            return state;
        }
    }
};

export default reducer;