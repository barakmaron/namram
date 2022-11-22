import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import ToolsPage from "./ToolsPage";
import { getCategories } from "../../../redux/selectors/categoriesSelector";
import { GetRentAction } from '../../../redux/actions/RentActions/RentActions';
import { GetSaleAction } from "../../../redux/actions/SaleActions/saleActions";

const maStateToProps = (state, ownProps) => {
    const categories = getCategories(state);
    return { ...ownProps, categories };
};

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        GetRentAction,
        GetSaleAction
    }, dispatch);
};

export default connect(maStateToProps, mapActionToProps)(ToolsPage);