import ACTIONS from "../actions/actionConstants/ServiceActionsConstants/ServiceActionsConstants";
import PartChangedReducerFunctions from "./ServiceReportsReducerFunctions/PartChangedReducerFunctions";
import ServiceReportsReducerFunctions from "./ServiceReportsReducerFunctions/ServiceReportsReducerFunctions";

const initState = {
    service_reports: []
};

const reducer = (state = initState, action) => {
    const { type, payload } = action;
    switch (type) {
        case ACTIONS.GET_SERVICE_REPORTS: 
        case ACTIONS.ADD_SERVICE_REPORT: 
        case ACTIONS.UPDATE_SERVICE_REPORT: 
        case ACTIONS.PATCH_SERVICE_REPORT: {
            return ServiceReportsReducerFunctions[type](state, payload);
        }
        case ACTIONS.PartsChangedActions.ADD_CHANGED_PART: 
        case ACTIONS.PartsChangedActions.UPDATE_CHANGED_PART: 
        case ACTIONS.PartsChangedActions.DELETE_CHANGED_PART: {
            return PartChangedReducerFunctions[type](state, payload);
        }        
        default: {
            return state;
        }
    }
};

export default reducer;