import { Button, CircularProgress } from '@mui/material';
import React from 'react'
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Form from '../../Form/Form';
import StaticPageForms from './FormsConstants';

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
    { static_page_data.length !== 0 && <fieldset 
    className='flex justify-center flex-wrap gap-2 border-2 rounded-sm border-solid border-forest-green-600 w-full px-10 py-4'>
        <legend
        className='text-xl px-2'>
            מוצרים/קטגוריות מוצגות בדף
        </legend>
        {static_page_data?.map(data => {
            return  data.id ? <div
            key={`static-page-data-${data.id}`}>
                <p
                className='text-xl px-2 text-center'>
                    {data.Category.Name}
                </p>
                <div className='px-4 py-4 flex flex-col gap-2'>
                    show as: { data.DisplayType }
                    <Button
                    variant="outlined"
                    onClick={() => delete_static_page_data(data.id)}>
                        מחק
                    </Button>
                </div>
            </div> :
            <div className='flex justify-center items-center w-fit px-4 py-2 flex-col'>
                <p>טוען בקשה</p>
                <CircularProgress/>
            </div>
        })}
    </fieldset> }
    <fieldset
    className="border-2 rounded-sm border-solid border-forest-green-600 w-fit">
        <legend
        className='text-xl px-2 text-center'>הוסף</legend>
        { controller.length &&<Form
        inputs={StaticPageForms.add_static_page_data}
        controller={controller}
        action={add_static_page_data}/>}
    </fieldset>
  </div>;
};

export default StaticPageEditor;