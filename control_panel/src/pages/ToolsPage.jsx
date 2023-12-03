import React, { useState, useEffect } from 'react';

import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

import { getCategories } from "../redux/selectors/categoriesSelector";
import { GetRentAction } from '../redux/actions/RentActions/RentActions';
import { GetSaleAction } from "../redux/actions/SaleActions/saleActions";

import Constants from '../Constants';
import Categories from '../components/Categories/Categories';
import Products from '../components/Products/Products';
import ProductsTable from '../components/Products/ProductsTable';
import useProductType from '../hooks/useProductType';

const ToolsPage = ({
  categories,
  GetRentAction,
  GetSaleAction,
  product_type
}) => {
  const [categories_list, setCategoriesList] = useState([]);

  const [products, setProducts] = useState([]);
  const [array_type, setType] = useProductType(product_type);

  useEffect(() => {
    setType(product_type);
  }, [product_type, setType]);

  useEffect(() => {
    product_type === Constants.API_PRODUCT_TYPE.RENT ?
      GetRentAction() :
      GetSaleAction();
  }, [product_type, GetRentAction, GetSaleAction]);

  useEffect(() => {
    const categories_map_for_list = categories?.map((category) => ({
      label: category?.Name,
      value: category?.id
    }));
    setCategoriesList(categories_map_for_list);
  }, [categories]);

  useEffect(() => {
    setProducts([]);
    categories.forEach((category) => {
      setProducts(products => {
        if (category[array_type])
          return [...products, ...category[array_type]];
      });
    });
  }, [categories, array_type]);

  return (<div className='flex-1'>
    <h2
      className='w-fit mx-auto my-4 text-4xl font-bold text-green-600'
    >מוצרים ל{product_type === Constants.API_PRODUCT_TYPE.RENT ? `השכרה` : `מכירה`}</h2>
    <div className='flex flex-row gap-5 flex-wrap w-fit mx-auto'>
      <Categories
        categories_list={categories_list}
        type={product_type} />
      <Products
        products={products}
        categories_list={categories_list}
        type={product_type} />
    </div>
    <div>
      <ProductsTable
        products={products}
        type={product_type} />
    </div>
  </div>);
};

const mapStateToProps = (state, ownProps) => {
  const categories = getCategories(state);
  return { ...ownProps, categories };
};

const mapActionToProps = (dispatch) => {
  return bindActionCreators({
    GetRentAction,
    GetSaleAction
  }, dispatch);
};

export default connect(mapStateToProps, mapActionToProps)(ToolsPage);
