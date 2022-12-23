import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { AddCategoryAction, DeleteCategoryAction, EditCategoryAction } from "../../redux/actions/CategoriesActions/CategoriesActions";
import { getCategories } from "../../redux/selectors/categoriesSelector";
import Categories from "./Categories";

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

export default connect(maStateToProps, mapActionToProps)(Categories);