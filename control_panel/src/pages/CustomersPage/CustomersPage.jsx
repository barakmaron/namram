
import React, { useCallback, useState, useEffect } from 'react';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Box, Button } from '@mui/material';
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
import { actionTitle, addTitle, addressTitle, companyNameTitle, faxNumberTitle, fullNameTitle, idNumberTitle, phoneNumberTitle, printTitle } from '../../strings';

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
  const [open_print, setOpenPrint] = useState(false);
  const [open_rental_agreements, setOpenRentalAgreements] = useState(false);
  const [open_customer_form, setCustomerForm] = useState(false);

  useEffect(() => {
    GetAllCustomersAction();
  }, [GetAllCustomersAction]);

  const columns = [{
    field: 'id',
    headerName: 'ID'
  }, {
    field: 'FullName',
    headerName: fullNameTitle,
    editable: true
  }, {
    field: 'CompanyName',
    headerName: companyNameTitle,
    flex: 1,
    editable: true
  }, {
    field: 'PhoneNumber',
    headerName: phoneNumberTitle,
    editable: true,
    renderCell: (params) => {
      return <a href={`tel:${params.value}`} className='text-forest-green-500 font-bold'>{params.value}</a>;
    }
  }, {
    field: 'IdNumber',
    headerName: idNumberTitle,
    editable: true
  }, {
    field: 'Address',
    headerName: addressTitle,
    flex: 1,
    editable: true
  }, {
    field: 'HomePhoneNumber',
    headerName: 'טלפון בית/משרד',
    editable: true,
    renderCell: (params) => {
      return <a href={`tel:${params.value}`} className='text-forest-green-500 font-bold'>{params.value}</a>;
    }
  }, {
    field: 'FaxNumber',
    headerName: faxNumberTitle,
    editable: true
  }, {
    field: 'Actions',
    headerName: actionTitle,
    flex: 1,
    type: "actions",
    renderCell: (params) => {
      return <div className='flex gap-2 justify-center w-full flex-wrap'>
        <Button
          onClick={() => open_print_call_back(params)}
          variant="outlined">{printTitle}</Button>
        <Button
          onClick={() => open_rental_agreements_call_back(params)}
          variant="outlined">הסכמים</Button>
        <Button
          onClick={() => delete_customer(params)}
          variant="outlined">מחק לקוח</Button>
      </div>;
    }
  }];

  useEffect(() => {
    const parse_rows = customers?.reduce((aculeate, customer) => {
      if (customer.id)
        aculeate.push({
          id: customer.id,
          FullName: customer.FullName,
          CompanyName: customer.CompanyName,
          PhoneNumber: customer.PhoneNumber,
          IdNumber: customer.IdNumber,
          Address: customer.Address,
          HomePhoneNumber: customer.HomePhoneNumber,
          FaxNumber: customer.FaxNumber
        });
      return aculeate;
    }, []);
    setRows(parse_rows);
  }, [customers]);

  const edit_cell = useCallback((params) => {
    PatchCustomerAction(params.id, params.field, params.value);
  }, [PatchCustomerAction]);

  const open_print_call_back = useCallback((params) => {
    const customer = customers.find(customer => customer.id === params.id);
    setSelectedCustomer(customer);
    setOpenPrint(true);
  }, [customers]);

  const delete_customer = useCallback((params) => {
    DeleteCustomerAction(params.id);
  }, [DeleteCustomerAction]);

  const open_rental_agreements_call_back = useCallback((params) => {
    GetRentalForCustomerAgreementsAction(params.id);
    setOpenRentalAgreements(true);
  }, [GetRentalForCustomerAgreementsAction]);

  const submit_new_customer = useCallback((event, form) => {
    event.preventDefault();
    AddCustomerAction(form);
  }, [AddCustomerAction]);

  return (<div className='flex-1 pt-5'>
    <div className='flex flex-row gap-5 flex-wrap w-fit mx-auto'>
      <ControlPanelBlock
        actions={[{
          label: `${addTitle} לקוח חדש`,
          value: () => setCustomerForm(true)
        }]}>
        ניהול לקוחות
      </ControlPanelBlock>
    </div>
    <h2 className="w-fit mx-auto my-4 text-4xl font-bold text-green-600">
      לקוחות
    </h2>
    <Box sx={{ width: '100%' }} className="h-screen mt-5">
      <DataGrid
        onCellEditCommit={edit_cell}
        components={{ Toolbar: GridToolbar }}
        rows={rows}
        columns={columns}></DataGrid>
    </Box>
    {open_print && <Modal setClose={() => setOpenPrint(false)}>
      <CustomerData
        customer={selected_customer} />
    </Modal>}
    {open_rental_agreements && <Modal
      className="w-[75vw]"
      setClose={() => setOpenRentalAgreements(false)}>
      <RentalAgreementsTable
        customers={customers}
        filter_fields={["Customer"]}
        agreements={customer_agreements}
      />
    </Modal>}
    {open_customer_form && <Modal
      className="w-[75vw]"
      setClose={() => setCustomerForm(false)}>
      <Form
        inputs={AddCustomerForm}
        className="flex flex-wrap justify-center gap-2"
        action={submit_new_customer} />
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