const getReducer = state => state.staticPagesReducer;
export const getStaticPages = state => getReducer(state).static_pages;