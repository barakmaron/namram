import { Box, Button } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React, { useCallback, useEffect, useState } from 'react';
import FormConnector from '../../Form/FormConnector';
import ScheduledForms from './FormConstants';

const ScheduledServiceEditor = ({
  services,
  product_id,
  category_id,
  AddScheduledServiceAction,
  PatchScheduledServiceAction,
  DeleteScheduledServiceAction
}) => {

  const [rows, setRows] = useState([]);

  const columns = [{ 
    field: 'id', 
    headerName: 'ID'
  }, {
    field: 'Name',
    headerName: 'שם הטיפול',
    flex: 1
  }, {
    field: 'Scheduled',
    headerName: 'מתי לטפל',
    editable: true
  }, {
    field: 'LastServiceDate',
    headerName: 'בוצע בתאריך'
  }, {
    field: 'Actions',
    headerName: 'פעולות',
    flex: 1,
    type: "actions",
    renderCell: (params) => {
        return <div className='flex gap-2 justify-center w-full'>
          <Button 
          onClick={() => delete_service(params)}
          variant="outlined">מחק</Button>
          <Button 
          onClick={() => {}}
          variant="outlined">ערוך תיאור</Button>
        </div>;
    }
  }];

  useEffect(() => {
    const row_parsed = services ? services.map((service) => {
      if(service.id){
        return {
          id: service.id,
          ProductId: product_id,
          Name: service.Name,
          Scheduled: service.Scheduled,
          LastServiceDate: service.LastServiceDate
        };
      }
    }) : [];
    const filter_add_only_redux = row_parsed.filter(row => row !== undefined);
    setRows(filter_add_only_redux);
  }, [services, product_id]);

  const edit_cell = useCallback((params) => {
    PatchScheduledServiceAction(params.id, product_id, category_id, params.field, params.value);
  }, [PatchScheduledServiceAction, product_id, category_id]);

  const add_service = useCallback((event, form) => {
    event.preventDefault();
    AddScheduledServiceAction(product_id, category_id, form)
  }, [product_id, AddScheduledServiceAction, category_id]);

  const delete_service = useCallback((params) => {
    DeleteScheduledServiceAction(params.id, product_id, category_id);
  }, [DeleteScheduledServiceAction, product_id, category_id]);

  return <div className='flex flex-col min-h-[20rem] w-[50vw] justify-center'>
    <FormConnector
    inputs={ScheduledForms.add_service}
    action={add_service}/>
    <Box sx={{width: '100%' }} className="h-screen mt-5">
        <DataGrid
        components={{ Toolbar: GridToolbar }}
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        onCellEditCommit={edit_cell}></DataGrid>
    </Box>
    </div>;
}

export default ScheduledServiceEditor