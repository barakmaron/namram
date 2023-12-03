const getState = state => state.serviceReducer;
export const getServiceReports = state => getState(state).service_reports;