import React, { useEffect, useCallback, useRef, useState } from 'react';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DeleteIcon from '@mui/icons-material/Delete';
import { Dropdown } from 'monday-ui-react-core';
import { Button } from 'primereact/button';
import { FormHelperText, TextField } from '@mui/material';
import { MobileDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { BsCheck2Circle } from 'react-icons/bs';
import { FileUpload } from 'primereact/fileupload';

import { getErrors, getFailed, getMessage, getSuccessful } from "../../redux/selectors/ApiHandlerSelector"
import { InitApiHandlerAction } from "../../redux/actions/ApiHandlerActions";
import RichTextArea from '../RichTextArea';
import RentalToolsSelector from './RentToolsSelector';
import SignatureCapture from './SignatureCapture';
import Checkbox from './CheckBox';
import FORMS from './Forms';

import style from './Form.module.css';
import { fileToObjectUrl, objectUrlToBase64 } from '../../services/ImagesService';

function Form({
    inputs,
    controller,
    action,
    className,
    reset,
    successful,
    failed,
    message,
    errors
}) {
    const form_ref = useRef(null);
    const hasImages = inputs.find(input => input.type === FORMS.INPUTS_TYPES.FILE) ? true : false;
    const [images, setObjectUrl] = useState([]);
    const [dynamic_inputs, setDynamicInputs] = useState([]);
    const [tools, setTools] = useState([]);
    const [signature, setSignature] = useState(undefined);
    const [date, setDate] = useState();
    const [text, setText] = useState("");

    const fileUploadRef = useRef(null);

    useEffect(() => {
        if (fileUploadRef.current) {
            fileUploadRef.current.clear()
            fileUploadRef.current.setUploadedFiles(images.map(file => file.file));
        }
    }, [images]);

    const uploadToClient = useCallback(async (event) => {
        const images = await Promise.all(event.files.map(async (file) => ({
            name: file.name,
            base64Value: await objectUrlToBase64(file.objectURL),
            file: file
        })));
        setObjectUrl(images);
    }, []);

    const submit_action = useCallback(async (event) => {
        event.preventDefault();
        event.stopPropagation()
        const form_data = new FormData(form_ref?.current);
        if (hasImages) {
            form_data.append("filesNames", images.map(file => file.name));
            images.forEach((file, index) => form_data.append(`file${index}`, file.base64Value));
        } else if (signature) {
            form_data.append("filesNames", "sig");
            const sigAsBase64 = await objectUrlToBase64(fileToObjectUrl(signature));
            form_data.append("file0", sigAsBase64);
        }
        const formatted_form = Object.fromEntries(form_data);
        action(event, formatted_form, images);
    }, [form_ref, action, hasImages, signature, images]);

    useEffect(() => {
        if (reset)
            form_ref.current.reset();
    }, [reset]);

    const AddNewInputs = useCallback(() => {
        setDynamicInputs((inputs) => {
            return [...inputs, {
                id: inputs.length,
                name: "Name",
                value: "Value"
            }]
        });
    }, [setDynamicInputs]);

    const DeleteDynamicInputs = useCallback((id) => {
        setDynamicInputs(inputs => inputs.filter(input => input.id !== id));
    }, []);

    if (successful)
        return <div className='flex flex-col justify-center h-fit w-full items-center text-4xl py-10 px-4 text-forest-green-600'>
            <BsCheck2Circle />
            <span>{message}</span>
        </div>;

    return <form className={`${className || style.container}`} ref={form_ref} key={`form`} dir="rtl">
        {inputs.map(({ name, type, place_holder, ...props }, index) => {
            switch (type) {
                case FORMS.INPUTS_TYPES.FILE: {
                    return <div className='w-full flex flex-col gap-5 justify-center items-center' key={`form-input-${name}-${index}`}>
                        <FileUpload
                            ref={fileUploadRef}
                            customUpload
                            uploadHandler={uploadToClient}
                            color={errors?.[name] === undefined ? "primary" : "error"}
                            chooseLabel={place_holder}
                            accept="image/*"
                            emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>}
                            multiple
                            previewWidth={100} />
                        {errors?.[name] && <FormHelperText
                            error={true}>
                            {errors[name]}
                        </FormHelperText>}
                    </div>;
                }
                case FORMS.INPUTS_TYPES.TEXT_AREA: {
                    return <React.Fragment key={`form-input-${name}-${index}`}>
                        <RichTextArea
                            value={text}
                            setValue={setText}
                        />
                        <input
                            name={name}
                            hidden
                            value={text}
                            readOnly />
                        {errors?.[name] && <FormHelperText
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
                    return <div key={`dynamic-inputs-${name}-button`} className="flex flex-col gap-5 justify-center items-center">
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
                        <RentalToolsSelector
                            setData={setTools} />
                        <input
                            readOnly
                            hidden={true} value={JSON.stringify(tools)} name={name} />
                        {errors?.[name] && <FormHelperText
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
                        place_holder={place_holder} />;
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
                                name={name} />}
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
                        helperText={errors?.[name]}
                        {...props} />;
                }
            }
        })}
        <div>
            <Button variant="contained" id="submit" type="submit" onClick={submit_action}>שלח</Button>
        </div>
        {failed && <div className='bg-red-400 text-white border-red-500 py-2 px-4 text-lg rounded-xl'>{message}</div>}
    </form>
}

const mapStateToProps = (state, ownProps) => {
    const successful = getSuccessful(state);
    const failed = getFailed(state);
    const message = getMessage(state);
    const errors = getErrors(state);
    return {
        ...ownProps,
        successful,
        failed,
        message,
        errors
    };
};

const mapActionsToProps = (dispatch) => {
    return bindActionCreators({
        InitApiHandlerAction
    }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(Form);