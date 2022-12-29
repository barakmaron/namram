import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import Constants from '../../Constants';

const CategoryPage = ({
    categories,
    GetCategoryAction
}) => {

    const [category, setCategory] = useState(undefined);
    const url_query = useParams();
    const category_id = url_query.id;

    useEffect(() => {
        GetCategoryAction(category_id);
    }, [GetCategoryAction, category_id]);

    useEffect(() => {
        setCategory(() => categories?.find(category => category.id === category_id));
    }, [categories, category_id]);

  return category && <>
  <Helmet>
        <title>נמרם | {category.Name} </title>
    </Helmet>
    <div 
  dir='rtl'
  className='bg-forest-green-600 text-white rounded-b-xl sm:w-1/2 mx-auto flex justify-start items-center sm:px-4 px-2'>
    <Link 
    to={`/${Constants.CATEGORY_TYPE[category.Type]}`}
    className='sm:text-2xl text-xl py-5 hover:underline hover:text-amber-400 hover:font-bold'>
        {category.Type.toLowerCase().includes(Constants.CATEGORY_TYPE.Sale) ? `מכירת ציוד` : `השכרת ציוד`}
    </Link> 
    <span className='sm:text-3xl text-2xl px-2'> / </span>
    <Link 
    to={`/category/${category_id}`}
    className='sm:text-2xl text-xl py-5 hover:underline hover:text-amber-400 hover:font-bold'>
        {category.Name}
    </Link>
  </div></>;
}

export default CategoryPage;