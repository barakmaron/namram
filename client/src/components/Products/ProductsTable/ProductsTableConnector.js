import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { getCategories } from "../../../redux/selectors/categoriesSelector";
import SaleProductsTable from "./ProductsTable";
import { PatchProductAction } from "../../../redux/actions/ProductsActions/ProductsActions";

const maStateToProps = (state, ownProps) => {
    const categories = getCategories(state);
    return { ...ownProps, categories };
};

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        PatchProductAction
    }, dispatch);
};

export default connect(maStateToProps, mapActionToProps)(SaleProductsTable);