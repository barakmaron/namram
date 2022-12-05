import { Box, Button } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import CustomerData from '../../../components/DataDisplay/CustomerData/CustomerData';
import RentalAgreementsTableConnector from '../../../components/DataEditors/RentalAgreementsTable/RentalAgreementsTableConnector';
import Modal from '../../../components/Modal/Modal';

const CustomersPage = ({
    customers,
    customer_agreements,
    GetAllCustomersAction,
    PatchCustomerAction,
    DeleteCustomerAction,
    GetRentalForCustomerAgreementsAction
}) => {

    const [rows, setRows] = useState([]);
    const [selected_customer, setSelectedCustomer] = useState({});
    const [open_print, setOpenPrint] = useState(false);
    const [open_rental_agreements, setOpenRentalAgreements] = useState(false);

    useEffect(() => {
        GetAllCustomersAction();
    }, [GetAllCustomersAction]);

    const columns = [{ 
        field: 'id', 
        headerName: 'ID'
      }, {
        field: 'FullName',
        headerName: 'שם מלא',
        editable: true
      }, {
        field: 'CompanyName',
        headerName: 'שם חברה',
        flex: 1,
        editable: true
      }, {
        field: 'PhoneNumber',
        headerName: 'מספר טלפון',
        editable: true,
        renderCell: (params) => {
            return <a href={`tel:${params.value}`} className='text-forest-green-500 font-bold'>{params.value}</a>;
        }
      }, {
        field: 'IdNumber',
        headerName: 'מספר זהות',
        editable: true
      }, {
        field: 'Address',
        headerName: 'כתובת',
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
        headerName: 'מספר פקס',
        editable: true
      }, {
        field: 'Actions',
        headerName: 'פעולות',
        flex: 1,
        type: "actions",
        renderCell: (params) => {
            return <div className='flex gap-2 justify-center w-full flex-wrap'>
              <Button 
              onClick={() => open_print_call_back(params)}
              variant="outlined">הדפס</Button>
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
        const parse_rows = customers?.map(customer => {
            return {
                id: customer.id,
                FullName: customer.FullName,
                CompanyName: customer.CompanyName,
                PhoneNumber: customer.PhoneNumber,
                IdNumber: customer.IdNumber,
                Address: customer.Address,
                HomePhoneNumber: customer.HomePhoneNumber,
                FaxNumber: customer.FaxNumber
            }
        });
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

  return (<div className='flex-1'>
   <h2 className="w-fit mx-auto my-4 text-4xl font-bold text-green-600">
      לקוחות
    </h2>
    <Box sx={{width: '100%' }} className="h-screen mt-5">
        <DataGrid
        onCellEditCommit={edit_cell}
        components={{ Toolbar: GridToolbar }}
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}></DataGrid>
    </Box>
    {open_print && <Modal setClose={() => setOpenPrint(false)}>
        <CustomerData 
        customer={selected_customer}/>
    </Modal>}
    {open_rental_agreements && <Modal 
    className="w-[75vw]"
    setClose={() => setOpenRentalAgreements(false)}>
        <RentalAgreementsTableConnector
        customers={customers}
        filter_fields={["Customer"]}
        agreements={customer_agreements}
        />
    </Modal>}
  </div>);
};

export default CustomersPage;