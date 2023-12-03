import React, { useCallback, useEffect, useState } from 'react';

import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

import { Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import { AddScheduledServiceAction, PatchScheduledServiceAction, DeleteScheduledServiceAction } from "../../../redux/actions/ProductsActions/scheduledServiceAction";
import Form from '../../Form/Form';
import ScheduledForms from './FormConstants';
import moment from 'moment';
import Constants from '../../../Constants';
import Modal from '../../Modal/Modal';
import TextEditor from '../TextEditor';
import { LastServiceDate, Name, Scheduled, nameOfTheServiceTitle, scheduledServiceActions } from '../../../strings';
import { ACTIONS_COLUMNS, COLUMNS } from '../../../utils/columns';

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

  useEffect(() => {
    const row_parsed = (services && services.reduce((services_array, service) => {
      if (service.id) {
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
    }, [])) || [];
    setRows(row_parsed);
  }, [services, product_id]);

  const editCell = useCallback((params) => {
    PatchScheduledServiceAction(params.field, params.value, params.id, product_id, category_id);
  }, [PatchScheduledServiceAction, product_id, category_id]);

  const addService = useCallback((event, form) => {
    event.preventDefault();
    AddScheduledServiceAction(product_id, category_id, form)
  }, [product_id, AddScheduledServiceAction, category_id]);

  const deleteService = useCallback((params) => {
    DeleteScheduledServiceAction(params.id, product_id, category_id);
  }, [DeleteScheduledServiceAction, product_id, category_id]);

  const setServiceDone = useCallback((params) => {
    PatchScheduledServiceAction(LastServiceDate, new Date(), params.id, product_id, category_id);
  }, [PatchScheduledServiceAction, product_id, category_id]);

  const openTextEdit = useCallback((params) => {
    setText(params.row.Text);
    setEditText(true);
    setServiceId(params.id);
  }, []);

  const columns = [
    COLUMNS[Name](nameOfTheServiceTitle),
    COLUMNS[Scheduled],
    COLUMNS[LastServiceDate],
    ACTIONS_COLUMNS[scheduledServiceActions](deleteService, openTextEdit, setServiceDone)
  ];

  return <div className='flex flex-col min-h-[20rem] w-[50vw] justify-center'>
    <Form
      inputs={ScheduledForms.add_service}
      action={addService} />
    <Box sx={{ width: '100%' }} className="h-screen mt-5">
      <DataGrid
        components={{ Toolbar: GridToolbar }}
        rows={rows}
        columns={columns}
        onCellEditCommit={editCell}></DataGrid>
    </Box>
    {edit_text && <Modal setClose={() => setEditText(false)}>
      <TextEditor
        text={text}
        Action={PatchScheduledServiceAction}
        meta_data={{
          service_id: service_id,
          product_id,
          category_id
        }} />
    </Modal>}
  </div>;
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
  };
};

const mapActionToProps = (dispatch) => {
  return bindActionCreators({
    AddScheduledServiceAction,
    PatchScheduledServiceAction,
    DeleteScheduledServiceAction
  }, dispatch);
};

export default connect(mapStateToProps, mapActionToProps)(ScheduledServiceEditor);