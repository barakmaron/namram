import { Button } from '@mui/material';
import React from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import FormConnector from '../../Form/FormConnector';
import Modal from '../../Modal/Modal';
import SingleAccordion from '../SingleAccordion/SingleAccordion';
import BlogsForms from './FormsConstants';

const BlogsEditor = ({
    blogs,
    AddBlogAction,
    EditBlogAction,
    DeleteBlogAction
}) => {

    const [show_new_blog_form, setShowNewBlogForm] = useState(false);

    const add_blog = useCallback((event, form, image) => {
        event.preventDefault();
        AddBlogAction(form, image);
    }, [AddBlogAction]);

    const delete_blog = useCallback((event, blog_id) => {
        event.stopPropagation();
        DeleteBlogAction(blog_id);
    }, [DeleteBlogAction]);

    const edit_blog = useCallback((event, blog_id, title, text) => {
        event.stopPropagation();
        EditBlogAction(blog_id, title, text);
    }, [EditBlogAction]);

  return <div className='flex fle-row min-h-[20rem] w-full justify-center'>
    <Button
    variant="outlined"
    onClick={() => setShowNewBlogForm(true)}>
        <FaPlus/>
    </Button>
    <div className='w-1/2'>
        {blogs.map((blog, index) => {
            return <SingleAccordion 
            key={`blogs-editor-${index}`}
            object={blog}
            DeleteAction={delete_blog}
            SaveEditAction={edit_blog}/>;
        })}
    </div>
    { show_new_blog_form && <Modal setClose={() => setShowNewBlogForm(false)}>
        <FormConnector
        inputs={BlogsForms.add_blog}
        action={add_blog}/>
    </Modal>}
  </div>;
};

export default BlogsEditor;