import ACTIONS from "../../actions/actionConstants/ServiceActionsConstants/ServiceActionsConstants";
import reducerUtilities from "../reducerUtilities";

function GetAllOpenServiceReports(state, payload) {
    return {
        ...state,
        service_reports: payload
    };
}

function AddServiceReport(state, payload) {
    return {
        ...state,
        service_reports: [
            ...state.service_reports,
            payload
        ]
    };
}

function UpdateServiceReport(state, payload) {
    const { filtered_array: filtered_service_reports } = reducerUtilities.destructorArray(state.service_reports);
    const service_reports = payload?.id ? [
        ...filtered_service_reports,
        payload
    ] : [ ...filtered_service_reports ];
    return {
        ...state,
        service_reports: service_reports
    };
}

function PatchServiceReport(state, payload) {
    const { field, value } = payload;
    const { object: service_report, filtered_array: filtered_service_reports } = reducerUtilities.destructorArray(state.service_reports, payload.service_report_id);
    if(field !== 'EndDate') {
        service_report[field] = value;
        return {
            ...state,
            service_reports: [
                ...filtered_service_reports,
                service_report
            ]
        };
    }
    return {
        ...state,
        service_reports: [
            ...filtered_service_reports,
        ]
    };
}

const ServiceReportsReducerFunctions = {
    [ACTIONS.GET_SERVICE_REPORTS]: GetAllOpenServiceReports,
    [ACTIONS.ADD_SERVICE_REPORT]: AddServiceReport,
    [ACTIONS.UPDATE_SERVICE_REPORT]: UpdateServiceReport,
    [ACTIONS.PATCH_SERVICE_REPORT]: PatchServiceReport
};

export default ServiceReportsReducerFunctions;