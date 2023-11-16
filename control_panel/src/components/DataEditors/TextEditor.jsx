import React, { useState, useCallback } from 'react';

import { Button } from '@mui/material';

import RichTextArea from '../RichTextArea';
import { saveTitle } from '../../strings';

const TextEditor = ({
    text,
    Action,
    meta_data
}) => {
    const [editor, setEditor] = useState(text);

    const save_call_back = useCallback(() => {
        Action("Text", editor, ...Object.values(meta_data));
    }, [Action, editor, meta_data]);

    return (<div className='w-96 flex flex-col gap-5 justify-center items-center'>
        <div>
            <RichTextArea
                value={editor}
                setValue={setEditor} />
        </div>
        <Button
            onClick={save_call_back}
            variant='outlined'>
            {saveTitle}
        </Button>
    </div>);
};

export default TextEditor;