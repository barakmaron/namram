import { useState, useCallback, useEffect } from 'react';
import { FaTimes, FaTrash } from 'react-icons/fa';
import useImageLoader from '../../../hooks/useImageLoader';

function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}

const Image = ({ 
    image, 
    delete_image_action
}) => {
   const [isLoading, image_obj] = useImageLoader(image.Image, image.TempUrl);

  return <div className="relative group w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg xl:aspect-w-7 xl:aspect-h-8">
            {!isLoading && <img
            alt=""
            src={image_obj}
            className={cn(
                'group-hover:opacity-75 duration-700 ease-in-out object-cover',
                isLoading
                ? 'grayscale blur-2xl scale-110'
                : 'grayscale-0 blur-0 scale-100'
            )} />}
            
            <div 
            onClick={delete_image_action}
            className="absolute flex gap-4 h-fit w-fit px-3 py-3 cursor-pointer bg-red-500 text-white rounded-full left-72 -top-4 hover:bg-white hover:text-red-500 text-xl">
                <FaTimes></FaTimes>
            </div>
        </div>;
}

export default Image;