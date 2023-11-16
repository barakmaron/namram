import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import App from './App';
import { getLoggedIn } from './redux/selectors/userSelector';
import { AuthUserAction } from './redux/actions/UserActions';

const mapStateToProps = (state, ownProps) => {
    const logged_in = getLoggedIn(state);
    return { 
        ...ownProps, 
        logged_in 
    };
};

const mapActionsToProps = (dispatch) => {
    return bindActionCreators({
        AuthUserAction
     }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(App);