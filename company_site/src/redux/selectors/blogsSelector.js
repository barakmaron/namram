const getReducer = state => state.blogsReducer;
export const getBlogs = state => getReducer(state).blogs;