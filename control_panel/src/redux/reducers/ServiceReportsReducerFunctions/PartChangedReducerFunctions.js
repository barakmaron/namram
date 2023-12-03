import ACTIONS from "../../actions/actionConstants/ServiceActionsConstants/ServicePartsActionsConstants";
import reducerUtilities from "../reducerUtilities";

function AddChangedPart(state, payload) {
    const { object: service_report, filtered_array: filtered_service_reports } = reducerUtilities.destructorArray(state.service_reports, payload.service_report_id);
    service_report.PartsChangeds = [...service_report.PartsChangeds, {
        SparePart: payload.part
    }];
    return {
        ...state,
        service_reports: [
            ...filtered_service_reports,
            service_report
        ]
    };
}

function UpdateChangedPart(state, payload) {
    const { object: service_report, filtered_array: filtered_service_reports } = reducerUtilities.destructorArray(state.service_reports, payload.service_report_id);
    const { filtered_array: filtered_parts } = reducerUtilities.destructorArray(service_report.PartsChangeds);
    service_report.PartsChangeds = payload?.part?.id ? [ 
        ...filtered_parts,
        payload.part
    ] : [ ...filtered_parts ];
    return {
        ...state,
        service_reports: [
            ...filtered_service_reports,
            service_report
        ]
    };
}

function DeleteChangedPart(state, payload) {
    const { object: service_report, filtered_array: filtered_service_reports } = reducerUtilities.destructorArray(state.service_reports, payload.service_report_id);
    const { filtered_array: filtered_parts } = reducerUtilities.destructorArray(service_report.PartsChangeds, payload.part_id, "SparePartId");
    service_report.PartsChangeds = [ 
        ...filtered_parts
    ];
    return {
        ...state,
        service_reports: [
            ...filtered_service_reports,
            service_report
        ]
    };
}

const PartChangedReducerFunctions = {
    [ACTIONS.ADD_CHANGED_PART]: AddChangedPart,
    [ACTIONS.UPDATE_CHANGED_PART]: UpdateChangedPart,
    [ACTIONS.DELETE_CHANGED_PART]: DeleteChangedPart
};

export default PartChangedReducerFunctions;