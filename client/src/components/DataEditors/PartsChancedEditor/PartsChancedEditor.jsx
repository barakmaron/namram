import { Button } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { FaShekelSign } from 'react-icons/fa';
import FormConnector from '../../Form/FormConnector';
import ChangedPartForms from './FormConstants';

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
        headerName: 'מספר סידורי',
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
                  variant="outlined">מחק</Button>
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
        { change_part_form_controller.length && <FormConnector 
        inputs={ChangedPartForms.add_changed_part}
        controller={change_part_form_controller}
        action={add_part}/>}
    </div>
    <div className='w-[75vw] h-screen'>
        <DataGrid
        components={{ Toolbar: GridToolbar }}
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}></DataGrid>
      </div>
  </>);
};

export default PartsChancedEditor;