import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Login from "./Login";
import { LoginAction, LogoutAction } from '../../../redux/actions/UserActions';

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps
    };
};

const mapActionsToProps = (dispatch) => {
    return bindActionCreators({
        LoginAction,
        LogoutAction
    }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(Login);