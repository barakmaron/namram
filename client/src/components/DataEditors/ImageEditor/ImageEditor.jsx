import { Button } from '@mui/material';
import React from 'react';
import { useRef } from 'react';
import { useCallback, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import FORMS from '../../Form/Forms';
import Image from './Image';

const ImageEditor = ({
    images,
    product_id,
    category_id,
    AddImagesAction,
    DeleteImageAction,
    product_type
}) => { 
    const form_ref = useRef(null);

    const UploadToServer = useCallback((event, images) => {
        event.preventDefault();
        const images_form = new FormData(form_ref?.current);
        AddImagesAction(category_id, product_id, images_form, images, product_type);
    }, [AddImagesAction, category_id, product_id, product_type]);

    const uploadToClient = useCallback(event => {
        if(event.target.files) {
            const images = [];
            const { files } = event.target;
            for(let index = 0; index < files.length; index++)
                images.push(URL.createObjectURL(files[index]));
            UploadToServer(event, images);
        }
    }, [UploadToServer]);   

    const delete_image = useCallback((image_id) => {
        DeleteImageAction(category_id, product_id, image_id, product_type);
    }, [category_id, product_id, DeleteImageAction, product_type]);

  return (<div className='w-full'>
    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-2 xl:grid-cols-2 xl:gap-x-8">
            {images.map((image, index) => {
                return <Image
                key={`image-editor-${product_id}-${index}`}
                delete_image_action={() => delete_image(image.id)}
                image={image}></Image>;
            })}  
            <Button
            className="relative group w-full aspect-w-1 aspect-h-1 rounded-lg xl:aspect-w-7 xl:aspect-h-8"
            variant='outlined'
            component="label"
            onChange={uploadToClient}>
                <form ref={form_ref}>
                <FaPlus
                className='text-6xl'></FaPlus>
                <input
                type={FORMS.INPUTS_TYPES.FILE}
                name={'images'}
                multiple
                hidden />
                </form>
            </Button>
        </div>
    </div>
  </div>);
};

export default ImageEditor;