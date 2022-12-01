import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Constants from '../../Constants';

const CategoryPage = ({
    categories
}) => {

    const [category, setCategory] = useState(undefined);
    const url_query = useParams();
    const category_id = url_query.id;

    useEffect(() => {
        setCategory(categories?.find(category => category.id === category_id));
    }, [categories, category_id]);

  return category && <div 
  dir='rtl'
  className='bg-forest-green-600 text-white rounded-b-xl w-1/2 mx-auto flex justify-start items-center px-4'>
    <Link 
    to={`/${Constants.CATEGORY_TYPE[category.Type]}`}
    className='text-2xl py-5 hover:underline hover:text-amber-400 hover:font-bold'>
        {category.Type.toLowerCase().includes(Constants.CATEGORY_TYPE.Sale) ? `מכירת ציוד` : `השכרת ציוד`}
    </Link> 
    <span className='text-3xl px-2'> / </span>
    <Link 
    to={`/category/${category_id}`}
    className='text-2xl py-5 hover:underline hover:text-amber-400 hover:font-bold'>
        {category.Name}
    </Link>
  </div>;
}

export default CategoryPage;