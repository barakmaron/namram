import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { GetBlogsAction } from '../../../redux/actions/BlogsActions';
import { getBlogs } from '../../../redux/selectors/blogsSelector';
import Blog from "./Blog";

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

export default connect(maStateToProps, mapActionToProps)(Blog);