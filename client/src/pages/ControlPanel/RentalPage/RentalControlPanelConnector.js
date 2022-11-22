import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { GetRentalAgreementsAction, AddRentalAgreementAction } from '../../../redux/actions/RentActions/RentalAgreementsActions';
import { getAgreements } from "../../../redux/selectors/rentalAgreementsSelector";
import { GetAllCustomersAction } from '../../../redux/actions/CustomersActions';
import { getCustomers } from "../../../redux/selectors/customersSelector";
import RentalControlPanel from "./RentalControlPanel";

const maStateToProps = (state, ownProps) => {
    const open_agreements = getAgreements(state);
    const customers = getCustomers(state);
    return { 
        ...ownProps, 
        open_agreements,
        customers
    };
};

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        GetRentalAgreementsAction,
        AddRentalAgreementAction,
        GetAllCustomersAction
    }, dispatch);
};

export default connect(maStateToProps, mapActionToProps)(RentalControlPanel);