import React, { useState, useEffect, useCallback } from 'react';
import { CircularProgress } from '@mui/material';

import { StaticFileLoader } from '../../services/ApiService';
import './SliderStyle.css';

const ImageGallery = ({ images }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [loadedImages, setLoadedImages] = useState([]);
    const [loadedThumbImages, setLoadedThumbImages] = useState([]);

    const getThumbImages = useCallback(async () => {
        setLoadedThumbImages(await Promise.all(images?.map(async image => {
            const [imageName] = image.Image.split('.');
            return URL.createObjectURL(await StaticFileLoader(`${imageName}_thumb.webp`, 'images'));
        })));
    }, [images]);

    const getImages = useCallback(async () => {
        setLoadedImages(await Promise.all(images?.map(async image => {
            const imageUrl = await StaticFileLoader(image.Image, 'images');
            return imageUrl ? URL.createObjectURL(imageUrl) : null;
        })));
    }, [images]);

    useEffect(() => {
        getThumbImages();
    }, [getThumbImages]);

    useEffect(() => {
        getImages();
    }, [getImages]);

    const handleImageClick = useCallback((index) => {
        setCurrentImage(index);
    }, []);

    return (
        <div className="pt-2 flex flex-col items-center ">
            <div className="whitespace-no-wrap mb-2">
                {loadedImages.map((image, index) => (
                    <React.Fragment key={index}>
                        {image ? index === currentImage && (
                            <img
                                src={image}
                                alt={`Product ${index + 1}`}
                                className="max-w-full mx-auto h-[24rem] object-contain"
                            />
                        ) : (
                            <div className="max-w-full h-auto flex items-center justify-center">
                                <CircularProgress />
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
            <div className="flex justify-start">
                {loadedThumbImages.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Product Thumbnail ${index + 1}`}
                        onClick={() => handleImageClick(index)}
                        className={`w-[56px] h-[56px] mx-2 cursor-pointer border-2 rounded ${index === currentImage ? 'border-blue-500' : 'border-gray-300'
                            }`}
                        loading="lazy"
                    />
                ))}
            </div>
        </div >
    );
};

export default ImageGallery;
