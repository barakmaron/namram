import ACTIONS from "../../actions/actionConstants/rent/rentalAgreementActionConstants";
import reducerUtilities from "../reducerUtilities";

function GetOpenAgreements(state, payload) {
    return {
        ...state, 
        rental_agreements: payload
    };
}

function AddAgreement(state, payload) {
    return {
        ...state,
        rental_agreements: [
            ...state.rental_agreements,
            payload
        ]
    };
}

function UpdateAgreement(state, payload) {
    const { filtered_array: agreements } = reducerUtilities.destructorArray(state.rental_agreements);
    return {
        ...state,
        rental_agreements: [
            ...agreements,
            payload
        ]
    };
}

function CloseAgreement(state, payload) {
    const { filtered_array: open_agreements } = reducerUtilities.destructorArray(state.rental_agreements, payload.id);
    return {
        ...state,
        rental_agreements: open_agreements
    };
}

function DeleteAgreement(state, payload) {
    const { filtered_array: open_agreements } = reducerUtilities.destructorArray(state.rental_agreements, payload);
    return {
        ...state,
        rental_agreements: open_agreements
    };
}

const RentalAgreementsFunctions = {
    [ACTIONS.GET_RENTAL_AGREEMENTS]: GetOpenAgreements,
    [ACTIONS.ADD_RENTAL_AGREEMENT]: AddAgreement,
    [ACTIONS.UPDATE_RENTAL_AGREEMENTS]: UpdateAgreement,
    [ACTIONS.CLOSE_RENTAL_AGREEMENT]: CloseAgreement,
    [ACTIONS.DELETE_RENTAL_AGREEMENTS]: DeleteAgreement
};

export default RentalAgreementsFunctions;