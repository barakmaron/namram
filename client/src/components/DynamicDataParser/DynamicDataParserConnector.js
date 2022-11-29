import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { getCategories } from "../../redux/selectors/categoriesSelector";
import { GetStaticPageDataPerPageAction } from "../../redux/actions/StaticPageActions";
import { getStaticPages } from "../../redux/selectors/staticPagesSelector";
import { GetRentAction } from "../../redux/actions/RentActions/RentActions";
import { GetSaleAction } from "../../redux/actions/SaleActions/saleActions";
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
        GetStaticPageDataPerPageAction,
        GetRentAction,
        GetSaleAction
    }, dispatch);
};

export default connect(maStateToProps, mapActionToProps)(DynamicDataParser);