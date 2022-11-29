import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Login from "./Login";
import { LoginAction, LogoutAction } from '../../../redux/actions/UserActions';
import { getLoggedIn } from "../../../redux/selectors/userSelector";

const mapStateToProps = (state, ownProps) => {
    const logged_in = getLoggedIn(state);
    return {
        ...ownProps,
        logged_in
    };
};

const mapActionsToProps = (dispatch) => {
    return bindActionCreators({
        LoginAction,
        LogoutAction
    }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(Login);