
import React, { useCallback, useState, useEffect } from 'react';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import { getCustomers } from "../../redux/selectors/customersSelector";
import { GetAllCustomersAction, PatchCustomerAction, DeleteCustomerAction, AddCustomerAction } from "../../redux/actions/CustomersActions";
import { GetRentalForCustomerAgreementsAction } from '../../redux/actions/RentActions/RentalAgreementsActions';
import { getAgreements } from "../../redux/selectors/rentalAgreementsSelector";

import ControlPanelBlock from '../../components/ControlPanelBlock';
import CustomerData from '../../components/DataDisplay/CustomerData';
import RentalAgreementsTable from '../../components/DataEditors/RentalAgreementsTable';
import Form from '../../components/Form/Form';
import Modal from '../../components/Modal/Modal';
import AddCustomerForm from './FormConstants';
import {
    Address, CompanyName, FaxNumber, FullName,
    HomePhoneNumber, IdNumber, PhoneNumber, addTitle,
    customersActions, customersTitle, manageCustomersTitle,
} from '../../strings';
import { ACTIONS_COLUMNS, COLUMNS } from '../../utils/columns';

const CustomersPage = ({
    customers,
    customer_agreements,
    GetAllCustomersAction,
    PatchCustomerAction,
    DeleteCustomerAction,
    GetRentalForCustomerAgreementsAction,
    AddCustomerAction
}) => {

    const [rows, setRows] = useState([]);
    const [selected_customer, setSelectedCustomer] = useState({});
    const [openPrint, setOpenPrint] = useState(false);
    const [openRentalAgreements, setOpenRentalAgreements] = useState(false);
    const [openCustomerForm, setCustomerForm] = useState(false);

    useEffect(() => {
        GetAllCustomersAction();
    }, [GetAllCustomersAction]);

    useEffect(() => {
        const parse_rows = customers?.reduce((accumulate, customer) => {
            if (customer.id)
                accumulate.push({
                    id: customer.id,
                    FullName: customer.FullName,
                    CompanyName: customer.CompanyName,
                    PhoneNumber: customer.PhoneNumber,
                    IdNumber: customer.IdNumber,
                    Address: customer.Address,
                    HomePhoneNumber: customer.HomePhoneNumber,
                    FaxNumber: customer.FaxNumber
                });
            return accumulate;
        }, []);
        setRows(parse_rows);
    }, [customers]);

    const editCell = useCallback((params) => {
        PatchCustomerAction(params.id, params.field, params.value);
    }, [PatchCustomerAction]);

    const openPrintCallback = useCallback((params) => {
        const customer = customers.find(customer => customer.id === params.id);
        setSelectedCustomer(customer);
        setOpenPrint(true);
    }, [customers]);

    const deleteCustomer = useCallback((params) => {
        DeleteCustomerAction(params.id);
    }, [DeleteCustomerAction]);

    const openRentalAgreementsCallback = useCallback((params) => {
        GetRentalForCustomerAgreementsAction(params.id);
        setOpenRentalAgreements(true);
    }, [GetRentalForCustomerAgreementsAction]);

    const submitNewCustomer = useCallback((event, form) => {
        event.preventDefault();
        AddCustomerAction(form);
    }, [AddCustomerAction]);

    const columns = [
        COLUMNS[FullName],
        COLUMNS[CompanyName],
        COLUMNS[PhoneNumber],
        COLUMNS[IdNumber],
        COLUMNS[Address],
        COLUMNS[HomePhoneNumber],
        COLUMNS[FaxNumber],
        ACTIONS_COLUMNS[customersActions](openPrintCallback, openRentalAgreementsCallback, deleteCustomer)
    ];

    return (<div className='flex-1 pt-5'>
        <div className='flex flex-row gap-5 flex-wrap w-fit mx-auto'>
            <ControlPanelBlock
                actions={[{
                    label: `${addTitle} לקוח חדש`,
                    value: () => setCustomerForm(true)
                }]}>
                {manageCustomersTitle}
            </ControlPanelBlock>
        </div>
        <h2 className="w-fit mx-auto my-4 text-4xl font-bold text-green-600">
            {customersTitle}
        </h2>
        <Box sx={{ width: '100%' }} className="h-screen mt-5">
            <DataGrid
                onCellEditCommit={editCell}
                components={{ Toolbar: GridToolbar }}
                rows={rows}
                columns={columns}></DataGrid>
        </Box>
        {openPrint && <Modal setClose={() => setOpenPrint(false)}>
            <CustomerData
                customer={selected_customer} />
        </Modal>}
        {openRentalAgreements && <Modal
            className="w-[75vw]"
            setClose={() => setOpenRentalAgreements(false)}>
            <RentalAgreementsTable
                customers={customers}
                filter_fields={["Customer"]}
                agreements={customer_agreements}
            />
        </Modal>}
        {openCustomerForm && <Modal
            className="w-[75vw]"
            setClose={() => setCustomerForm(false)}>
            <Form
                inputs={AddCustomerForm}
                className="flex flex-wrap justify-center gap-2"
                action={submitNewCustomer} />
        </Modal>}
    </div>);
};

const mapStateToProps = (state, ownProps) => {
    const customers = getCustomers(state);
    const customer_agreements = getAgreements(state);
    return { ...ownProps, customers, customer_agreements };
};

const mapActionsToProps = (dispatch) => {
    return bindActionCreators({
        GetAllCustomersAction,
        PatchCustomerAction,
        DeleteCustomerAction,
        GetRentalForCustomerAgreementsAction,
        AddCustomerAction
    }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(CustomersPage);