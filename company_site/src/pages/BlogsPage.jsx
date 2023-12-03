import React, { useEffect } from 'react';

import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { GetBlogsAction } from '../redux/actions/BlogsActions';
import { getBlogs } from '../redux/selectors/blogsSelector';

import Image from '../components/Image';
import hexStyle from '../hexagons.module.css';

const BlogsPage = ({
  blogs,
  GetBlogsAction
}) => {

  useEffect(() => {
    GetBlogsAction();
  }, [GetBlogsAction]);

  return <div>
    <h2 className='text-5xl text-forest-green-600 font-bold w-fit mx-auto my-10 '>מאמרים</h2>
    <ul className={`${hexStyle.hexGrid}`} dir='rtl'>
      {blogs?.map(blog => <li key={`blog-${blog.id}`} className={hexStyle.hex}>
        <div className={hexStyle.hexIn}>
          <Link to={`/blog/${blog.id}`} className={hexStyle.hexLink}>
            <h3 className='text-white'>{blog.Title}</h3>
            <div className='w-12 h-1 my-2 border-b-[1px] border-white border-solid'></div>
            <Image no_style={true} alt={blog.Title} image={blog} />
            <p></p>
          </Link>
        </div>
      </li>
      )}
    </ul>
  </div>
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

export default connect(mapStateToProps, mapActionToProps)(BlogsPage);