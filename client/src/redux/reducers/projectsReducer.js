import ACTIONS from "../actions/actionConstants/Projects/ProjectsActionsConstants";
import ProjectsImagesReducerFunctions from "./ProjectsReducerFunctions/ProjectsImagesReducerFunctions";
import ProjectsReducerFunctions from "./ProjectsReducerFunctions/ProjectsReducerFunctions";

const initState = {
    projects: []
};

const reducer = (state = initState, action) => {
    const { type, payload } = action;
    switch(type) {
        case ACTIONS.GET_ALL_PROJECTS: 
        case ACTIONS.ADD_PROJECT: 
        case ACTIONS.UPDATE_PROJECT: 
        case ACTIONS.DELETE_PROJECT: 
        case ACTIONS.PATCH_PROJECT: {
            return ProjectsReducerFunctions[type](state, payload);
        }
        case ACTIONS.ImagesActions.ADD_PROJECT_IMAGES: 
        case ACTIONS.ImagesActions.UPDATE_PROJECT_IMAGES: 
        case ACTIONS.ImagesActions.DELETE_PROJECT_IMAGE: {
            return ProjectsImagesReducerFunctions[type](state, payload);
        }
        default: {
            return state;
        }
    }
};

export default reducer;