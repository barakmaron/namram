import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import ServiceReportTable from "./ServiceReportTable";
import { PatchServiceReportAction } from "../../../redux/actions/ServiceActions/ServiceActions";

const maStateToProps = (state, ownProps) => {
    return { 
        ...ownProps
    };
};

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        PatchServiceReportAction
    }, dispatch);
};

export default connect(maStateToProps, mapActionToProps)(ServiceReportTable);