import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { getCategories } from "../../../../redux/selectors/saleSelector";
import SaleProductsTable from "./SaleProductsTable";
import { PatchProductAction } from "../../../../redux/actions/SaleActions/saleProductsActions";
import { PatchProductPropsAction } from "../../../../redux/actions/ProductsActions/propsActions";

const maStateToProps = (state, ownProps) => {
    const categories = getCategories(state);
    return { ...ownProps, categories };
};

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        PatchProductAction,
        PatchProductPropsAction
    }, dispatch);
};

export default connect(maStateToProps, mapActionToProps)(SaleProductsTable);