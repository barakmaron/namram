import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import SaleCategoriesConnector from './Categories/SaleCategoriesConnector';
import SaleProductsConnector from './Products/SaleProductsConnector';
import SaleProductsTableConnector from './Products/SaleProductsTableConnector';

const Sale = ({ 
    categories, 
    GetSaleAction
}) => {
  const [categories_list, setCategoriesList] = useState([]);

  const [sale_products, setSaleProducts] = useState([]);

    useEffect(() => {
      GetSaleAction();
    }, []);

    useEffect(() => {
      const categories_map_for_list = categories.map((category) => ({
        label: category.Name,
        value: category.id
      }));
      setCategoriesList(categories_map_for_list);
    }, [categories]);
    
    useEffect(() => {
      setSaleProducts([]);
      categories.forEach((category) => {
        setSaleProducts(products => {
          if(category.SaleProducts)
            return [...products, ...category.SaleProducts];
        });
      });
    }, [categories]);
    
  return (<>
  <div className='flex flex-row gap-5 flex-wrap w-fit mx-auto'>  
    <SaleCategoriesConnector categories_list={categories_list}/>  
    <SaleProductsConnector 
    sale_products={sale_products}
    categories_list={categories_list} />
  </div>
  <div>
    <SaleProductsTableConnector
    sale_products={sale_products}></SaleProductsTableConnector>
  </div>
  </>);
};

export default Sale;
