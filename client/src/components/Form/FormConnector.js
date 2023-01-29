import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getErrors, getFailed, getMessage, getSuccessful } from "../../redux/selectors/ApiHandlerSelector"
import { InitApiHandlerAction } from "../../redux/actions/ApiHandlerActions";
import Form from "./Form";

const mapStateToProps = (state, ownProps) => {
    const successful = getSuccessful(state);
    const failed = getFailed(state);
    const message = getMessage(state);
    const errors = getErrors(state);
    return {
        ...ownProps,
        successful,
        failed,
        message,
        errors
    };
};

const mapActionsToProps = (dispatch) => {
    return bindActionCreators({
        InitApiHandlerAction
    }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(Form);