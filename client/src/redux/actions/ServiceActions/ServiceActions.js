import Constants from "../../../Constants";
import SendApiRequest from "../../../services/ApiService";
import ACTIONS from "../actionConstants/ServiceActionsConstants/ServiceActionsConstants";

const GetServiceReports = (service_reports) => ({
    type: ACTIONS.GET_SERVICE_REPORTS,
    payload: service_reports
});

const AddServiceReport = (form) => ({
    type: ACTIONS.ADD_SERVICE_REPORT,
    payload: form
});

const UpdateServiceReport = (report) => ({
    type: ACTIONS.UPDATE_SERVICE_REPORT,
    payload: report
});

const PatchServiceReport = (id, field, value) => ({
    type: ACTIONS.PATCH_SERVICE_REPORT,
    payload: {
        service_report_id: id,
        field,
        value
    }
})

export const GetServiceReportsAction = () => {
    return async (dispatch) => {
        try {
            const service_reports = await SendApiRequest(`/service_reports`);
            dispatch(GetServiceReports(service_reports));
        } catch (err) {

        }
    }
}

export const AddServiceReportsAction = (form, product_id) => {
    return async (dispatch) => {
        try {
            dispatch(AddServiceReport(form));
            const service_report = await SendApiRequest(`/service_reports`, Constants.API_METHODS.POST, { ...form, product_id });
            dispatch(UpdateServiceReport(service_report));
        } catch (err) {

        }
    }
}

export const PatchServiceReportAction = (id, field, value) => {
    return async (dispatch) => {
        try {
            dispatch(PatchServiceReport(id, field, value));
            await SendApiRequest(`/service_reports/${id}`, Constants.API_METHODS.PATCH, { 
                param_name: field,
                value
            });
        } catch (err) {

        }
    }
}