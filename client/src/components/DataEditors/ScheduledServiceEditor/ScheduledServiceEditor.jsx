import { Box, Button } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React, { useCallback, useEffect, useState } from 'react';
import FormConnector from '../../Form/FormConnector';
import ScheduledForms from './FormConstants';
import moment from 'moment';
import Constants from '../../../Constants';
import Modal from '../../Modal/Modal';
import TextEditor from '../TextEditor/TextEditor';

const ScheduledServiceEditor = ({
  services,
  product_id,
  category_id,
  AddScheduledServiceAction,
  PatchScheduledServiceAction,
  DeleteScheduledServiceAction
}) => {

  const [rows, setRows] = useState([]);
  const [edit_text, setEditText] = useState(false);
  const [text, setText] = useState("");
  const [service_id, setServiceId] = useState("");

  const columns = [{ 
    field: 'id', 
    headerName: 'ID'
  }, {
    field: 'Name',
    headerName: 'שם הטיפול',
    flex: 1,
    editable: true
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
          onClick={() => open_text_edit(params)}
          variant="outlined">ערוך תיאור</Button>
          <Button 
          onClick={() => set_service_done(params)}
          variant="outlined">סמן בוצע</Button>
        </div>;
    }
  }];

  useEffect(() => {
    const row_parsed = services && services.reduce((services_array, service) => {
      if(service.id){
        services_array.push({
          id: service.id,
          ProductId: product_id,
          Name: service.Name,
          Scheduled: service.Scheduled,
          Text: service.Text,
          LastServiceDate: moment(service.LastServiceDate).format(Constants.DateFormat)
        });
      }
      return services_array;
    }, []);
    const filter_add_only_redux = row_parsed.filter(row => row !== undefined);
    setRows(filter_add_only_redux);
  }, [services, product_id]);

  const edit_cell = useCallback((params) => {
    PatchScheduledServiceAction(params.field, params.value, params.id, product_id, category_id);
  }, [PatchScheduledServiceAction, product_id, category_id]);

  const add_service = useCallback((event, form) => {
    event.preventDefault();
    AddScheduledServiceAction(product_id, category_id, form)
  }, [product_id, AddScheduledServiceAction, category_id]);

  const delete_service = useCallback((params) => {
    DeleteScheduledServiceAction(params.id, product_id, category_id);
  }, [DeleteScheduledServiceAction, product_id, category_id]);

  const set_service_done = useCallback((params) => {
    PatchScheduledServiceAction("LastServiceDate", new Date(), params.id, product_id, category_id);
  }, [PatchScheduledServiceAction, product_id, category_id]);

  const open_text_edit = useCallback((params) => {
    setText(params.row.Text);
    setEditText(true);
    setServiceId(params.id);
  }, []);

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
    { edit_text && <Modal setClose={() => setEditText(false)}>
      <TextEditor
      text={text}
      Action={PatchScheduledServiceAction}
      meta_data={{
        service_id: service_id,
        product_id,
        category_id
      }}/>
    </Modal>}
    </div>;
}

export default ScheduledServiceEditor