
import React, { useCallback, useEffect, useState } from 'react';

import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

import { Button, CircularProgress } from '@mui/material';

import { getCategories } from "../../../redux/selectors/categoriesSelector";
import { AddStaticPageAction, DeleteStaticPageAction } from "../../../redux/actions/StaticPageActions";
import { getStaticPages } from "../../../redux/selectors/staticPagesSelector";

import Form from '../../Form/Form';
import StaticPageForms from './FormsConstants';
import { addTitle, deleteTitle } from '../../../strings';

const StaticPageEditor = ({
    categories,
    page_route,
    static_page_data,
    AddStaticPageAction,
    DeleteStaticPageAction
}) => {

    const [controller, setController] = useState([]);
    const [category, setCategory] = useState({});

    useEffect(() => {
        const temp_controller = [{
            list: categories.map(category => ({
                label: category.Name,
                value: category.id
            })),
            onChange: (selected) => {
                const find_category = categories.find(category => category.id === selected.value);
                setCategory(find_category);
            }
        }];
        setController(temp_controller);
    }, [categories]);

    const add_static_page_data = useCallback((event, form) => {
        event.preventDefault();
        AddStaticPageAction(form, category.id, page_route);
    }, [AddStaticPageAction, category, page_route]);

    const delete_static_page_data = useCallback((id) => {
        DeleteStaticPageAction(id);
    }, [DeleteStaticPageAction]);

    return <div
        className='flex flex-col items-center'>
        {static_page_data.length !== 0 && <fieldset
            className='flex justify-center flex-wrap gap-2 border-2 rounded-sm border-solid border-forest-green-600 w-full px-10 py-4'>
            <legend
                className='text-xl px-2'>
                מוצרים/קטגוריות מוצגות בדף
            </legend>
            {static_page_data?.map(data => {
                return data.id ? <div
                    key={`static-page-data-${data.id}`}>
                    <p
                        className='text-xl px-2 text-center'>
                        {data.Category.Name}
                    </p>
                    <div className='px-4 py-4 flex flex-col gap-2'>
                        show as: {data.DisplayType}
                        <Button
                            variant="outlined"
                            onClick={() => delete_static_page_data(data.id)}>
                            {deleteTitle}
                        </Button>
                    </div>
                </div> :
                    <div
                        key={`static-page-data-${data.PageRoute}-loading`}
                        className='flex justify-center items-center w-fit px-4 py-2 flex-col'>
                        <p>טוען בקשה</p>
                        <CircularProgress />
                    </div>
            })}
        </fieldset>}
        <fieldset
            className="border-2 rounded-sm border-solid border-forest-green-600 w-fit">
            <legend
                className='text-xl px-2 text-center'>{addTitle}</legend>
            {controller.length && <Form
                inputs={StaticPageForms.add_static_page_data}
                controller={controller}
                action={add_static_page_data} />}
        </fieldset>
    </div>;
};

const mapStateToProps = (state, ownProps) => {
    const categories = getCategories(state);
    const static_page_data = getStaticPages(state).filter(page => page.PageRoute === ownProps.page_route);
    return {
        ...ownProps,
        categories,
        static_page_data
    };
};

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        AddStaticPageAction,
        DeleteStaticPageAction
    }, dispatch);
};

export default connect(mapStateToProps, mapActionToProps)(StaticPageEditor);