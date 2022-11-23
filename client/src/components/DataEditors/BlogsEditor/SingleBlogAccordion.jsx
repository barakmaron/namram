import React, { useEffect } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Button, TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Image from '../ImageEditor/Image';
import RichTextArea from '../../RichTextArea/RichTextArea';
import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const SingleBlogAccordion = ({
    blog,
    SaveEditAction,
    DeleteBlogAction
}) => {

    const [title, setTitle] = useState(blog.Title);
    const [text, setText] = useState(blog.Text);

    useEffect(() => {
      setTitle(blog.Title);
      setText(blog.Text);
    }, [blog]);

  return <Accordion>
      <AccordionSummary
      expandIcon={<ExpandMoreIcon/>}
      >
        <div 
        className='flex justify-around gap-5 w-full'>
          <TextField
          className='w-96'
          value={title}
          onChange={(event) => setTitle(event.currentTarget.value)}
          label="Title"
          type="text" />
          <div className='flex gap-4'>
            <Button
            onClick={(event) => SaveEditAction(event, blog.id, title, text)}
            variant="outlined">
              save
            </Button>
            <Button
            className=''
            color='error'
            variant="outlined"
            onClick={(event) => DeleteBlogAction(event, blog.id)}>
              <FaTimes/>
            </Button>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
          <Image
          image={blog}
          />
          <RichTextArea
          value={text}
          setValue={setText}/>          
      </AccordionDetails>
  </Accordion>;
}

export default SingleBlogAccordion;