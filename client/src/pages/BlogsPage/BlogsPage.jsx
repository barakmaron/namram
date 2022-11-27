import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../components/DataEditors/ImageEditor/Image';
import hexStyle from '../../hexagons.module.css';

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
      {blogs?.map(blog => {
        return <li
        key={`blog-${blog.id}`}
        className={hexStyle.hex}>
          <div
          className={hexStyle.hexIn}>
            <Link 
            to={`/blog/${blog.id}`}
            className={hexStyle.hexLink}>
              <h3 
              className='text-white'
              >{blog.Title}</h3>
              <div className='w-12 h-1 my-2 border-b-[1px] border-white border-solid'></div>
              <Image
              no_style={true}
              alt={blog.Title}
              image={blog} />
              <p></p>
            </Link>
          </div>          
        </li>;
      })}
    </ul>
  </div>
};

export default BlogsPage;