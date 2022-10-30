const initState = {
    logged_in: true
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