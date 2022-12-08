import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import PartsChancedEditor from "./PartsChancedEditor";
import { AddChangedPartAction, DeleteChangedPartAction } from "../../../redux/actions/ServiceActions/ServiceChangedPartActions";
import { getServiceReports } from "../../../redux/selectors/serviceSelector";

const maStateToProps = (state, ownProps) => {
    const service_report = getServiceReports(state).find(report => report.id === ownProps.service_report_id);
    return { 
        ...ownProps,
        parts: service_report.PartsChangeds,
        diagrams: service_report.RentProduct.Product.ProductDiagramsLists
    };
};

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        AddChangedPartAction,
        DeleteChangedPartAction
    }, dispatch);
};

export default connect(maStateToProps, mapActionToProps)(PartsChancedEditor);