import React, { useState, useCallback, useEffect } from 'react';

import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

import { AddProductAction, DeleteProductAction } from "../../redux/actions/ProductsActions/ProductsActions";
import { getCategories } from "../../redux/selectors/categoriesSelector";
import ControlPanelBlock from '../ControlPanelBlock';
import Modal from '../Modal/Modal';
import Constants from '../../Constants';
import useProductType from '../../hooks/useProductType';
import allProductForms from './FormConstants';
import Form from '../Form/Form';
import { addProductTitle, addTitle, deleteProductTitle, deleteTitle } from '../../strings';

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
  const [array_type] = useProductType(type);

  useEffect(() => {
    const controller = [{
      list: categories_list,
      onChange: (selected) => {
        const category = categories.find(category => category.id === selected.value);
        setSelectedCategory(category);
      }
    }];

    const delete_controller = [...controller, {
      list: (selected_category && selected_category[array_type]?.map(product => {
        return product.id && {
          label: product.Product.Name,
          value: product.id
        }
      })) || [],
      onChange: (selected) => {
        const product = selected_category[array_type].find(product => product.id === selected.value);
        setSelectedProduct(product);
      }
    }];
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
        label: addTitle
      }, {
        value: () => setDeleteProduct(true),
        label: deleteTitle
      }]}>
      מוצרים
    </ControlPanelBlock>
    {add_product && <Modal header={addProductTitle}  setClose={() => setAddProduct(false)}>
      <Form
        action={add_product_action}
        inputs={type === Constants.API_PRODUCT_TYPE.SALE ?
          allProductForms.add_sale_product :
          allProductForms.add_rent_product}
        controller={add_form_controller} />
    </Modal>}
    {delete_product && <Modal header={deleteProductTitle} setClose={() => setDeleteProduct(false)}>
      <Form
        action={delete_product_action}
        inputs={allProductForms.delete_product}
        controller={delete_form_controller} />
    </Modal>}
  </>)
}

const mapStateToProps = (state, ownProps) => {
  const categories = getCategories(state);
  return { ...ownProps, categories };
};

const mapActionToProps = (dispatch) => {
  return bindActionCreators({
    AddProductAction,
    DeleteProductAction
  }, dispatch);
};

export default connect(mapStateToProps, mapActionToProps)(Products);