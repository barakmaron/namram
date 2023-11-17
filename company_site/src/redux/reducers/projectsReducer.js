import ACTIONS from "../actions/actionConstants/ProjectsActionsConstants";
import ProjectsReducerFunctions from "./ReducerFunctions/ProjectsReducerFunctions";

const initState = {
    projects: []
};

const reducer = (state = initState, action) => {
    const { type, payload } = action;
    switch(type) {
        case ACTIONS.GET_ALL_PROJECTS: {
            return ProjectsReducerFunctions[type](state, payload);
        }
        default: {
            return state;
        }
    }
};

export default reducer;