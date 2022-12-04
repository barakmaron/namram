import React, { useState, useCallback, useEffect } from 'react';
import ControlPanelBlock from '../ControlPanelBlock/ControlPanelBlock';
import Modal from '../Modal/Modal';
import Constants from '../../Constants';
import useProductType from '../../hooks/useProductType';
import allProductForms from './FormConstants';
import FormConnector from '../Form/FormConnector';

const Products = ({
  categories,
  products,
  categories_list,
  AddProductAction,
  DeleteProductAction,
  type
}) => {
    const [add_product, setAddProduct] = useState(false);
    const [add_form_controller, setAddFormController] = useState([]);
    const [delete_product, setDeleteProduct] = useState(false);
    const [delete_form_controller, setDeleteFormController] = useState([]);
    const [selected_category, setSelectedCategory] = useState(null);
    const [selected_product, setSelectedProduct] = useState(null);
    const [array_type, setType] = useProductType(type);

    useEffect(() => {
      const controller = [{            
          list: categories_list,
          onChange: (selected) => {
              const category = categories.find(category => category.id === selected.value);
              setSelectedCategory(category);
          }
      }];
      
      const delete_controller = [ ...controller, {
        list: (selected_category && selected_category[array_type].map(product => {
          return product.id && { 
            label: product.Product.Name, 
            value: product.id 
        }})) || [],
        onChange: (selected) => {
          const product = selected_category[array_type].find(product => product.id === selected.value);
          setSelectedProduct(product);
      }}];
      setAddFormController(controller);
      setDeleteFormController(delete_controller);
  }, [categories_list, categories, selected_category, array_type]);


    const add_product_action = useCallback((event, form, temp_url) => {
        event.preventDefault();
        AddProductAction(selected_category.id, form, temp_url, type);
      }, [AddProductAction, selected_category, type]);
  
      const delete_product_action = useCallback((event) => {
        event.preventDefault();
        DeleteProductAction(selected_category.id, selected_product.ProductId, type);
      }, [DeleteProductAction, selected_category, selected_product, type]);

  return (<>
    <ControlPanelBlock
    number={products?.length || 0}
    actions={[{
      value: () => setAddProduct(true),
      label: "הוסף"
    }, {
      value: () => setDeleteProduct(true),
      label: "מחק"
    }]}>
      מוצרים
    </ControlPanelBlock>
    {add_product && <Modal setClose={() => setAddProduct(false)}>
      <h2 className='mx-auto text-3xl font-bold w-fit'>הוסף מוצר</h2>
      <FormConnector 
      action={add_product_action} 
      inputs={type === Constants.API_PRODUCT_TYPE.SALE ? 
        allProductForms.add_sale_product :
        allProductForms.add_rent_product}
      controller={add_form_controller}/>
    </Modal>}
    {delete_product && <Modal setClose={() => setDeleteProduct(false)}>
      <h2 className='mx-auto text-3xl font-bold w-fit'>מחק מוצר</h2>
      <FormConnector
      action={delete_product_action} 
      inputs={allProductForms.delete_product}
      controller={delete_form_controller}/>
    </Modal>}
  </>)
}

export default Products;