import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { AddProductAction, DeleteProductAction } from "../../../../redux/actions/SaleActions/saleProductsActions";
import SaleProducts from "./SaleProducts";
import { getCategories } from "../../../../redux/selectors/saleSelector";

const maStateToProps = (state, ownProps) => {
    const categories = getCategories(state);
    return { ...ownProps, categories };
};

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        AddProductAction,
        DeleteProductAction
    }, dispatch);
};

export default connect(maStateToProps, mapActionToProps)(SaleProducts);