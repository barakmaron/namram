const initState = {
    logged_in: false
};

const reducer = (state = initState, action) => {
    const { type, payload } = action;
    switch(type) {
        default:{
            return state;
        }
    }
};

export default reducer;