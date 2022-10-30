import { useCallback, useRef, useState } from 'react';
import { Button, TextareaAutosize, TextField } from '@mui/material';
import style from './Form.module.css';
import { useEffect } from 'react';
import Constants from '../../Constants';

export default function Form({ 
    inputs, 
    action,
    reset,
    failed,
    message 
}){
    const form_ref = useRef(null);
    const [has_files, setHasFiles] = useState(false);
    const [createObjectUrl, setObjectUrl] = useState("");

    const uploadToClient = useCallback(event => {
        if(event.target.files && event.target.files[0]) {
            const [img] = event.target.files;
            setObjectUrl(URL.createObjectURL(img));
        }
    }, []);

    const submit_action = useCallback((event) => {
        event.preventDefault();
        const form_data = new FormData(form_ref?.current);
        const formatted_form = has_files ? form_data : Object.fromEntries(form_data);
        action(event, formatted_form, has_files && createObjectUrl);
    }, [form_ref, action, has_files, createObjectUrl]);

    useEffect(() => {
        if(reset)
            form_ref.current.reset();
    }, [reset]);

    return <form className={style.container} ref={form_ref} dir="rtl">
        {inputs.map(({ name, type, place_holder }, index) => {
            switch(type){
                case Constants.INPUTS_TYPES.FILE: {
                    !has_files && setHasFiles(true);
                    return <div className='w-full flex flex-col gap-5 justify-center items-center' key={`form-input-${name}-${index}`}>
                        <Button
                        variant="outlined"
                        component="label"
                        onChange={uploadToClient}>
                            {place_holder}
                            <input
                            type={type}
                            name={name}
                            hidden />
                        </Button>
                        <div className="group w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                            <img 
                            src={createObjectUrl} 
                            className="object-cover"
                            alt=""/>
                        </div>
                    </div>;
                }
                case Constants.INPUTS_TYPES.TEXT_AREA: {
                    return <TextareaAutosize 
                    placeholder={place_holder}
                    name={name} 
                    minRows={3} 
                    className="w-full border-2 border-slate-400 rounded"
                    key={`form-input-${name}-${index}`}/>;
                }
                default: {
                    return <TextField 
                    name={name} 
                    type={type} 
                    label={place_holder} 
                    key={`form-input-${name}-${index}`} />;
                }
            }    
        })}
        <Button variant="contained" id="submit" type="submit" onClick={submit_action}>Submit</Button>
        { failed && <div className='bg-red-400 text-white border-red-500 py-2 px-4 text-lg rounded-xl'>{message}</div>}
    </form>
}