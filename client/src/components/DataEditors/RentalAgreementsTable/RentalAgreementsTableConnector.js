import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import RentalAgreementsTable from "./RentalAgreementsTable";
import {  CloseRentalAgreementAction, DeleteRentalAgreementAction } from '../../../redux/actions/RentActions/RentalAgreementsActions';

const maStateToProps = (state, ownProps) => {
    return { 
        ...ownProps
    };
};

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        CloseRentalAgreementAction,
        DeleteRentalAgreementAction
    }, dispatch);
};

export default connect(maStateToProps, mapActionToProps)(RentalAgreementsTable);