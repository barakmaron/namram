import ACTIONS from "../actions/actionConstants/rent/rentalAgreementActionConstants";
import RentalAgreementsFunctions from "./RentalAgreementsReducerFunctions/RentalAgreementsFunctions";

const iniState = {
    rental_agreements: []
};

const reducer = (state = iniState, action) => {
    const { type, payload } = action;
    switch(type) {
        case ACTIONS.GET_RENTAL_AGREEMENTS:
        case ACTIONS.ADD_RENTAL_AGREEMENT: 
        case ACTIONS.UPDATE_RENTAL_AGREEMENTS: 
        case ACTIONS.CLOSE_RENTAL_AGREEMENT: 
        case ACTIONS.DELETE_RENTAL_AGREEMENTS: {
            return RentalAgreementsFunctions[type](state, payload);
        }
        default: {
            return state;
        }
    }
};

export default reducer;