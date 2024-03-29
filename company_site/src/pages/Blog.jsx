import React, { useEffect, useState } from 'react';

import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

import { useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

import { GetBlogsAction } from '../redux/actions/BlogsActions';
import { getBlogs } from '../redux/selectors/blogsSelector';
import TextParser from '../components/TextParser';
import { GetImageUrl } from '../services/ApiService';

const Blog = ({
    blogs,
    GetBlogsAction
}) => {
    const [blog, setBlog] = useState(undefined);
    const url_query = useParams();

    useEffect(() => {
        GetBlogsAction();
    }, [GetBlogsAction]);

    useEffect(() => {
        const blog_id = url_query.id;
        const get_blog = blogs.find(blog => blog.id === blog_id);
        setBlog(get_blog);
    }, [blogs, url_query]);

    if (blog)
        return <div className='my-5'>
            <img
                className='sm:w-1/2 w-screen max-h-96 object-contain mx-auto'
                alt={blog.Title}
                src={GetImageUrl(blog.Image)}
                loading="lazy" />
            <h2
                className='w-fit text-3xl text-forest-green-600 font-bold mx-auto my-14'
            >{blog.Title}</h2>
            <div
                className='sm:mx-10 mx-2 w-fit max-w-96 text-xl mt-4'
            >
                <TextParser body={blog.Text} />
            </div>
        </div>;
    else
        return <div>
            <CircularProgress />
        </div>;
};

const mapStateToProps = (state, ownProps) => {
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

export default connect(mapStateToProps, mapActionToProps)(Blog);