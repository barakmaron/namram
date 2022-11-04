import React, { useState, useCallback, useEffect } from 'react';
import ControlPanelBlock from '../../../../components/ControlPanelBlock/ControlPanelBlock';
import Form from '../../../../components/Form/Form';
import FORMS from '../../../../components/Form/Forms';
import Modal from '../../../../components/Modal/Modal';

const SaleProducts = ({
  categories,
  sale_products,
  categories_list,
  AddProductAction,
  DeleteProductAction
}) => {
    const [add_product, setAddProduct] = useState(false);
    const [add_form_controller, setAddFormController] = useState([]);
    const [delete_product, setDeleteProduct] = useState(false);
    const [delete_form_controller, setDeleteFormController] = useState([]);
    const [selected_category, setSelectedCategory] = useState(null);
    const [selected_product, setSelectedProduct] = useState(null);

    useEffect(() => {
      const controller = [{            
          list: categories_list,
          onChange: (selected) => {
              const category = categories.find(category => category.id === selected.value);
              setSelectedCategory(category);
          }
      }];
      
      const delete_controller = [ ...controller, {
        list: (selected_category && selected_category.SaleProducts.map(product => ({ label: product.name || product.Product.Name, value: product.id }))) || [],
        onChange: (selected) => {
          const product = selected_category.SaleProducts.find(product => product.id === selected.value);
          setSelectedProduct(product);
      }}];
      setAddFormController(controller);
      setDeleteFormController(delete_controller);
  }, [categories_list, categories, selected_category]);


    const add_product_action = useCallback((event, form, temp_url) => {
        event.preventDefault();
        AddProductAction(selected_category.id, form, temp_url);
      }, [AddProductAction, selected_category]);
  
      const delete_product_action = useCallback((event) => {
        event.preventDefault();
        DeleteProductAction(selected_category.id, selected_product.ProductId);
      }, [DeleteProductAction, selected_category, selected_product]);

  return (<>
    <ControlPanelBlock
    number={sale_products.length}
    add_action={() => setAddProduct(true)}
    delete_action={() => setDeleteProduct(true)}>
      מוצרים
    </ControlPanelBlock>
    {add_product && <Modal setClose={() => setAddProduct(false)}>
      <h2 className='mx-auto text-3xl font-bold w-fit'>הוסף מוצר</h2>
      <Form 
      action={add_product_action} 
      inputs={FORMS.controlPanelFormsExtend.add_sale_product}
      controller={add_form_controller}/>
    </Modal>}
    {delete_product && <Modal setClose={() => setDeleteProduct(false)}>
      <h2 className='mx-auto text-3xl font-bold w-fit'>מחק מוצר</h2>
      <Form 
      action={delete_product_action} 
      inputs={FORMS.controlPanelForms.delete_product}
      controller={delete_form_controller}/>
    </Modal>}
  </>)
}

export default SaleProducts;