import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useCallback } from 'react';
import RichTextArea from '../../RichTextArea/RichTextArea';

const TextEditor = ({
    text,
    PatchProductAction,
    product_id,
    category_id,
    product_type
}) => {
    const [editor, setEditor] = useState(text);

    const save_call_back = useCallback(() => {
        PatchProductAction(product_id, category_id, "Text", editor, product_type);
    }, [PatchProductAction, product_id, category_id, editor, product_type]);

  return (<div className='w-96 flex flex-col gap-5 justify-center items-center'>
    <div>
        <RichTextArea
        value={editor}
        setValue={setEditor}/>
    </div>
    <Button
    onClick={save_call_back}
    variant='outlined'>
        שמור
    </Button>
  </div>);
};

export default TextEditor;