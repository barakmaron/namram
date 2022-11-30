import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GetImageUrl } from '../../services/ApiService';
import './SliderStyle.css';
import Image from '../DataEditors/ImageEditor/Image';

const ImageSlider = ({
    images
}) => {

  return <div 
  dir='ltr'
  className='sm:w-96 w-[98vw]'>
  <Slider 
  dir="ltr"
    lazyLoad={true}
    arrows={true}
    dots={true}
    dotsClass="dot"
    >
    {images?.map((image, i) => {
        return <Image 
            key={`image-slider-image-${i}`}
            id={image}
            image={image}
            no_style={true}
            alt={image.alt} />
    })}
  </Slider>
  </div>;
}

export default ImageSlider