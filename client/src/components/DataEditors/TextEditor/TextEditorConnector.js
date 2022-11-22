import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import TextEditor from "./TextEditor";
import { PatchProductAction } from "../../../redux/actions/ProductsActions/ProductsActions";

const maStateToProps = (state, ownProps) => {
    return { ...ownProps };
};

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        PatchProductAction
    }, dispatch);
};

export default connect(maStateToProps, mapActionToProps)(TextEditor);