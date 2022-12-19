import { Box, Button } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import moment from 'moment';
import React, { useCallback } from 'react';
import { useEffect, useState } from 'react';
import { FaShekelSign } from 'react-icons/fa';
import Constants from '../../../Constants';
import Modal from '../../Modal/Modal';
import PartsChancedEditorConnector from '../PartsChancedEditor/PartsChancedEditorConnector';

const ServiceReportTable = ({
  service_reports,
  PatchServiceReportAction
}) => {

  const [rows, setRows] = useState([]);
  const [open_changed_parts_list, setOpenChangedPartsList] = useState(false);
  const [selected_service_report, setSelectedServiceReport] = useState({});

  const columns = [{ 
    field: 'id', 
    headerName: 'ID'
  }, {
    field: 'ProductName',
    headerName: 'שם הכלי',
    flex: 1
  }, {
    field: 'SerialNumber',
    headerName: 'מספר סידורי',
  }, {
    field: 'Problem',
    headerName: 'בעיה',
    flex: 1,
    editable: true
  }, {
    field: 'Update',
    headerName: 'עדכון',
    editable: true
  }, {
    field: 'Cost',
    headerName: 'עלות',
    renderCell: (params) => {
      return <span className='text-forest-green-600 font-bold flex justify-end items-center gap-2 w-full'>{params.value}<FaShekelSign/></span>;
    }
  }, {
    field: 'StartDate',
    headerName: 'מתאריך',
    renderCell: (params) => moment(params.value).format("DD/MM/YYYY")
  }, {
    field: 'Actions',
    headerName: 'פעולות',
    flex: 1,
    type: "actions",
    renderCell: (params) => {
        return <div className='flex gap-2 justify-center w-full'>
          <Button 
          onClick={() => get_pdf_service_report(params)}
          variant="outlined">הדפס</Button>
          <Button 
          onClick={() => open_changed_parts(params)}
          variant="outlined">חלקים</Button>
          <Button 
          onClick={() => get_pdf_service_book(params)}
          variant="outlined">ספר תחזוקה</Button>
          <Button 
          onClick={() => edit_cell({
            id: params.id,
            field: "EndDate",
            value: moment().toString()
          })}
          variant="outlined">סגור</Button>
        </div>;
    }
  }];

  useEffect(() => {    
    const row_parsed = service_reports && service_reports.reduce((reports_array, report) => {
      if(report.id){
        reports_array.push({
          id: report.id,
          ProductId: report.RentProduct.ProductId,
          ProductName: report.RentProduct.Product.Name,
          SerialNumber: report.RentProduct.Product.SerialNumber,
          Problem: report.Problem.replace(Constants.html_remove_regex, ""),
          Update: report.Update,
          Cost: report.PartsChangeds.reduce((accumulator, part) => accumulator + Number.parseInt(part.SparePart.Price), 0) || 0
        });
      }
      return reports_array;
    }, []);
    const filter_add_only_redux = row_parsed.filter(row => row !== undefined);
    setRows(filter_add_only_redux);
  }, [service_reports]);

  const get_pdf_service_report = useCallback((params) => {
    window.open(`${process.env.REACT_APP_API_BASE_URL}/service_reports/${params.id}?pdf=true`); 
  }, []);

  const get_pdf_service_book = useCallback((params) => {
    window.open(`${process.env.REACT_APP_API_BASE_URL}/service_reports/product/${params.row.ProductId}`); 
  }, []);

  const open_changed_parts = useCallback((params) => {
    const service_report = service_reports.find(report => report.id === params.id);
    setSelectedServiceReport(service_report);
    setOpenChangedPartsList(true);
  }, [service_reports]);

  const edit_cell = useCallback((params) => {
    PatchServiceReportAction(params.id, params.field, params.value);
  }, [PatchServiceReportAction]);

  return (<>
    <Box sx={{width: '100%' }} className="h-screen mt-5">
        <DataGrid
        components={{ Toolbar: GridToolbar }}
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        onCellEditCommit={edit_cell}></DataGrid>
    </Box>
    { open_changed_parts_list && <Modal setClose={() => setOpenChangedPartsList(false)}>
      <PartsChancedEditorConnector 
      service_report_id={selected_service_report.id}
      />
    </Modal>}
  </>)
}

export default ServiceReportTable;