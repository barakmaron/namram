import React, { useState, useCallback } from 'react';
import { useEffect } from 'react';
import ControlPanelBlock from '../../../../components/ControlPanelBlock/ControlPanelBlock';
import Form from '../../../../components/Form/Form';
import FORMS from '../../../../components/Form/Forms';
import Modal from '../../../../components/Modal/Modal';

const SaleCategories = ({
    categories,
    categories_list,
    AddCategoryAction,
    DeleteCategoryAction,
    EditCategoryAction,
}) => {

    const [add_category, setAddCategory] = useState(false);
    const [edit_category, setEditCategory] = useState(false);
    const [edit_form_controller, setEditFormController] = useState([]);
    const [selected_category, setSelectedCategory] = useState({});
    const [delete_category, setDeleteCategory] = useState(false);
    const [delete_form_controller, setDeleteFormController] = useState([]);

    useEffect(() => {
        const controller = [{            
            list: categories_list,
            onChange: (selected) => {
                const category = categories.find(category => category.id === selected.value);
                setSelectedCategory(category);
            }
        }];
        setEditFormController(controller);
        setDeleteFormController(controller);
    }, [categories_list, categories]);

    const add_category_action = useCallback((event, form, temp_url) => {
        event.preventDefault();
        AddCategoryAction(form, temp_url);
      }, [AddCategoryAction]);
  
    const edit_category_action = useCallback((event, form) => {
        event.preventDefault();
        EditCategoryAction(selected_category.id, form);
    }, [EditCategoryAction, selected_category]);

    const delete_category_action = useCallback((event) => {
        event.preventDefault();
        DeleteCategoryAction(selected_category.id);
    }, [DeleteCategoryAction, selected_category]);

  return (<>
    <ControlPanelBlock
    number={categories_list.length}
    add_action={()=> setAddCategory(true)}
    edit_action={() => setEditCategory(true)}
    delete_action={() => setDeleteCategory(true)}>
      קטגוריות
    </ControlPanelBlock>
    {add_category && <Modal setClose={() => setAddCategory(false)}>
      <h2 className='mx-auto text-3xl font-bold w-fit'>הוסף קטגוריה</h2>
      <Form 
      action={add_category_action} 
      inputs={FORMS.controlPanelForms.add_category}/>
    </Modal> }
    {edit_category && <Modal setClose={() => setEditCategory(false)}>
      <h2 className='mx-auto text-3xl font-bold w-fit'>ערוך קטגוריה</h2>
      <Form 
      action={edit_category_action} 
      inputs={FORMS.controlPanelForms.edit_category}
      controller={edit_form_controller}/>
    </Modal>}
    {delete_category && <Modal setClose={() => setDeleteCategory(false)}>
      <h2 className='mx-auto text-3xl font-bold w-fit'>מחק קטגוריה</h2>
      <Form 
      action={delete_category_action} 
      inputs={FORMS.controlPanelForms.delete_category}
      controller={delete_form_controller}/>
    </Modal>}
  </>);
};

export default SaleCategories;