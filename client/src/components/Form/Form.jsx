import { useCallback, useRef, useState } from 'react';
import { Button, TextareaAutosize, TextField, Select, MenuItem } from '@mui/material';
import style from './Form.module.css';
import { useEffect } from 'react';
import FORMS from './Forms';
import DeleteIcon from '@mui/icons-material/Delete';
import { Dropdown } from 'monday-ui-react-core';
export default function Form({ 
    inputs, 
    controller,
    action,
    reset,
    failed,
    message 
}){
    const form_ref = useRef(null);
    const [images, setObjectUrl] = useState([]);
    const [dynamic_inputs, setDynamicInputs] = useState([]);

    const uploadToClient = useCallback(event => {
        if(event.target.files) {
            const images = [];
            const { files } = event.target;
            for(let file of files)
                images.push(URL.createObjectURL(file));
            setObjectUrl(images);
        }
    }, []);

    const submit_action = useCallback((event) => {
        event.preventDefault();
        const form_data = new FormData(form_ref?.current);
        const formatted_form = images.length ? form_data : Object.fromEntries(form_data);
        action(event, formatted_form, images);
    }, [form_ref, action, images]);

    useEffect(() => {
        if(reset)
            form_ref.current.reset();
    }, [reset]);

    const AddNewInputs = useCallback(() => {
        setDynamicInputs((inputs) => {
            return [ ...inputs, {
                id: inputs.length,
                name: "Name",
                value: "Value"
            }]
        });
    }, [setDynamicInputs]);

    const DeleteDynamicInputs = useCallback((id) => {
        setDynamicInputs(inputs => inputs.filter(input => input.id !== id));
    }, []);

    return <form className={style.container} ref={form_ref} dir="rtl">
        {inputs.map(({ name, type, place_holder }, index) => {
            switch(type){
                case FORMS.INPUTS_TYPES.FILE: {
                    return <div className='w-full flex flex-col gap-5 justify-center items-center' key={`form-input-${name}-${index}`}>
                        <Button
                        variant="outlined"
                        component="label"
                        onChange={uploadToClient}>
                            {place_holder}
                            <input
                            type={type}
                            name={name}
                            multiple
                            hidden />
                        </Button>
                        <div className="group w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                            {images.map((img, index) => <img 
                                src={img} 
                                key={`image-uploaded-client-${index}`}
                                className="object-cover"
                                alt=""/>
                            )}                            
                        </div>
                    </div>;
                }
                case FORMS.INPUTS_TYPES.TEXT_AREA: {
                    return <TextareaAutosize 
                    placeholder={place_holder}
                    name={name} 
                    minRows={3} 
                    className="w-full border-2 border-slate-400 rounded"
                    key={`form-input-${name}-${index}`}/>;
                }
                case FORMS.INPUTS_TYPES.DATA_LIST: { 
                    return <Dropdown 
                    key={`form-input-${name}-${index}`}
                    placeholder={place_holder} 
                    options={controller[index].list} 
                    onChange={controller[index].onChange}
                    name={name}
                    className={`w-60 z-[10 * ${inputs.length - index}]`} />
                }
                case FORMS.INPUTS_TYPES.DYNAMIC_INPUTS: {
                    return  <div key={`dynamic-inputs-${name}-button`} className="flex flex-col gap-5 justify-center items-center"> 
                        {dynamic_inputs.map((input) => {
                            return <div key={`dynamic-inputs-${input.id}`}>
                                <div className='flex flex-row gap-3'>
                                    <TextField 
                                    name={`${input.id}_${name}_prop_name`} 
                                    placeholder={input.name}
                                    label={"Name"} />
                                    <TextField 
                                    name={`${input.id}_${name}_prop_value`} 
                                    placeholder={input.value}
                                    label={"Value"} />
                                    <Button 
                                    onClick={() => DeleteDynamicInputs(input.id)}
                                    variant="outlined">
                                        <DeleteIcon />
                                    </Button>
                                </div>
                            </div>;
                        })}
                        <Button
                        variant="outlined"
                        component="label"
                        onClick={AddNewInputs} >
                            {place_holder}
                        </Button>
                    </div>;
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