import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@mui/material';
import Image from './Image';
import { FaTags } from 'react-icons/fa';

const ItemsListDisplay = ({
    list
}) => {
    return <div className='w-full mb-8 p-2 sm:p-0'>
        <div className='flex flex-row flex-wrap sm:w-full lg:w-4/6 mx-auto gap-2 md:gap-0 lg:gap-3'>
            {list?.map(item => <React.Fragment key={`list-item-${item.id}`}>
                <Card className='w-full md:w-2/6 lg:w-1/6 no-underline cursor-pointer h-[405px] border-[0.1px] border-opacity-20 border-blue-500 shadow-none'>
                    <CardContent className='relative flex flex-col items-end gap-2'>
                        <Link className='hover:underline' to={`${item.categoryUrl}`}>
                            <div className='flex flex-row gap-2 justify-start w-fit items-center rounded pr-[2px] pl-2 font-bold text-white bg-light-green-base'>
                                {item.categoryName} <FaTags />
                            </div>
                        </Link>
                        <Link className='group flex flex-col gap-2 justify-between h-[350px] mx-auto' to={`${item.baseUrl}`}>
                            <Image
                                alt={item.name}
                                no_style={true}
                                loading='lazy'
                                image={item} />
                            <h3 dir='rtl' className='text-x border-b-2 border-solid border-transparent border-x-2 font-bold text-center group-hover:border-b-blue-400'>
                                {item.name}
                            </h3>
                        </Link>
                    </CardContent>
                </Card>
            </React.Fragment>)}
        </div>
    </div>;
};

export default ItemsListDisplay;