import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { getCategories } from "../../../../redux/selectors/categoriesSelector";
import { GetRentAction } from "../../../../redux/actions/RentActions/RentActions";
import IncomeReport from "./IncomeReport";

const maStateToProps = (state, ownProps) => {
    const rent_categories = getCategories(state);
    return { 
        ...ownProps, 
        rent_categories
    };
};

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        GetRentAction
    }, dispatch);
};

export default connect(maStateToProps, mapActionToProps)(IncomeReport);