import React, { useEffect, useCallback, useState } from 'react';

import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

import { DataGrid } from '@mui/x-data-grid';

import { AddDiagramAction, AddDiagramFromListAction, DeleteDiagramAction, DeleteDiagramFromProductAction, PatchDiagramAction, GetDiagramsAction } from "../../../redux/actions/ProductsActions/diagramActions";
import { getDiagrams } from "../../../redux/selectors/categoriesSelector";

import { GetImageUrl } from '../../../services/ApiService';
import Form from '../../Form/Form';
import DiagramForms from './FormsConstants';
import {
    ModelName, addNewDiagramTitle, connectDiagramTitle,
    diagramEditorTableActions,
} from '../../../strings';
import { ACTIONS_COLUMNS, COLUMNS } from '../../../utils/columns';

const DiagramEditor = ({
    diagrams,
    product_diagrams,
    product_id,
    category_id,
    AddDiagramAction,
    AddDiagramFromListAction,
    DeleteDiagramAction,
    DeleteDiagramFromProductAction,
    PatchDiagramAction,
    GetDiagramsAction,
    product_type
}) => {
    const [rows, setRows] = useState([]);
    const [selectedDiagram, setSelectedDiagram] = useState({});
    const [formController, setFormController] = useState([]);

    useEffect(() => {
        GetDiagramsAction();
    }, [GetDiagramsAction]);

    useEffect(() => {
        const temp_controller = [{
            list: diagrams.map(diagram => ({
                label: diagram.ModelName,
                value: diagram.id
            })),
            onChange: (selected) => {
                setSelectedDiagram(selected);
            }
        }];
        setFormController(temp_controller);
    }, [diagrams]);

    useEffect(() => {
        const row_parsed = product_diagrams?.reduce((diagrams_array, diagram) => {
            if (diagram.id) {
                diagrams_array.push({
                    id: diagram.ProductPartsDiagram.id,
                    [ModelName]: diagram.ProductPartsDiagram.ModelName,
                    Image: diagram.ProductPartsDiagram.Image
                });
            }
            return diagrams_array
        }, []) || [];
        setRows(row_parsed);
    }, [product_diagrams]);

    const addDiagram = useCallback((event, diagram, temp_image_url) => {
        event.preventDefault();
        AddDiagramAction(product_id, category_id, diagram, temp_image_url, product_type);
    }, [product_id, category_id, AddDiagramAction, product_type]);

    const addDiagramFromList = useCallback((event) => {
        event.preventDefault();
        const diagram = diagrams.find(diagram => diagram.id === selectedDiagram.value);
        AddDiagramFromListAction(product_id, category_id, diagram, product_type);
    }, [product_id, category_id, product_type, selectedDiagram, diagrams, AddDiagramFromListAction]);

    const deleteDiagram = useCallback((diagram_id) => {
        DeleteDiagramAction(product_id, category_id, diagram_id, product_type);
    }, [category_id, product_id, DeleteDiagramAction, product_type]);

    const removeDiagramFormProduct = useCallback((diagram_id) => {
        DeleteDiagramFromProductAction(product_id, category_id, diagram_id, product_type);
    }, [category_id, product_id, DeleteDiagramFromProductAction, product_type]);

    const editCell = useCallback((params) => {
        PatchDiagramAction(params.id, params.value, product_id, category_id, product_type);
    }, [PatchDiagramAction, product_id, category_id, product_type]);

    const columns = [
        COLUMNS[ModelName],
        ACTIONS_COLUMNS[diagramEditorTableActions](GetImageUrl, removeDiagramFormProduct, deleteDiagram)
    ];


    return (<>
        <div className="w-[50vw] h-screen mt-5 flex flex-col">
            <div className='flex gap-4 justify-center'>
                <fieldset className='border-2 border-forest-green-500 px-4 py-4 w-fit'>
                    <legend className='text-forest-900 px-4 text-2xl'>{addNewDiagramTitle}</legend>
                    <Form
                        inputs={DiagramForms.add_diagram}
                        action={addDiagram} />
                </fieldset>
                <fieldset className='border-2 border-forest-green-500 px-4 py-4 w-fit'>
                    <legend className='text-forest-900 px-4 text-2xl'>{connectDiagramTitle}</legend>
                    {formController.length !== 0 && <Form
                        controller={formController}
                        inputs={DiagramForms.connect_diagram}
                        action={addDiagramFromList} />}
                </fieldset>
            </div>
            <DataGrid
                rows={rows}
                columns={columns}
                onCellEditCommit={editCell}></DataGrid>
        </div>
    </>);
};


const mapStateToProps = (state, ownProps) => {
    const diagrams = getDiagrams(state);
    return {
        ...ownProps,
        diagrams
    };
};

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        AddDiagramAction,
        AddDiagramFromListAction,
        DeleteDiagramAction,
        DeleteDiagramFromProductAction,
        PatchDiagramAction,
        GetDiagramsAction
    }, dispatch);
};

export default connect(mapStateToProps, mapActionToProps)(DiagramEditor);