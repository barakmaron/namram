import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getCustomers } from "../../../redux/selectors/customersSelector";
import CustomersPage from "./CustomersPage";
import { GetAllCustomersAction, PatchCustomerAction, DeleteCustomerAction } from "../../../redux/actions/CustomersActions";
import { GetRentalForCustomerAgreementsAction } from '../../../redux/actions/RentActions/RentalAgreementsActions';
import { getAgreements } from "../../../redux/selectors/rentalAgreementsSelector";

const mapStateToProps = (state, ownProps) => {
    const customers = getCustomers(state);
    const customer_agreements = getAgreements(state);
    return { ...ownProps, customers, customer_agreements };
};

const mapActionsToProps = (dispatch) => {
    return bindActionCreators({
        GetAllCustomersAction,
        PatchCustomerAction,
        DeleteCustomerAction,
        GetRentalForCustomerAgreementsAction
    }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(CustomersPage);