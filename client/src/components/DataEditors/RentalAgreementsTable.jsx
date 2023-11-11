
import React, { useCallback, useState, useEffect } from 'react';

import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

import moment from 'moment';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import { CloseRentalAgreementAction, DeleteRentalAgreementAction } from '../../redux/actions/RentActions/RentalAgreementsActions';
import AgreementRentalToolsList from '../DataDisplay/AgreementRentalToolsList';
import CustomerData from '../DataDisplay/CustomerData';
import Modal from '../Modal/Modal';
import RentalAgreementsForms from '../../pages/ControlPanel/RentalPage/FormsConstants';
import Form from '../Form/Form';
import { printTitle } from '../../strings';

const RentalAgreementsTable = ({
  customers,
  agreements,
  CloseRentalAgreementAction,
  DeleteRentalAgreementAction,
  filter_fields
}) => {
  const [close_agreement, setCloseAgreement] = useState(false);
  const [open_tools_list, setOpenToolsList] = useState(false);
  const [tools_list_props, setToolsListProps] = useState([]);
  const [selected_agreement, setSelectedAgreement] = useState({});
  const [selected_customer, setSelectedCustomer] = useState({});
  const [show_customer, setShowCustomer] = useState(false);
  const [rows, setRows] = useState([]);

  const temp_columns = [{
    field: 'id',
    headerName: 'ID'
  }, {
    field: 'SerialNumber',
    headerName: 'מספר הסכם',
    flex: 1
  }, {
    field: 'StartDate',
    headerName: 'מתאריך',
    renderCell: (params) => moment(params.value).format("DD/MM/YYYY")
  }, {
    field: 'EndDate',
    headerName: 'עד תאריך',
    renderCell: (params) => params.value ? moment(params.value).format("DD/MM/YYYY") : "הסכם פתוח"
  }, {
    field: 'Customer',
    headerName: 'שם לקוח',
    flex: 1,
    renderCell: (params) => {
      const customer = customers?.find(customer => customer.id === params.value);
      return <Button
        onClick={() => open_customer_data(customer)}
        variant="outlined">{customer?.FullName}</Button>
    }
  }, {
    field: 'Location',
    headerName: 'מיקום',
    flex: 1
  }, {
    field: 'Actions',
    headerName: 'פעולות',
    flex: 1,
    type: "actions",
    renderCell: (params) => {
      return <div className='flex gap-2 justify-center w-full'>
        <Button
          onClick={() => open_tools_list_call_back(params)}
          variant="outlined">כלים</Button>
        <Button
          onClick={() => get_pdf_agreement(params)}
          variant="outlined">{printTitle}</Button>
        {!params.row.EndDate && <Button
          onClick={() => close_agreement_call_back(params)}
          variant="outlined">סגור הסכם</Button>}
        {!params.row.EndDate && <Button
          onClick={() => delete_agreement(params)}
          variant="outlined">מחק הסכם</Button>}
      </div>;
    }
  }];

  const columns = temp_columns.filter(column => !filter_fields.find(field => field === column.field));

  useEffect(() => {
    const row_parsed = (agreements && agreements.reduce((agreements_array, agreement) => {
      if (agreement.id) {
        agreements_array.push({
          id: agreement.id,
          SerialNumber: agreement.SerialNumber,
          StartDate: agreement.StartDate,
          EndDate: agreement.EndDate,
          Customer: agreement.CustomerId,
          Location: agreement.Location,
          ToolsList: agreement.RentalAgreementLists.map(list => list.RentProduct)
        });
      }
      return agreements_array;
    }, [])) || [];
    setRows(row_parsed);
  }, [agreements]);


  const delete_agreement = useCallback((params) => {
    DeleteRentalAgreementAction(params.id);
  }, [DeleteRentalAgreementAction]);


  const close_agreement_call_back = useCallback((params) => {
    const agreement = agreements.find(agreement => agreement.id === params.id);
    setSelectedAgreement(agreement);
    setCloseAgreement(true)
  }, [agreements]);

  const open_tools_list_call_back = useCallback((params) => {
    setToolsListProps({
      agreement_number: params.row.SerialNumber,
      tools: params.row.ToolsList
    });
    setOpenToolsList(true);
  }, []);

  const open_customer_data = useCallback((customer) => {
    setSelectedCustomer(customer);
    setShowCustomer(true);
  }, []);

  const get_pdf_agreement = useCallback((params) => {
    window.open(`${process.env.REACT_APP_API_BASE_URL}/rental_agreements/${params.id}?pdf=true`);
  }, []);

  const close_agreement_form_submit = useCallback((event, form) => {
    event.preventDefault();
    CloseRentalAgreementAction(selected_agreement.id, form);
  }, [CloseRentalAgreementAction, selected_agreement]);

  return (<>
    <Box sx={{ width: '100%' }} className="h-screen mt-5">
      <DataGrid
        components={{ Toolbar: GridToolbar }}
        rows={rows}
        columns={columns}></DataGrid>
    </Box>
    {open_tools_list && <Modal setClose={() => setOpenToolsList(false)}>
      <AgreementRentalToolsList
        {...tools_list_props}
      />
    </Modal>}
    {show_customer && <Modal setClose={() => setShowCustomer(false)}>
      <CustomerData
        customer={selected_customer}
      />
    </Modal>}
    {close_agreement && <Modal setClose={() => setCloseAgreement(false)}>
      <Form
        className={`w-3/4 mx-auto flex gap-5 flex-wrap justify-center`}
        inputs={RentalAgreementsForms.close_rental_agreement}
        action={close_agreement_form_submit} />
    </Modal>}
  </>)
}


const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps
  };
};

const mapActionToProps = (dispatch) => {
  return bindActionCreators({
    CloseRentalAgreementAction,
    DeleteRentalAgreementAction
  }, dispatch);
};

export default connect(mapStateToProps, mapActionToProps)(RentalAgreementsTable);