import React from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import ControlPanelBlock from '../../../components/ControlPanelBlock/ControlPanelBlock';
import ServiceReportTableConnector from '../../../components/DataEditors/ServiceReportsTable/ServiceReportTableConnector';
import FormConnector from '../../../components/Form/FormConnector';
import Modal from '../../../components/Modal/Modal';
import ServiceReportForms from './FormsConstants';

const ServicePage = ({
    categories,
    service_reports,
    GetRentAction,
    GetServiceReportsAction,
    AddServiceReportsAction
}) => {

    const [open_add_tool_to_service, setOpenToolToService] = useState(false);
    const [categories_list, setCategoriesList] = useState([]);
    const [products_list, setProductsList] = useState([]);
    const [selected_category, setSelectedCategory] = useState(null);
    const [selected_product, setSelectedProduct] = useState(null);
    const [add_form_controller, setAddFormController] = useState([]);

    useEffect(() => {
        GetServiceReportsAction();
    }, [GetServiceReportsAction]);

    useEffect(() => {
        GetRentAction()
    }, [GetRentAction]);

    useEffect(() => {
        const parsed_categories_list = categories.map(category => ({
            label: category.Name,
            value: category.id
        }));
        setCategoriesList(parsed_categories_list);
    }, [categories]);

    useEffect(() => {
        const products = selected_category && selected_category.RentProducts.map(product => ({
            label: product.Product.Name,
            value: product.id
        }));
        setProductsList(products);
    }, [selected_category]); 

    useEffect(() => {
        const controller = [{            
            list: categories_list,
            onChange: (selected) => {
                const category = categories.find(category => category.id === selected.value);                
                setSelectedCategory(category);
            }
        }, {            
            list: products_list,
            onChange: (selected) => {
                const product = products_list.find(product => product.value === selected.value);
                setSelectedProduct(product);
            }
        }];
        setAddFormController(controller);
    }, [categories_list, categories, products_list]);

    const add_tool_to_service = useCallback((event, form) => {
        event.preventDefault();
        AddServiceReportsAction(form, selected_product.value);
    }, [AddServiceReportsAction, selected_product]);

  return (<>
    <h2 className="w-fit mx-auto my-4 text-4xl font-bold text-green-600">
        תיקונים
    </h2>
    <div className='flex flex-row gap-5 flex-wrap w-fit mx-auto'>
    <ControlPanelBlock
        number={service_reports.length}
        actions={[{
            label: "הוסף כלי לתיקון",
            value: () => setOpenToolToService(true)
        }]}>
            כלים בתיקון
        </ControlPanelBlock>
        <ControlPanelBlock
        number={service_reports.length}
        actions={[{
            label: "הוסף כלי לתיקון",
            value: () => setOpenToolToService(true)
        }]}>
            כלים בתיקון
        </ControlPanelBlock>
    </div>
    <ServiceReportTableConnector
    service_reports={service_reports}/>
    {open_add_tool_to_service && <Modal setClose={() => setOpenToolToService(false)}>
        <FormConnector
        inputs={ServiceReportForms.add_tool_to_service}
        controller={add_form_controller}
        action={add_tool_to_service}/>
    </Modal>}
  </>);
};

export default ServicePage;