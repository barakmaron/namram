import { Link } from 'react-router-dom';
import React from 'react'
import Image from '../../DataEditors/ImageEditor/Image';

const ItemsListDisplay = ({
    list
}) => {
  return <ul className='w-[98vw] px-10 py-4 flex flex-wrap justify-center items-baseline gap-2'>
    { list?.map(item => {
        return <li 
        className='max-w-[275px] min-h-[275px] min-w-[275px] relative'
        key={`list-item-${item.id}`}>
            <Link 
            className='no-underline cursor-pointer group'
            to={`${item.base_url}/${item.id}`}>
                <>
                    <Image
                    alt={item.name}
                    no_style={true}
                    loading='lazy'
                    image={item}/>
                    <h3
                    className='absolute bottom-0 w-full sm:text-4xl text-2xl py-2 text-forest-green-600 bg-amber-400 border-b-8 border-solid border-transparent border-x-8 font-bold text-center group-hover:border-b-amber-400 group-hover:text-amber-400 group-hover:bg-forest-green-600'>
                        {item.name}
                    </h3>
                </>
            </Link>
        </li>;
    }) }
  </ul>;
};

export default ItemsListDisplay;