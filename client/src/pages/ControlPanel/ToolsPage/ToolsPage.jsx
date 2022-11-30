import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import Constants from '../../../Constants';
import CategoriesConnector from '../../../components/Categories/CategoriesConnector';
import ProductsConnector from '../../../components/Products/ProductsConnector';
import ProductsTableConnector from '../../../components/Products/ProductsTable/ProductsTableConnector';
import useProductType from '../../../hooks/useProductType';

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
        label: category.Name,
        value: category.id
      }));
      setCategoriesList(categories_map_for_list);
    }, [categories]);
    
    useEffect(() => {
      setProducts([]);
      categories.forEach((category) => {
        setProducts(products => {
          if(category[array_type])
            return [...products, ...category[array_type]];
        });
      });
    }, [categories, array_type]);
    
  return (<>  
  <h2
  className='w-fit mx-auto my-4 text-4xl font-bold text-green-600'
  >מוצרים ל{product_type === Constants.API_PRODUCT_TYPE.RENT ? `השכרה` : `מכירה`}</h2>
  <div className='flex flex-row gap-5 flex-wrap w-fit mx-auto'>   
    <CategoriesConnector 
    categories_list={categories_list}
    type={product_type} />
    <ProductsConnector 
    products={products}
    categories_list={categories_list}
    type={product_type} />
  </div>
  <div>
    <ProductsTableConnector
    products={products}
    type={product_type}></ProductsTableConnector>
  </div>
  </>);
};

export default ToolsPage;
