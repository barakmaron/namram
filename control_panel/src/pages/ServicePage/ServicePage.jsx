import React, { useCallback, useEffect, useState } from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

import { getServiceReports } from "../../redux/selectors/serviceSelector";
import { getCategories } from "../../redux/selectors/categoriesSelector";
import { GetServiceReportsAction, AddServiceReportsAction } from "../../redux/actions/ServiceActions/ServiceActions";
import { GetRentAction } from "../../redux/actions/RentActions/RentActions";
import ControlPanelBlock from '../../components/ControlPanelBlock';
import ServiceReportTable from '../../components/DataEditors/ServiceReportTable';
import Form from '../../components/Form/Form';
import Modal from '../../components/Modal/Modal';
import ServiceReportForms from './FormsConstants';
import { addToolToRepairTitle, repairTitle, toolsInRepairTitle } from '../../strings';

const ServicePage = ({
    categories,
    service_reports,
    GetRentAction,
    GetServiceReportsAction,
    AddServiceReportsAction
}) => {

    const [openAddToolToService, setOpenToolToService] = useState(false);
    const [categoriesList, setCategoriesList] = useState([]);
    const [productsList, setProductsList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [addFormController, setAddFormController] = useState([]);

    useEffect(() => {
        GetServiceReportsAction();
    }, [GetServiceReportsAction]);

    useEffect(() => {
        GetRentAction()
    }, [GetRentAction]);

    useEffect(() => {
        const parsedCategoriesList = categories.map(category => ({
            label: category.Name,
            value: category.id
        }));
        setCategoriesList(parsedCategoriesList);
    }, [categories]);

    useEffect(() => {
        const products = selectedCategory && selectedCategory.RentProducts.map(product => ({
            label: `${product.Product.Name} | מס ${product.Product.SerialNumber}`,
            value: product.id
        }));
        setProductsList(products);
    }, [selectedCategory]);

    useEffect(() => {
        const controller = [{
            list: categoriesList,
            onChange: (selected) => {
                const category = categories.find(category => category.id === selected.value);
                setSelectedCategory(category);
            }
        }, {
            list: productsList,
            onChange: (selected) => {
                const product = productsList.find(product => product.value === selected.value);
                setSelectedProduct(product);
            }
        }];
        setAddFormController(controller);
    }, [categoriesList, categories, productsList]);

    const addToolToService = useCallback((event, form) => {
        event.preventDefault();
        AddServiceReportsAction(form, selectedProduct.value);
    }, [AddServiceReportsAction, selectedProduct]);

    return (<div className='flex-1'>
        <h2 className="w-fit mx-auto my-4 text-4xl font-bold text-green-600">
            {repairTitle}
        </h2>
        <div className='flex flex-row gap-5 flex-wrap w-fit mx-auto'>
            <ControlPanelBlock
                number={service_reports.length}
                actions={[{
                    label: addToolToRepairTitle,
                    value: () => setOpenToolToService(true)
                }]}>
                {toolsInRepairTitle}
            </ControlPanelBlock>
        </div>
        <ServiceReportTable
            service_reports={service_reports} />
        {openAddToolToService && <Modal setClose={() => setOpenToolToService(false)}>
            <Form
                inputs={ServiceReportForms.add_tool_to_service}
                controller={addFormController}
                action={addToolToService} />
        </Modal>}
    </div>);
};

const mapStateToProps = (state, ownProps) => {
    const categories = getCategories(state);
    const service_reports = getServiceReports(state);
    return {
        ...ownProps,
        categories,
        service_reports
    };
};

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        GetRentAction,
        GetServiceReportsAction,
        AddServiceReportsAction
    }, dispatch);
};

export default connect(mapStateToProps, mapActionToProps)(ServicePage);