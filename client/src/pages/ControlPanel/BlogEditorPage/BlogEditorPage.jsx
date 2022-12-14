import React, { useEffect } from 'react';
import BlogsEditorConnector from '../../../components/DataEditors/BlogsEditor/BlogsEditorConnector';

const BlogEditorPage = ({
    GetBlogsAction
}) => {

    useEffect(() => {
        GetBlogsAction();
    }, [GetBlogsAction]);

  return <div className='flex-1'>
    <div className='w-full mx-auto flex flex-col'>
      <h2 className="w-fit mx-auto my-4 text-4xl font-bold text-green-600">
        בלוגים
      </h2>
      <BlogsEditorConnector />
    </div>
  </div>
};

export default BlogEditorPage;