import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { DeleteImageAction, AddImagesAction } from "../../../redux/actions/ProductsActions/imagesActions";
import ImageEditor from "./ImageEditor";

const maStateToProps = (state, ownProps) => {
    return { ...ownProps };
};

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        DeleteImageAction,
        AddImagesAction
    }, dispatch);
};

export default connect(maStateToProps, mapActionToProps)(ImageEditor);