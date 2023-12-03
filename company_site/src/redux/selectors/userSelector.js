const getReducer = state => state.userReducer;
export const getLoggedIn = state => getReducer(state).logged_in;