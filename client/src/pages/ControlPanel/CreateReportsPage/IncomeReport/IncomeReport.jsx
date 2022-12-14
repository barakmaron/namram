import React, { useCallback, useEffect, useState } from 'react';
import FormConnector from '../../../../components/Form/FormConnector';
import CreateReportsForms from '../FormsConstants';

const IncomeReport = ({
  rent_categories,
  GetRentAction
}) => {

  const [selected_product, setSelectedProduct] = useState({});
  const [selected_category, setSelectedCategory] = useState({});
  const [categories_list, setCategoriesList] = useState([]);
  const [products_list, setProductsList] = useState([]);
  const [form_controller, setFormController] = useState([]);

  useEffect(() => {
    GetRentAction();
  }, [GetRentAction]);

  useEffect(() => {
    const categories = rent_categories?.map(category => ({
      label: category.Name,
      value: category.id
    })) || [];
    setCategoriesList(categories);
  }, [rent_categories]);
    
  useEffect(() => {
    const controller = [{
      list: categories_list,
      onChange: (selected) => {
        const category = rent_categories.find(category => category.id === selected.value);
        const products = category.RentProducts.map(product => ({
          label: `${product.Product.Name} | ${product.Product.SerialNumber}`,
          value: product.id
        }));
        setProductsList(products);
        setSelectedCategory(selected.value);
      }
    }, {
      list: products_list,
      onChange: (selected) => setSelectedProduct(selected.value)
    }];

    setFormController(controller);
  }, [rent_categories, categories_list, products_list]);

  const open_rent_product_report = useCallback((event) => {
    event.preventDefault();
    window.open(`${process.env.REACT_APP_API_BASE_URL}/rent/products/${selected_product}?pdf=true`); 
  }, [selected_product]);

  const open_rent_category_report = useCallback((event) => {
    event.preventDefault();
    window.open(`${process.env.REACT_APP_API_BASE_URL}/rent/categories/${selected_category}?pdf=true&income=true`); 
  }, [selected_category]);

  return <div className='flex gap-5 justify-center'>
    <fieldset className='border-2 border-forest-green-500 px-4 py-4 w-fit'>
      <legend className='text-forest-900 px-4 text-2xl'>?????? ??????/???????? ???????? ?????? ??????????</legend>
      { form_controller.length !== 0 && <FormConnector
      inputs={CreateReportsForms.product_gain_loss_form}
      controller={form_controller}
      action={open_rent_product_report}/>}
    </fieldset>
    <fieldset className='border-2 border-forest-green-500 px-4 py-4 w-fit'>
      <legend className='text-forest-900 px-4 text-2xl'>?????? ??????/???????? ???????? ?????????????? ??????????</legend>
      { form_controller.length !== 0 && <FormConnector
      inputs={CreateReportsForms.category_gain_loss_form}
      controller={form_controller}
      action={open_rent_category_report}/>}
    </fieldset>
  </div>;
};

export default IncomeReport;