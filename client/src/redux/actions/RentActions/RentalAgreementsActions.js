import ApiMessagesConstants from "../../../ApiMessagesConstants";
import Constants from "../../../Constants";
import SendApiRequest from "../../../services/ApiService";
import ACTIONS from "../actionConstants/rent/rentalAgreementActionConstants";
import { DispatchError, Successful } from "../ApiHandlerActions";

const GetRentalAgreements = (rental_agreements) => ({
    type: ACTIONS.GET_RENTAL_AGREEMENTS,
    payload: rental_agreements
});

const AddRentalAgreement = (form) => ({
    type: ACTIONS.ADD_RENTAL_AGREEMENT,
    payload: form
});

const UpdateRentalAgreement = (rental_agreement) => ({
    type: ACTIONS.UPDATE_RENTAL_AGREEMENTS,
    payload: rental_agreement
});

const CloseRentalAgreement = (rental_agreement_id, form) => ({
    type: ACTIONS.CLOSE_RENTAL_AGREEMENT,
    payload: {
        id: rental_agreement_id,
        form
    }
});

const DeleteRentalAgreement = (rental_agreement_id) => ({
    type: ACTIONS.DELETE_RENTAL_AGREEMENTS,
    payload: rental_agreement_id
});

export const GetRentalAgreementsAction = () => {
    return async(dispatch) => {
        try {
            const rental_agreements = await SendApiRequest(`/rental_agreements`);
            dispatch(GetRentalAgreements(rental_agreements));
        } catch (err) {
            DispatchError(dispatch, err, ApiMessagesConstants.rentalAgreements.getAgreements.failed);
        }
    }
};

export const GetRentalForCustomerAgreementsAction = (customer_id) => {
    return async(dispatch) => {
        try {
            const rental_agreements = await SendApiRequest(`/rental_agreements?customer=${customer_id}`);
            dispatch(GetRentalAgreements(rental_agreements));
        } catch (err) {
            DispatchError(dispatch, err, ApiMessagesConstants.rentalAgreements.getAgreements.failed);
        }
    }
};

export const AddRentalAgreementAction = (form, customer_id) => {
    return async(dispatch) => {
        try {
            dispatch(AddRentalAgreement(form));
            const rental_agreement = await SendApiRequest(`/rental_agreements${customer_id ? `/customer/${customer_id}` : ``}`, Constants.API_METHODS.POST, form);    
            dispatch(UpdateRentalAgreement(rental_agreement));
            dispatch(Successful(ApiMessagesConstants.rentalAgreements.addAgreement.successful));
        } catch (err) {
            dispatch(UpdateRentalAgreement());
            DispatchError(dispatch, err, ApiMessagesConstants.rentalAgreements.addAgreement.failed);
        }
    }
};

export const CloseRentalAgreementAction = (rental_agreement_id, form) => {
    return async(dispatch) => {
        try {
            dispatch(CloseRentalAgreement(rental_agreement_id, form));
            await SendApiRequest(`/rental_agreements/${rental_agreement_id}`, Constants.API_METHODS.POST, form);  
            dispatch(Successful(ApiMessagesConstants.rentalAgreements.closeAgreement.successful));
        } catch (err) {
            DispatchError(dispatch, err, ApiMessagesConstants.rentalAgreements.closeAgreement.failed);
        }
    }
}

export const DeleteRentalAgreementAction = (rental_agreement_id) => {
    return async(dispatch) => {
        try {
            dispatch(DeleteRentalAgreement(rental_agreement_id));
            await SendApiRequest(`/rental_agreements/${rental_agreement_id}`, Constants.API_METHODS.DELETE);  
            dispatch(Successful(ApiMessagesConstants.rentalAgreements.deleteAgreement.successful));
        } catch (err) {
            DispatchError(dispatch, err, ApiMessagesConstants.rentalAgreements.deleteAgreement.failed);
        }
    }
}
