import React from 'react';
import { useCallback, useRef, useState } from 'react';
import { Button, FormHelperText, TextareaAutosize, TextField } from '@mui/material';
import style from './Form.module.css';
import { useEffect } from 'react';
import FORMS from './Forms';
import DeleteIcon from '@mui/icons-material/Delete';
import { Dropdown } from 'monday-ui-react-core';
import RentalToolsSelectorConnector from './RentToolsSelector/RentToolsSelectorConnector';
import SignatureCapture from './SignatureCapture/SignatureCapture';
import Checkbox from './CheckBox/CheckBox';
import { MobileDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { BsCheck2Circle } from 'react-icons/bs';

export default function Form({ 
    inputs, 
    controller,
    action,
    className,
    reset,
    successful,
    failed,
    message,
    errors    
}){
    const form_ref = useRef(null);
    const has_Images = inputs.find(input => input.type === FORMS.INPUTS_TYPES.FILE) ? true : false;
    const [images, setObjectUrl] = useState([]);
    const [dynamic_inputs, setDynamicInputs] = useState([]);
    const [tools, setTools] = useState([]);
    const [signature, setSignature] = useState(undefined);
    const [date, setDate] = useState();

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
        const formatted_form = has_Images || signature ? form_data : Object.fromEntries(form_data);
        signature && formatted_form.append("Signature", signature);
        action(event, formatted_form, images);
    }, [form_ref, action, has_Images, signature, images]);

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

    if(successful)
        return <div className='flex flex-col justify-center h-fit w-full items-center text-4xl py-10 px-4 text-forest-green-600'>
            <BsCheck2Circle/>
            <span>{message}</span>
        </div>;

    return <form className={`${className || style.container}`} ref={form_ref} key={`form`} dir="rtl">
        {inputs.map(({ name, type, place_holder }, index) => {
            switch(type){
                case FORMS.INPUTS_TYPES.FILE: {
                    return <div className='w-full flex flex-col gap-5 justify-center items-center' key={`form-input-${name}-${index}`}>
                        <Button
                        variant="outlined"
                        component="label"
                        onChange={uploadToClient}
                        color={errors?.[name] === undefined ? "primary" : "error" }>
                            {place_holder}
                            <input
                            type={type}
                            name={name}
                            multiple
                            hidden 
                            required/>                            
                        </Button>
                        { errors?.[name] && <FormHelperText
                            error={true}>
                                {errors[name]}
                            </FormHelperText>}
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
                    return <React.Fragment>
                        <TextareaAutosize 
                        placeholder={place_holder}
                        name={name} 
                        minRows={3} 
                        className="w-full border-2 border-slate-400 rounded"
                        key={`form-input-${name}-${index}`}/>
                        { errors?.[name] && <FormHelperText
                            error={true}>
                                {errors[name]}
                            </FormHelperText>}
                        </React.Fragment>;
                }
                case FORMS.INPUTS_TYPES.DATA_LIST: { 
                    return <Dropdown 
                    key={`form-input-${name}-${index}`}
                    placeholder={place_holder} 
                    options={controller[index].list} 
                    onChange={controller[index].onChange}
                    name={name}
                    className={`w-60 z-${10 * (index % 5 + 1)}`} />
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
                case FORMS.INPUTS_TYPES.RENT_TOOLS_SELECTOR: {
                    return <React.Fragment key={`rent-tools-selector-${name}`} >
                    <RentalToolsSelectorConnector
                    setData={setTools}/>
                    <input 
                    readOnly
                    hidden={true} value={JSON.stringify(tools)} name={name} />
                     { errors?.[name] && <FormHelperText
                            error={true}>
                                {errors[name]}
                            </FormHelperText>}
                    </React.Fragment>;
                }
                case FORMS.INPUTS_TYPES.SIGNATURE_FIELD: {
                    return <div className='w-full flex justify-center'
                    key={`signature-${name}`}>
                        <SignatureCapture
                        name={name}
                        setSignature={setSignature}
                        error={errors?.Signature} />
                    </div>;
                }
                case FORMS.INPUTS_TYPES.CHECK_BOX: {
                    return <Checkbox
                        key={`checkbox-${name}`}    
                        name={name}                    
                        place_holder={place_holder}/>;
                }
                case FORMS.INPUTS_TYPES.DATE: {
                    return <LocalizationProvider 
                    dateAdapter={AdapterDayjs}>
                        <MobileDatePicker
                        label={place_holder}
                        inputFormat="DD/MM/YYYY"
                        value={date}
                        onChange={(value) => setDate(value)}
                        renderInput={(params) => <TextField 
                            {...params}
                            name={name}/>}                
                        />
                    </LocalizationProvider>
                }
                default: {
                    return <TextField 
                    name={name} 
                    type={type} 
                    label={place_holder} 
                    key={`form-input-${name}-${index}`}
                    error={errors?.[name] === undefined ? false : true}
                    helperText={errors?.[name]} />;
                }
            }    
        })}
        <div>
            <Button variant="contained" id="submit" type="submit" onClick={submit_action}>Submit</Button>
        </div>
        { failed && <div className='bg-red-400 text-white border-red-500 py-2 px-4 text-lg rounded-xl'>{message}</div>}
    </form>
}