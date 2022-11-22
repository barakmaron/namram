import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { AddProductAction, DeleteProductAction } from "../../redux/actions/ProductsActions/ProductsActions";
import Products from "./Products";
import { getCategories } from "../../redux/selectors/categoriesSelector";

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

export default connect(maStateToProps, mapActionToProps)(Products);