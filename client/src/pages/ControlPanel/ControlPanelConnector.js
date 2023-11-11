import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import ControlPanel from "./ControlPanel";
import { GetSaleAction } from "../../redux/actions/SaleActions/saleActions";
import { getCategories } from "../../redux/selectors/categoriesSelector";
import { GetStaticPagesAction } from "../../redux/actions/StaticPageActions";

const mapStateToProps = (state, ownProps) => {
    const categories = getCategories(state);
    return { 
        ...ownProps,
        categories
    };
};

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        GetStaticPagesAction,
        GetSaleAction
    }, dispatch);
};

export default connect(mapStateToProps, mapActionToProps)(ControlPanel);