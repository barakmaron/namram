import React, { useState, useCallback } from 'react';
import { useEffect } from 'react';
import ControlPanelBlock from '../../components/ControlPanelBlock/ControlPanelBlock';
import Modal from '../../components/Modal/Modal';
import FormConnector from '../Form/FormConnector';
import CategoriesForms from './FormConstants';

const Categories = ({
  categories,
  categories_list,
  AddCategoryAction,
  DeleteCategoryAction,
  EditCategoryAction,
  type
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
        AddCategoryAction(form, temp_url, type);
      }, [AddCategoryAction, type]);
  
    const edit_category_action = useCallback((event, form) => {
        event.preventDefault();
        EditCategoryAction(selected_category.id, form, type);
    }, [EditCategoryAction, selected_category, type]);

    const delete_category_action = useCallback((event) => {
        event.preventDefault();
        DeleteCategoryAction(selected_category.id, type);
    }, [DeleteCategoryAction, selected_category, type]);

  return (<>
    <ControlPanelBlock
    number={categories_list.length}
    actions={[{
      value: ()=> setAddCategory(true),
      label: "הוסף"
    }, {
      value: () => setEditCategory(true),
      label: "ערוך"
    }, {
      value: () => setDeleteCategory(true),
      label: "מחק"
    }]}>
      קטגוריות
    </ControlPanelBlock>
    {add_category && <Modal setClose={() => setAddCategory(false)}>
      <h2 className='mx-auto text-3xl font-bold w-fit'>הוסף קטגוריה</h2>
      <FormConnector 
      action={add_category_action} 
      inputs={CategoriesForms.add_category}/>
    </Modal> }
    {edit_category && <Modal setClose={() => setEditCategory(false)}>
      <h2 className='mx-auto text-3xl font-bold w-fit'>ערוך קטגוריה</h2>
      <FormConnector 
      action={edit_category_action} 
      inputs={CategoriesForms.edit_category}
      controller={edit_form_controller}/>
    </Modal>}
    {delete_category && <Modal setClose={() => setDeleteCategory(false)}>
      <h2 className='mx-auto text-3xl font-bold w-fit'>מחק קטגוריה</h2>
      <FormConnector 
      action={delete_category_action} 
      inputs={CategoriesForms.delete_category}
      controller={delete_form_controller}/>
    </Modal>}
  </>);
};

export default Categories;