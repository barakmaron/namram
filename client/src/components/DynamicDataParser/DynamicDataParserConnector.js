import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { getCategories } from "../../redux/selectors/categoriesSelector";
import { GetStaticPageDataPerPageAction, InitStaticPageDataAction } from "../../redux/actions/StaticPageActions";
import { getStaticPages } from "../../redux/selectors/staticPagesSelector";
import { GetRentAction } from "../../redux/actions/RentActions/RentActions";
import { GetSaleAction } from "../../redux/actions/SaleActions/saleActions";
import { GetCategoryAction } from "../../redux/actions/CategoriesActions/CategoriesActions";
import DynamicDataParser from "./DynamicDataParser";

const maStateToProps = (state, ownProps) => {
    const categories = getCategories(state);
    const static_page_data = getStaticPages(state);
    return { 
        ...ownProps,
        categories,
        static_page_data
    };
};

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        InitStaticPageDataAction,
        GetStaticPageDataPerPageAction,
        GetRentAction,
        GetSaleAction,
        GetCategoryAction
    }, dispatch);
};

export default connect(maStateToProps, mapActionToProps)(DynamicDataParser);