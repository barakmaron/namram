import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { getCategories } from "../../redux/selectors/categoriesSelector";
import { GetCategoryAction } from "../../redux/actions/CategoriesActions/CategoriesActions";
import ProductPage from "./ProductPage";

const maStateToProps = (state, ownProps) => {
    const categories = getCategories(state);
    return { ...ownProps, categories };
};

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        GetCategoryAction
    }, dispatch);
};

export default connect(maStateToProps, mapActionToProps)(ProductPage);