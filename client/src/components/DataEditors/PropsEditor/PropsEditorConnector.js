import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { PatchProductPropsAction, NewProductPropAction, DeletePropAction } from "../../../redux/actions/ProductsActions/propsActions";
import PropsEditor from "./PropsEditor";

const maStateToProps = (state, ownProps) => {
    return { ...ownProps };
};

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        PatchProductPropsAction,
        NewProductPropAction,
        DeletePropAction
    }, dispatch);
};

export default connect(maStateToProps, mapActionToProps)(PropsEditor);