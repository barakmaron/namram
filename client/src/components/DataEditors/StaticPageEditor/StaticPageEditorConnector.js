import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import StaticPageEditor from "./StaticPageEditor";
import { getCategories } from "../../../redux/selectors/categoriesSelector";
import { AddStaticPageAction, DeleteStaticPageAction } from "../../../redux/actions/StaticPageActions";
import { getStaticPages } from "../../../redux/selectors/staticPagesSelector";

const maStateToProps = (state, ownProps) => {
    const categories = getCategories(state);
    const static_page_data = getStaticPages(state).filter(page => page.PageRoute === ownProps.page_route);
    return { 
        ...ownProps,
        categories,
        static_page_data
    };
};

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        AddStaticPageAction,
        DeleteStaticPageAction
    }, dispatch);
};

export default connect(maStateToProps, mapActionToProps)(StaticPageEditor);