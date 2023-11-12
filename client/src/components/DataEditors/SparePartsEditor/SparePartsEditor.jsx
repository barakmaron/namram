
import React, { useCallback, useEffect, useState } from 'react';

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { FaShekelSign } from 'react-icons/fa';
import { Button } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import { AddSparePartAction, DeleteSparePartAction, PatchSparePartAction } from "../../../redux/actions/ProductsActions/sparePartActions";

import SparePartsForms from './FormsConstants';
import Form from '../../Form/Form';
import { actionTitle, amountInInventoryTitle, deleteTitle, diagramTitle, nameInEnglishTitle, nameInHebrewTitle, priceTitle, serialNumberTitle } from '../../../strings';

const SparePartsEditor = ({
  parts,
  diagrams,
  product_id,
  category_id,
  AddSparePartAction,
  DeleteSparePartAction,
  PatchSparePartAction,
  product_type
}) => {
  const [form_controller, setFormController] = useState([]);
  const [selected_diagram, setSelectedDiagram] = useState(null);
  const [parsed_diagrams_list, setParsedDiagramsList] = useState([]);

  useEffect(() => {
    setParsedDiagramsList(diagrams.map((diagram) => ({
      label: diagram.ProductPartsDiagram.ModelName,
      value: diagram.ProductPartsDiagram.id
    })));
  }, [diagrams]);

  useEffect(() => {
    const controller = [{
      list: parsed_diagrams_list,
      onChange: (selected) => {
        const diagram = diagrams.find(diagram => diagram.ProductPartsDiagram.id === selected.value);
        setSelectedDiagram(diagram.ProductPartsDiagram.id);
      }
    }];

    setFormController(controller);
  }, [diagrams, parsed_diagrams_list]);


  const columns = [{
    field: 'id',
    headerName: 'ID'
  }, {
    field: 'SerialNumber',
    headerName: serialNumberTitle,
    editable: true,
    flex: 1
  }, {
    field: 'NameEnglish',
    headerName: nameInEnglishTitle,
    editable: true,
    flex: 1
  }, {
    field: 'NameHebrew',
    headerName: nameInHebrewTitle,
    editable: true,
    flex: 1
  }, {
    field: 'Price',
    headerName: priceTitle,
    editable: true,
    flex: 1,
    renderCell: (params) => {
      return <span className='text-forest-green-600 font-bold flex justify-end items-center gap-2 w-full'>{params.value}<FaShekelSign /></span>;
    }
  }, {
    field: 'Count',
    headerName: amountInInventoryTitle,
    editable: true,
    flex: 1
  }, {
    field: 'Diagram',
    headerName: diagramTitle,
    editable: true,
    flex: 1,
    type: "singleSelect",
    valueOptions: parsed_diagrams_list.map((diagram) => diagram.label),
  }, {
    field: 'actions',
    headerName: actionTitle,
    flex: 1,
    type: "actions",
    renderCell: (params) => {
      return <>
        <Button
          onClick={() => delete_spare_part(params)}
          variant="outlined">{deleteTitle}</Button>
      </>;
    }
  }];

  const [rows, setRows] = useState([]);

  useEffect(() => {
    const row_parsed = parts?.reduce((parts_array, part) => {
      if (part.id) {
        parts_array.push({
          id: part.id,
          SerialNumber: part.SerialNumber,
          NameEnglish: part.NameEnglish,
          NameHebrew: part.NameHebrew,
          Price: part.Price,
          Count: part.Count,
          Diagram: parsed_diagrams_list.find(diagram => diagram.value === part.ProductPartsDiagramId)?.label
        });
      }
      return parts_array;
    }, []) || [];
    setRows(row_parsed);
  }, [parts, parsed_diagrams_list]);

  const add_part = useCallback((event, part_form) => {
    event.preventDefault();
    AddSparePartAction(product_id, category_id, selected_diagram, part_form, product_type);
  }, [selected_diagram, category_id, product_id, AddSparePartAction, product_type]);

  const delete_spare_part = useCallback((params) => {
    const diagram_id = parsed_diagrams_list.find(diagram => diagram.label === params.row.Diagram).value;
    DeleteSparePartAction(product_id, category_id, diagram_id, params.id, product_type);
  }, [product_id, category_id, DeleteSparePartAction, parsed_diagrams_list, product_type]);

  const edit_cell = useCallback((params, event) => {
    const row = rows.find(row => row.id === params.id);
    const diagram_id = parsed_diagrams_list.find(diagram => diagram.label === row.Diagram).value;
    PatchSparePartAction(params.id, product_id, category_id, diagram_id, params.field, params.value, product_type);
  }, [PatchSparePartAction, product_id, category_id, rows, parsed_diagrams_list, product_type]);

  return (<>
    <div className='flex flex-col justify-center items-center'>
      <div>
        {form_controller.length !== 0 && <Form
          inputs={SparePartsForms.add_part}
          controller={form_controller}
          className='flex flex-row flex-wrap w-2/4 mx-auto gap-2 justify-center mb-4'
          action={add_part} />}
      </div>
      <div className='w-[75vw] h-screen'>
        <DataGrid
          components={{ Toolbar: GridToolbar }}
          rows={rows}
          columns={columns}
          onCellEditCommit={edit_cell}></DataGrid>
      </div>
    </div>
  </>);
};


const mapStateToProps = (state, ownProps) => {
  return { ...ownProps };
};

const mapActionsToProps = (dispatch) => {
  return bindActionCreators({
    AddSparePartAction,
    DeleteSparePartAction,
    PatchSparePartAction
  }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(SparePartsEditor);