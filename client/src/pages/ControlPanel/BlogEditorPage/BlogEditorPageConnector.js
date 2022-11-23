import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import BlogEditorPage from "./BlogEditorPage";
import { getBlogs } from "../../../redux/selectors/blogsSelector";
import { GetBlogsAction } from "../../../redux/actions/BlogsActions";

const maStateToProps = (state, ownProps) => {
    const blogs = getBlogs(state);
    return { 
        ...ownProps,
        blogs
    };
};

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        GetBlogsAction
    }, dispatch);
};

export default connect(maStateToProps, mapActionToProps)(BlogEditorPage);