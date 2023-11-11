import React, { useEffect, useState } from 'react';

import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

import { Link, useParams } from 'react-router-dom';
import Helmet from 'react-helmet';
import { FaShekelSign } from 'react-icons/fa';
import { TfiAnnouncement } from 'react-icons/tfi';

import { getCategories } from "../redux/selectors/categoriesSelector";
import { GetCategoryAction } from "../redux/actions/CategoriesActions/CategoriesActions";

import StructureProductData from '../components/GoogleAnalytics/StructureProductData';
import ImageSlider from '../components/ImageSlider/ImageSlider';
import TextParser from '../components/TextParser';
import Constants from '../Constants';

const ProductPage = ({
    categories,
    GetCategoryAction
}) => {

    const [category, setCategory] = useState(undefined);
    const [product, setProduct] = useState(undefined);
    const url_query = useParams();
    const { category_id, product_id } = url_query;

    useEffect(() => {
        GetCategoryAction(category_id);
    }, [category_id, GetCategoryAction]);

    useEffect(() => {
        setCategory(categories?.find(category => category.id === category_id));
    }, [categories, category_id]);

    useEffect(() => {
        if (category)
            setProduct(category[Constants.PRODUCT_TYPE[category.Type]].find(product => product.id === product_id));
    }, [category, product_id]);

    return product && <>
        <Helmet>
            <title>נמרם | {category.Name} | {product.Product.name}</title>
        </Helmet>
        <div
            className='lg:w-[80vw] w-screen mx-auto pb-5'>
            <StructureProductData product={product} />
            <div
                dir='rtl'
                className='text-forest-green-600 rounded-b-xl mx-auto flex flex-wrap sm:justify-start justify-center items-baseline sm:px-4 h-fit '>
                <Link
                    to={`/${Constants.CATEGORY_TYPE[category.Type]}`}
                    className='text-xl hover:underline hover:text-amber-400 hover:font-bold w-fit'>
                    {category.Type.toLowerCase().includes(Constants.API_PRODUCT_TYPE.SALE) ? `מכירת ציוד` : `השכרת ציוד`}
                </Link>
                <span className='text-3xl px-2 h-fit'> / </span>
                <Link
                    to={`/category/${category_id}`}
                    className='text-xl hover:underline hover:text-amber-400 hover:font-bold'>
                    {category.Name}
                </Link>
                <span className='text-3xl px-2 h-fit'> / </span>
                <Link
                    to={`/category/${category_id}/product/${product_id}`}
                    className='text-xl hover:underline hover:text-amber-400 hover:font-bold'>
                    {product.Product.Name}
                </Link>
            </div>
            <div className='grid md:grid-cols-2 md:grid-rows-1 justify-center w-full mx-auto gap-5' dir='rtl'>
                <div>
                    <ImageSlider
                        images={product.Product.ProductsImages.map(image => ({
                            alt: product.Product.name,
                            Image: image.Image
                        }))} />
                </div>
                <div className='w-full flex flex-col justify-start' dir='rtl'>
                    <h2 className='text-3xl text-forest-green-600 font-bold text-center sm:text-start'>
                        {product.Product.Name}
                    </h2>
                    <div dir='ltr'>
                        <TextParser body={product.Product.Text} />
                    </div>
                    <span className='font-bold'>
                        מקט: {product.Product.SerialNumber}
                    </span>
                    <div className='py-2 bg-forest-green-600 font-bold text-white text-2xl px-4 flex justify-center gap-4'>
                        <span className='text-amber-400'>
                            {product.Price ? `מחיר` : `מחיר ליום עבודה`}:
                        </span>
                        <span className='flex w-fit items-center gap-2'>
                            {product.Price || product.DayPrice} <FaShekelSign />
                        </span>
                    </div>
                    <span className='flex gap-2 text-2xl text-green-500 my-2'>
                        <TfiAnnouncement /> כל המחירים באתר אינם כוללים מע"מ
                    </span>
                </div>
            </div>
            <div className='divide-y-2' dir='rtl'>
                <h3 className='text-3xl'>
                    פרטים טכניים
                </h3>
                <ul className='w-[99%] px-5'>
                    {product.Product.ProductProps.map(prop => {
                        return <React.Fragment key={`prop-${prop.id}`}>
                            <li className='text-2xl font-bold py-2'>
                                {prop.PropName}
                            </li>
                            <li className='flex px-5 py-2 gap-20 text-xl bg-slate-400 bg-opacity-50'>
                                <span>{prop.PropName}</span>
                                <span>{prop.Value}</span>
                            </li>
                        </React.Fragment>;
                    })}
                </ul>
            </div>
        </div>
    </>;
}

const mapStateToProps = (state, ownProps) => {
    const categories = getCategories(state);
    return { ...ownProps, categories };
};

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        GetCategoryAction
    }, dispatch);
};

export default connect(mapStateToProps, mapActionToProps)(ProductPage);