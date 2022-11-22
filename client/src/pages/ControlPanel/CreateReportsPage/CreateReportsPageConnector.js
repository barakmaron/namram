import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import CreateReportsPage from "./CreateReportsPage";

const maStateToProps = (state, ownProps) => {
    return { 
        ...ownProps, 
    };
};

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
    }, dispatch);
};

export default connect(maStateToProps, mapActionToProps)(CreateReportsPage);