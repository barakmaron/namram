import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { AddCategoryAction, DeleteCategoryAction, EditCategoryAction } from "../../../../redux/actions/SaleActions/saleCategoriesActions";
import { getCategories } from "../../../../redux/selectors/saleSelector";
import SaleCategories from "./SaleCategories";

const maStateToProps = (state, ownProps) => {
    const categories = getCategories(state);
    return { ...ownProps, categories };
};

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        AddCategoryAction,
        DeleteCategoryAction,
        EditCategoryAction,
    }, dispatch);
};

export default connect(maStateToProps, mapActionToProps)(SaleCategories);