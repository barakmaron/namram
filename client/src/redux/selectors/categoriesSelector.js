const getReducer = state => state.categoriesReducer;
export const getCategories = state => getReducer(state).categories;