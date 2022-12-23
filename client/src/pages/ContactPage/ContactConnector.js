import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { SendContactForm } from "../../redux/actions/ContactFormActions";
import Contact from "./Contact";

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps
    };
};

const mapActionsToProps = (dispatch) => {
    return bindActionCreators({
        SendContactForm
    }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(Contact);