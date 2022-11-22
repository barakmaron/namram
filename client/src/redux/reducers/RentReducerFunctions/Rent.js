import RentActions from '../../actions/actionConstants/rent/rentActionConstants';

function GetRent(state, payload) {
    return {
        ...state,
        categories: payload
    }
}

const RentReducerFunctions = {
    [RentActions.GET_RENT]: GetRent
};

export default RentReducerFunctions;