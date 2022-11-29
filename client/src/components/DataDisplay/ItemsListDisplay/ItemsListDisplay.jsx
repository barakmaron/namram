
import { Link } from 'react-router-dom';
import React from 'react'
import Image from '../../DataEditors/ImageEditor/Image';

const ItemsListDisplay = ({
    list,
    base_link
}) => {
  return <ul className='w-[98vw] px-10 py-4 flex flex-wrap justify-center items-center gap-2'>
    { list?.map(item => {
        return <li 
        className='w-[275px] h-[275px]'
        key={`list-item-${item.id}`}>
            <Link 
            className='no-underline cursor-pointer group'
            to={`${base_link}/${item.id}`}>
                <>
                    <Image
                    alt={item.name}
                    no_style={true}
                    loading='lazy'
                    image={item}/>
                    <h3
                    className='text-4xl py-2 text-forest-green-600 bg-amber-400 border-b-8 border-solid border-transparent border-x-8 font-bold text-center group-hover:border-b-amber-400 group-hover:text-amber-400 group-hover:bg-forest-green-600'>
                        {item.name}
                    </h3>
                </>
            </Link>
        </li>;
    }) }
  </ul>;
};

export default ItemsListDisplay;