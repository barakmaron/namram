import React, { useEffect } from 'react';

import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

import { GetBlogsAction } from "../redux/actions/BlogsActions";
import BlogsEditor from '../components/DataEditors/BlogsEditor/BlogsEditor';

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
      <BlogsEditor />
    </div>
  </div>
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps
  };
};

const mapActionToProps = (dispatch) => {
  return bindActionCreators({
    GetBlogsAction
  }, dispatch);
};

export default connect(mapStateToProps, mapActionToProps)(BlogEditorPage);