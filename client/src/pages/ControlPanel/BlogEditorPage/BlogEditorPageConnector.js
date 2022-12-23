import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import BlogEditorPage from "./BlogEditorPage";
import { GetBlogsAction } from "../../../redux/actions/BlogsActions";

const maStateToProps = (state, ownProps) => {
    return { 
        ...ownProps
    };
};

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        GetBlogsAction
    }, dispatch);
};

export default connect(maStateToProps, mapActionToProps)(BlogEditorPage);