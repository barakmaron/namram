import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TextParser from '../../../components/RichTextArea/TextParser';
import { GetImageUrl } from '../../../services/ApiService';

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

    if(blog) 
        return <div className='my-5'>
            <img
            className='w-1/2 max-h-96 object-contain mx-auto'
            alt={blog.Title}
            src={GetImageUrl(blog.Image)}
            loading="lazy"/>
            <h2
            className='w-fit text-3xl text-forest-green-600 font-bold mx-auto my-14'
            >{blog.Title}</h2>
            <div 
            className='mx-10 w-fit max-w-96 text-xl mt-4'
            >
                <TextParser body={blog.Text}/>
            </div>
        </div>;
    else
        return <div>
            <CircularProgress />
        </div>;
};

export default Blog;