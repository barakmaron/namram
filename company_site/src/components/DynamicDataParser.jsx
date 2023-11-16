import React, { useEffect, useState } from 'react';

import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

import { useParams } from 'react-router-dom';

import { getCategories } from "../redux/selectors/categoriesSelector";
import { GetStaticPageDataPerPageAction, InitStaticPageDataAction } from "../redux/actions/StaticPageActions";
import { getStaticPages } from "../redux/selectors/staticPagesSelector";
import { GetRentAction } from "../redux/actions/RentActions/RentActions";
import { GetSaleAction } from "../redux/actions/SaleActions/saleActions";
import { GetCategoryAction } from "../redux/actions/CategoriesActions/CategoriesActions";
import Constants from '../Constants';
import ItemsListDisplay from './DataDisplay/ItemsListDisplay';

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
    const category_id = url_query.id || url_query.category_id;


    useEffect(() => {
        if (page_route.includes('/category') && category_id !== undefined) {
            GetCategoryAction(category_id);
        } else if (page_route.toLowerCase().includes(Constants.API_PRODUCT_TYPE.RENT))
            GetRentAction();
        else
            GetSaleAction();
    }, [page_route, GetSaleAction, GetRentAction, category_id, GetCategoryAction]);

    useEffect(() => {
        if (page_route)
            GetStaticPageDataPerPageAction(page_route);
        return () => InitStaticPageDataAction();
    }, [page_route, GetStaticPageDataPerPageAction, InitStaticPageDataAction]);

    useEffect(() => {
        if (page_route.includes('/category') && categories.length) { // show category as products
            const category = categories.find(category => category.id === category_id);
            const temp_data = category?.[Constants.PRODUCT_TYPE[category.Type]]?.reduce((products, product) => {
                (product?.Display === true || product.Display === undefined) && products.push({
                    id: product.id,
                    name: product.Product.Name,
                    Image: product.Product.ProductsImages[0].Image,
                    base_url: `/category/${category.id}/product`
                });
                return products;
            }, []);
            setDataToShow(temp_data || []);
        } else if (!page_route.toLowerCase().includes(Constants.API_PRODUCT_TYPE.RENT) && static_page_data.length && categories.length) { // show products and categories as defined in control panel
            const filtered_data = static_page_data.flatMap(page_data => {
                const category = categories?.find(category => category.id === page_data.CategoryId);
                if (page_data.DisplayType === Constants.DisplayType.products)
                    return category?.SaleProducts?.map(product => ({
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
        } else if (page_route.toLowerCase().includes(Constants.API_PRODUCT_TYPE.RENT) || page_route.toLowerCase().includes(Constants.API_PRODUCT_TYPE.SALE)) // show categories rent or sale
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
        {data_to_show.length !== 0 &&
            <ItemsListDisplay list={data_to_show} />}
    </>;
};

const mapStateToProps = (state, ownProps) => {
    const categories = getCategories(state);
    const static_page_data = getStaticPages(state);
    return {
        ...ownProps,
        categories,
        static_page_data
    };
};

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        InitStaticPageDataAction,
        GetStaticPageDataPerPageAction,
        GetRentAction,
        GetSaleAction,
        GetCategoryAction
    }, dispatch);
};

export default connect(mapStateToProps, mapActionToProps)(DynamicDataParser);