import { CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Constants from '../../Constants';
import useProductType from '../../hooks/useProductType';
import ItemsListDisplay from '../DataDisplay/ItemsListDisplay/ItemsListDisplay';

const DynamicDataParser = ({
    page_route,
    static_page_data,
    GetStaticPageDataPerPageAction,
    categories,
    GetSaleAction,
    GetRentAction
}) => {

    const [data_to_show, setDataToShow] = useState([]);
    const array_type = useProductType(page_route.slice(1));

    useEffect(() => {
        if(page_route.includes(Constants.API_PRODUCT_TYPE.RENT))
            GetRentAction();
        else
            GetSaleAction();
    }, [page_route, GetSaleAction, GetRentAction]);

    useEffect(() => {
        if(page_route)
            GetStaticPageDataPerPageAction(page_route);
    }, [page_route, GetStaticPageDataPerPageAction]);

    useEffect(() => {
        if(!page_route.includes(Constants.API_PRODUCT_TYPE.RENT) && static_page_data.length) {
            const filtered_data = static_page_data.flatMap(page_data => {
                const category = categories.find(category => category.id === page_data.CategoryId);
                if(page_data.DisplayType === Constants.DisplayType.products) 
                    return category.SaleProducts.map(product => ({
                        id: product.id,
                        name: product.Product.Name,
                        Image: product.Product.ProductsImages[0].Image
                    }));
                return {
                    id: category.id,
                    name: category.Name,
                    Image: category.Image
                };
            });
            setDataToShow(filtered_data);
        }
        else if(page_route.includes(Constants.API_PRODUCT_TYPE.RENT) || page_route.includes(Constants.API_PRODUCT_TYPE.SALE))
            setDataToShow(categories.map(category => ({
                id: category.id,
                name: category.Name,
                Image: category.Image
            })));
        else if(page_route === '/category')
            setDataToShow(categories.flatMap(category => {
                return category[array_type].map(product => ({
                    id: product.id,
                    name: product.Product.Name,
                    Image: product.Product.ProductImages[0].Image
                }));
            }));
        else 
            setDataToShow([]);
    }, [categories, page_route, static_page_data, array_type]);


  return <>
  { data_to_show.length !== 0 &&
    <ItemsListDisplay list={data_to_show} base_link="/rent" /> }
  </>;
};

export default DynamicDataParser;