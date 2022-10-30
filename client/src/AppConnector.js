import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import App from './App';
import { getLoggedIn } from './redux/selectors/userSelector';

const mapStateToProps = (state, ownProps) => {
    const logged_in = getLoggedIn(state);
    return { ...ownProps, logged_in };
};

const mapActionsToProps = (dispatch) => {
    return bindActionCreators({ }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(App);