const getState = (state) => state.customersReducer;
export const getCustomers = (state) => getState(state).customers;