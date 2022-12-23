import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { getBlogs } from "../../../redux/selectors/blogsSelector";
import { GetBlogsAction, AddBlogAction, DeleteBlogAction, EditBlogAction } from "../../../redux/actions/BlogsActions";
import BlogsEditor from "./BlogsEditor";

const maStateToProps = (state, ownProps) => {
    const blogs = getBlogs(state);
    return { 
        ...ownProps,
        blogs
    };
};

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        GetBlogsAction,
        AddBlogAction,
        DeleteBlogAction,
        EditBlogAction
    }, dispatch);
};

export default connect(maStateToProps, mapActionToProps)(BlogsEditor);