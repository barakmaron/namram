import React, { useEffect, useState } from 'react';

import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

import { useParams } from 'react-router-dom';
import Helmet from 'react-helmet';
import { TfiAnnouncement } from 'react-icons/tfi';
import commaNumber from 'comma-number';

import { getCategories } from "../redux/selectors/categoriesSelector";
import { GetCategoryAction } from "../redux/actions/CategoriesActions";

import StructureProductData from '../components/GoogleAnalytics/StructureProductData';
import ImageSlider from '../components/ImageSlider/ImageSlider';
import TextParser from '../components/TextParser';
import Constants from '../Constants';
import BreadCrumb from '../components/BreadCrumb';

const ProductPage = ({
    categories,
    GetCategoryAction
}) => {

    const [category, setCategory] = useState(undefined);
    const [product, setProduct] = useState(undefined);
    const url_query = useParams();
    const { category_id, product_id } = url_query;

    useEffect(() => {
        category_id && GetCategoryAction(category_id);
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
            <title>{`נמרם | ${category?.Name} | ${product.Product.Name}`}</title>
        </Helmet>
        <div
            className='lg:w-[70vw] w-screen mx-auto pb-5'>
            <StructureProductData product={product} />
            <BreadCrumb category={category} product={product} />
            <div className='grid md:grid-cols-12 md:grid-rows-1 justify-center w-full mx-auto gap-1' dir='rtl'>
                <div className=' col-span-6'>
                    <ImageSlider
                        images={product.Product.ProductsImages.map(image => ({
                            alt: product.Product.name,
                            Image: image.Image
                        }))} />
                </div>
                <div className='w-full flex flex-col justify-start col-span-5 p-2 sm:p-0' dir='rtl'>
                    <h2 className='text-3xl font-bold text-center sm:text-start'>
                        {product.Product.Name}
                    </h2>
                    <div className='flex w-fit items-baseline gap-1 text-4xl bg-green-500 p-1 pt-0 rounded-xl text-white font-semibold mx-auto sm:mx-0'>
                        {commaNumber(product.Price || product.DayPrice)}₪
                    </div>
                    <div dir='rtl' className='pt-1'>
                        <TextParser body={product.Product.Text} />
                    </div>
                    <div className='divide-y-2' dir='rtl'>
                        <h3 className='text-2xl'>
                            פרטים טכניים
                        </h3>
                        <ul className='w-full px-1 pt-1'>
                            {product.Product.ProductProps.map((prop, index) =>
                                <li
                                    className={`grid grid-cols-6 grid-rows-1 text-xl ${index % 2 ? 'bg-slate-400' : 'bg-slate-200'} bg-opacity-20 py-1 px-1`}
                                    key={`prop-${prop.id}`}>
                                    <span className=' col-span-4'>{prop.PropName}</span>
                                    <span className=' col-span-2'>{prop.Value}</span>
                                </li>
                            )}
                        </ul>
                    </div>                   
                    <span className='flex gap-2 text-xl text-green-500 my-2'>
                        <TfiAnnouncement /> כל המחירים באתר אינם כוללים מע"מ
                    </span>
                </div>
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