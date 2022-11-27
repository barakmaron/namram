const getReducer = state => state.projectsReducer;
export const getProjects = state => getReducer(state).projects;