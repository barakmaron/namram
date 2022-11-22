import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import ServicePage from "./ServicePage";
import { getServiceReports } from "../../../redux/selectors/serviceSelector";
import { getCategories } from "../../../redux/selectors/categoriesSelector";
import { GetServiceReportsAction, AddServiceReportsAction } from "../../../redux/actions/ServiceActions/ServiceActions";
import { GetRentAction } from "../../../redux/actions/RentActions/RentActions";

const maStateToProps = (state, ownProps) => {
    const categories = getCategories(state);
    const service_reports = getServiceReports(state);
    return { 
        ...ownProps,
        categories,
        service_reports
    };
};

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        GetRentAction,
        GetServiceReportsAction,
        AddServiceReportsAction
    }, dispatch);
};

export default connect(maStateToProps, mapActionToProps)(ServicePage);