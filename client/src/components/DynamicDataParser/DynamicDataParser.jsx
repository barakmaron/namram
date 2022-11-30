import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Constants from '../../Constants';
import ItemsListDisplay from '../DataDisplay/ItemsListDisplay/ItemsListDisplay';

const DynamicDataParser = ({
    page_route,
    static_page_data,
    GetStaticPageDataPerPageAction,
    InitStaticPageDataAction,
    categories,
    GetSaleAction,
    GetRentAction,
    GetCategoryAction
}) => {

    const [data_to_show, setDataToShow] = useState([]);
    const url_query = useParams();
    const category_id = url_query.id;


    useEffect(() => {
        if(page_route.includes('/category')) {
            GetCategoryAction(category_id);            
        } else if(page_route.includes(Constants.API_PRODUCT_TYPE.RENT))
            GetRentAction();
        else
            GetSaleAction();
    }, [page_route, GetSaleAction, GetRentAction, category_id, GetCategoryAction]);

    useEffect(() => {
        if(page_route)
            GetStaticPageDataPerPageAction(page_route);
        return () => InitStaticPageDataAction();
    }, [page_route, GetStaticPageDataPerPageAction, InitStaticPageDataAction]);

    useEffect(() => {
        if(page_route.includes('/category') && categories.length) { 
            const category = categories.find(category => category.id === category_id);
            setDataToShow(category[Constants.PRODUCT_TYPE[category.Type]]?.map(product => ({
                id: product.id,
                name: product.Product.Name,
                Image: product.Product.ProductsImages[0].Image,
                base_url: `/category/${category.id}/product`
            }) || []));
        } else if(!page_route.includes(Constants.API_PRODUCT_TYPE.RENT) && static_page_data.length && categories.length) {
            const filtered_data = static_page_data.flatMap(page_data => {
                const category = categories.find(category => category.id === page_data.CategoryId);
                if(page_data.DisplayType === Constants.DisplayType.products) 
                    return category.SaleProducts.map(product => ({
                        id: product.id,
                        name: product.Product.Name,
                        Image: product.Product.ProductsImages[0].Image,
                        base_url: `/category/${category.id}/product`
                    }));
                return {
                    id: category.id,
                    name: category.Name,
                    Image: category.Image,
                    base_url: '/category'
                };
            });
            setDataToShow(filtered_data);
        } else if(page_route.includes(Constants.API_PRODUCT_TYPE.RENT) || page_route.includes(Constants.API_PRODUCT_TYPE.SALE))
            setDataToShow(categories.map(category => ({
                id: category.id,
                name: category.Name,
                Image: category.Image,
                base_url: '/category'
            })));
        else  
            setDataToShow([]);
    }, [categories, page_route, static_page_data, url_query, category_id]);


  return <>
  { data_to_show.length !== 0 &&
    <ItemsListDisplay list={data_to_show} /> }
  </>;
};

export default DynamicDataParser;