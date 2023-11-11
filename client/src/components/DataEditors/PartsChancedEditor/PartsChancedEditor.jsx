import React, { useState, useCallback, useEffect } from 'react';

import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

import { Button } from "@mui/material";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { FaShekelSign } from 'react-icons/fa';

import { AddChangedPartAction, DeleteChangedPartAction } from "../../../redux/actions/ServiceActions/ServiceChangedPartActions";
import { getServiceReports } from "../../../redux/selectors/serviceSelector";

import Form from '../../Form/Form';
import ChangedPartForms from './FormConstants';
import { deleteTitle, serialNumberTitle } from '../../../strings';

const PartsChancedEditor = ({
    service_report_id,
    parts,
    diagrams,
    AddChangedPartAction,
    DeleteChangedPartAction
}) => {

    const [rows, setRows] = useState([]);
    const [parsed_diagrams, setParsedDiagrams] = useState([]);
    const [parts_in_diagram, setPartsInDiagram] = useState([]);
    const [change_part_form_controller, setChangePartFormController] = useState([]);
    const [selected_diagram, setSelectedDiagram] = useState({});
    const [selected_part, setSelectedPart] = useState({});

    const columns = [{ 
        field: 'id', 
        headerName: 'ID'
      }, {
        field: 'SerialNumber',
        headerName: serialNumberTitle,
        flex: 1
      }, {
        field: 'NameEnglish',
        headerName: 'שם באנגלית',
        flex: 1
      }, {
        field: 'NameHebrew',
        headerName: 'שם עברית',
        flex: 1
      }, {
        field: 'Price',
        headerName: 'מחיר',
        flex: 1,
        renderCell: (params) => {
          return <span className='text-forest-green-600 font-bold flex justify-end items-center gap-2 w-full'>{params.value}<FaShekelSign/></span>;
        }
      }, {
        field: 'Diagram',
        headerName: 'דיאגרמה',
        flex: 1
      }, {
          field: 'actions',
          headerName: 'פעולות',
          flex: 1,
          type: "actions",
          renderCell: (params) => {
              return <>
                  <Button      
                  onClick={() => delete_changed_part(params)}       
                  variant="outlined">{deleteTitle}</Button>
              </>;
          }
      }];

    useEffect(() => {
      const row_parsed = parts?.reduce((parts_array, part) => {
        if(part.id){
          parts_array.push({
              id: part.id,
              SparePartId: part.SparePart.id,
              SerialNumber: part.SparePart.SerialNumber,
              NameEnglish: part.SparePart.NameEnglish,
              NameHebrew: part.SparePart.NameHebrew,
              Price: part.SparePart.Price,
              Diagram: part.SparePart.ProductPartsDiagram.ModelName
          });
        }
        return parts_array;
      }, []) || [];
      setRows(row_parsed);
    }, [parts]);

    useEffect(() => {
        const temp_diagrams = diagrams.map(diagram => ({
            label: diagram.ProductPartsDiagram.ModelName,
            value: diagram.id
        }));
        setParsedDiagrams(temp_diagrams);
    }, [diagrams])

    useEffect(() => {
        const controller = [{
            list: parsed_diagrams,
            onChange: (selected) => {
              const diagram = diagrams.find(diagram => diagram.id === selected.value);
              const temp_parts_in_diagram = diagram.ProductPartsDiagram.SpareParts;
              setPartsInDiagram(temp_parts_in_diagram);
              setSelectedDiagram(diagram);
            }
        }, {
            list: parts_in_diagram.map(part => ({
              label: `${part.NameEnglish} | ${part.NameHebrew}`,
              value: part.id
            })),
            onChange: (selected) => {
              const part = selected_diagram.ProductPartsDiagram.SpareParts.find(part => part.id === selected.value);
              setSelectedPart(part);
            }
        }];
        setChangePartFormController(controller);
    }, [parsed_diagrams, diagrams, parts_in_diagram, selected_diagram]);

    const add_part = useCallback((event) => {
      event.preventDefault();
      AddChangedPartAction(service_report_id, selected_part);
    }, [AddChangedPartAction, service_report_id, selected_part])

    const delete_changed_part = useCallback((params) => {
      DeleteChangedPartAction(service_report_id, params.row.SparePartId);
    }, [DeleteChangedPartAction, service_report_id]);

  return (<>
    <div>
        { change_part_form_controller.length && <Form 
        inputs={ChangedPartForms.add_changed_part}
        controller={change_part_form_controller}
        action={add_part}/>}
    </div>
    <div className='w-[75vw] h-screen'>
        <DataGrid
        components={{ Toolbar: GridToolbar }}
        rows={rows}
        columns={columns}></DataGrid>
      </div>
  </>);
};

const mapStateToProps = (state, ownProps) => {
  const service_report = getServiceReports(state).find(report => report.id === ownProps.service_report_id);
  return { 
      ...ownProps,
      parts: service_report.PartsChangeds,
      diagrams: service_report.RentProduct.Product.ProductDiagramsLists
  };
};

const mapActionToProps = (dispatch) => {
  return bindActionCreators({
      AddChangedPartAction,
      DeleteChangedPartAction
  }, dispatch);
};

export default connect(mapStateToProps, mapActionToProps)(PartsChancedEditor);