
import React, { useCallback, useEffect, useState } from 'react';

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import { AddSparePartAction, DeleteSparePartAction, PatchSparePartAction } from "../../../redux/actions/ProductsActions/sparePartActions";

import SparePartsForms from './FormsConstants';
import Form from '../../Form/Form';
import { Count, Diagram, NameEnglish, NameHebrew, Price, SerialNumber, serialNumberTitle, sparePartsActions } from '../../../strings';
import { ACTIONS_COLUMNS, COLUMNS } from '../../../utils/columns';

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
  const [parsedDiagramsList, setParsedDiagramsList] = useState([]);

  useEffect(() => {
    setParsedDiagramsList(diagrams.map((diagram) => ({
      label: diagram.ProductPartsDiagram.ModelName,
      value: diagram.ProductPartsDiagram.id
    })));
  }, [diagrams]);

  useEffect(() => {
    const controller = [{
      list: parsedDiagramsList,
      onChange: (selected) => {
        const diagram = diagrams.find(diagram => diagram.ProductPartsDiagram.id === selected.value);
        setSelectedDiagram(diagram.ProductPartsDiagram.id);
      }
    }];

    setFormController(controller);
  }, [diagrams, parsedDiagramsList]);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    const parsedRows = parts?.reduce((accumulatedParts, part) => {
      if (part.id) {
        accumulatedParts.push({
          id: part.id,
          SerialNumber: part.SerialNumber,
          NameEnglish: part.NameEnglish,
          NameHebrew: part.NameHebrew,
          Price: part.Price,
          Count: part.Count,
          Diagram: parsedDiagramsList.find(diagram => diagram.value === part.ProductPartsDiagramId)?.label
        });
      }
      return accumulatedParts;
    }, []) || [];
    setRows(parsedRows);
  }, [parts, parsedDiagramsList]);

  const addPart = useCallback((event, part_form) => {
    event.preventDefault();
    AddSparePartAction(product_id, category_id, selected_diagram, part_form, product_type);
  }, [selected_diagram, category_id, product_id, AddSparePartAction, product_type]);

  const deleteSparePart = useCallback((params) => {
    const diagram_id = parsedDiagramsList.find(diagram => diagram.label === params.row.Diagram).value;
    DeleteSparePartAction(product_id, category_id, diagram_id, params.id, product_type);
  }, [product_id, category_id, DeleteSparePartAction, parsedDiagramsList, product_type]);

  const editCell = useCallback((params, event) => {
    const row = rows.find(row => row.id === params.id);
    const diagram_id = parsedDiagramsList.find(diagram => diagram.label === row.Diagram).value;
    PatchSparePartAction(params.id, product_id, category_id, diagram_id, params.field, params.value, product_type);
  }, [PatchSparePartAction, product_id, category_id, rows, parsedDiagramsList, product_type]);

  const columns = [
    COLUMNS[SerialNumber](serialNumberTitle),
    COLUMNS[NameEnglish],
    COLUMNS[NameHebrew],
    COLUMNS[Price],
    COLUMNS[Count],
    COLUMNS[Diagram](parsedDiagramsList),
    ACTIONS_COLUMNS[sparePartsActions](deleteSparePart),
  ];

  return (<>
    <div className='flex flex-col justify-center items-center'>
      <div>
        {form_controller.length !== 0 && <Form
          inputs={SparePartsForms.add_part}
          controller={form_controller}
          className='flex flex-row flex-wrap w-2/4 mx-auto gap-2 justify-center mb-4'
          action={addPart} />}
      </div>
      <div className='w-[75vw] h-screen'>
        <DataGrid
          components={{ Toolbar: GridToolbar }}
          rows={rows}
          columns={columns}
          onCellEditCommit={editCell}></DataGrid>
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