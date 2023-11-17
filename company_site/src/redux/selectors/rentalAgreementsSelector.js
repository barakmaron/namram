const getState = state => state.rentalAgreementsReducer;
export const getAgreements = state => getState(state).rental_agreements;