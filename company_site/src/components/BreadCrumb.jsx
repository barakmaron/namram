import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@mui/material';
import Constants from '../Constants';
import { FaChevronLeft } from 'react-icons/fa';

export default function BreadCrumb({ category, product }) {
    return <Card
        dir='rtl'
        className='sm:w-full mx-auto flex justify-baseline items-center sm:px-4 px-2'>
        <Link
            to={`/${Constants.CATEGORY_TYPE[category.Type]}`}
            className='py-2 hover:underline '>
            {category.Type.toLowerCase().includes(Constants.API_PRODUCT_TYPE.SALE) ? `מכירת ציוד` : `השכרת ציוד`}
        </Link>
        <div className='py-2 px-2'><FaChevronLeft /></div>
        <Link
            to={`/category/${category.id}`}
            className='py-2 hover:underline'>
            {category.Name}
        </Link>
        {product && <>
            <div className='py-2 px-2'><FaChevronLeft /></div>
            <Link
                to={`/category/${category.id}/product/${product.id}`}
                className='hover:underline py-2'>
                {product.Product.Name}
            </Link>
        </>}
    </Card>
}
