import React, { useState, useCallback } from 'react';
import { useEffect } from 'react';

import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { getCategories } from '../../redux/selectors/categoriesSelector';
import { AddCategoryAction, DeleteCategoryAction, EditCategoryAction } from '../../redux/actions/CategoriesActions/CategoriesActions';

import ControlPanelBlock from '../ControlPanelBlock';
import Modal from '../../components/Modal/Modal';
import Form from '../Form/Form';
import CategoriesForms from './FormConstants';
import { addCategoryTitle, addTitle, categoriesTitle, deleteCategoryTitle, deleteTitle, editCategoryTitle, editTitle } from '../../strings';

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
        value: () => setAddCategory(true),
        label: addTitle
      }, {
        value: () => setEditCategory(true),
        label: editTitle
      }, {
        value: () => setDeleteCategory(true),
        label: deleteTitle
      }]}>
      {categoriesTitle}
    </ControlPanelBlock>
    {add_category && <Modal setClose={() => setAddCategory(false)}>
      <h2 className='mx-auto text-3xl font-bold w-fit'>{addCategoryTitle}</h2>
      <Form
        action={add_category_action}
        inputs={CategoriesForms.add_category} />
    </Modal>}
    {edit_category && <Modal setClose={() => setEditCategory(false)}>
      <h2 className='mx-auto text-3xl font-bold w-fit'>{editCategoryTitle}</h2>
      <Form
        action={edit_category_action}
        inputs={CategoriesForms.edit_category}
        controller={edit_form_controller} />
    </Modal>}
    {delete_category && <Modal setClose={() => setDeleteCategory(false)}>
      <h2 className='mx-auto text-3xl font-bold w-fit'>{deleteCategoryTitle}</h2>
      <Form
        action={delete_category_action}
        inputs={CategoriesForms.delete_category}
        controller={delete_form_controller} />
    </Modal>}
  </>);
};

const mapStateToProps = (state, ownProps) => {
  const categories = getCategories(state);
  return { ...ownProps, categories };
};

const mapActionToProps = (dispatch) => {
  return bindActionCreators({
    AddCategoryAction,
    DeleteCategoryAction,
    EditCategoryAction,
  }, dispatch);
};

export default connect(mapStateToProps, mapActionToProps)(Categories);