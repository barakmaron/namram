import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import Sale from "./Sale";
import { GetSaleAction } from "../../../redux/actions/SaleActions/saleActions";
import { getCategories } from "../../../redux/selectors/saleSelector";

const maStateToProps = (state, ownProps) => {
    const categories = getCategories(state);
    return { ...ownProps, categories };
};

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        GetSaleAction,
    }, dispatch);
};

export default connect(maStateToProps, mapActionToProps)(Sale);