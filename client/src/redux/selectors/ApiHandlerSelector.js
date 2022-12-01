const getReducer = state => state.apiHandlerReducer;
export const getSuccessful = state => getReducer(state).successful;
export const getFailed = state => getReducer(state).failed;
export const getMessage = state => getReducer(state).message;
export const getErrors = state => getReducer(state).errors;