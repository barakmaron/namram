import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import RentToolsSelector from "./RentToolsSelector";
import { GetRentOnlyAvailableAction } from "../../../redux/actions/RentActions/RentActions";
import { getCategories } from "../../../redux/selectors/categoriesSelector";

const mapStateToProps = (state, ownProps) => {
    const categories = getCategories(state);
    return { ...ownProps, categories };
};

const mapActionsToProps = (dispatch) => {
    return bindActionCreators({
        GetRentOnlyAvailableAction
    }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(RentToolsSelector);