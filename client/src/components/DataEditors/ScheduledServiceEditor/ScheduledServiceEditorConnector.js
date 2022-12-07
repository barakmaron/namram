import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import ScheduledServiceEditor from "./ScheduledServiceEditor";
import { AddScheduledServiceAction, PatchScheduledServiceAction, DeleteScheduledServiceAction } from "../../../redux/actions/ProductsActions/scheduledServiceAction";

const maStateToProps = (state, ownProps) => {
    return { 
        ...ownProps,
    };
};

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        AddScheduledServiceAction,
        PatchScheduledServiceAction,
        DeleteScheduledServiceAction
    }, dispatch);
};

export default connect(maStateToProps, mapActionToProps)(ScheduledServiceEditor);