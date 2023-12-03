import React, { useState, useCallback, useEffect } from 'react';

import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import { AddChangedPartAction, DeleteChangedPartAction } from "../../../redux/actions/ServiceActions/ServiceChangedPartActions";
import { getServiceReports } from "../../../redux/selectors/serviceSelector";

import Form from '../../Form/Form';
import ChangedPartForms from './FormConstants';
import { Diagram, NameEnglish, NameHebrew, addPartsToRepairActions, Price, SerialNumber, serialNumberTitle } from '../../../strings';
import { COLUMNS, ACTIONS_COLUMNS } from '../../../utils/columns';

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

    useEffect(() => {
        const row_parsed = parts?.reduce((parts_array, part) => {
            if (part.id) {
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

    const deleteChangedPart = useCallback((params) => {
        DeleteChangedPartAction(service_report_id, params.row.SparePartId);
    }, [DeleteChangedPartAction, service_report_id]);

    const columns = [
        COLUMNS[SerialNumber](serialNumberTitle),
        COLUMNS[NameEnglish],
        COLUMNS[NameHebrew],
        COLUMNS[Price],
        COLUMNS[Diagram](parsed_diagrams),
        ACTIONS_COLUMNS[addPartsToRepairActions](deleteChangedPart)
    ];

    return (<>
        <div>
            {change_part_form_controller.length && <Form
                inputs={ChangedPartForms.add_changed_part}
                controller={change_part_form_controller}
                action={add_part} />}
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