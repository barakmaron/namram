import React, { useEffect, useState } from 'react';

import { Accordion, AccordionDetails, AccordionSummary, Button, TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FaTimes } from 'react-icons/fa';

import Image from './ImageEditor/Image';
import RichTextArea from '../RichTextArea';
import ImageEditor from './ImageEditor/ImageEditor';
import { saveTitle } from '../../strings';

const SingleAccordion = ({
  object,
  SaveEditAction,
  DeleteAction,
  ImagesActions
}) => {

  const [title, setTitle] = useState(object.Title);
  const [text, setText] = useState(object.Text);

  useEffect(() => {
    setTitle(object.Title);
    setText(object.Text);
  }, [object]);

  return <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
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
            onClick={(event) => SaveEditAction(event, object.id, title, text)}
            variant="outlined">
            {saveTitle}
          </Button>
          <Button
            className=''
            color='error'
            variant="outlined"
            onClick={(event) => DeleteAction(event, object.id)}>
            <FaTimes />
          </Button>
        </div>
      </div>
    </AccordionSummary>
    <AccordionDetails>
      {ImagesActions ?
        <ImageEditor
          images={object.ProjectsImages}
          AddImagesAction={ImagesActions.AddImagesAction}
          DeleteImageAction={ImagesActions.DeleteImageAction}
          meta_data={{
            id: object?.id
          }} /> :
        (object?.Image?.length || object.TempUrl) && <Image
          image={object}
        />}
      <RichTextArea
        value={text}
        setValue={setText} />
    </AccordionDetails>
  </Accordion>;
}

export default SingleAccordion;