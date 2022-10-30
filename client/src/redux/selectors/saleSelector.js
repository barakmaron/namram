const getReducer = state => state.saleReducer;
export const getCategories = state => getReducer(state).categories;