import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'
import { useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { GetImageUrl } from '../../../services/ApiService';
import FormConnector from '../../Form/FormConnector';
import DiagramForms from './FormsConstants';

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
    const [selected_diagram, setSelectedDiagram] = useState({});
    const [form_controller, setFormController] = useState([]);

    const columns = [{ 
        field: 'id', 
        headerName: 'ID'
    }, {
        field: 'ModelName',
        headerName: 'מודל',
        editable: true,
        flex: 1
    }, {
        field: 'actions',
        headerName: 'פעולות',
        flex: 1,
        type: "actions",
        renderCell: (params) => {
            return < div className='flex gap-2'>
                <Button 
                onClick={() => {
                    window.open(GetImageUrl(params.row.Image));
                }}            
                variant="outlined">הצג</Button>
                <Button      
                onClick={() => {
                    remove_diagram_form_product(params.id);
                }}       
                variant="outlined">הסר ממוצר זה</Button>
                <Button      
                onClick={() => {
                    delete_diagram(params.id);
                }}       
                variant="outlined">מחק</Button>
            </div>;
        }
    }];

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
            if(diagram.id){
                diagrams_array.push({
                    id: diagram.ProductPartsDiagram.id,
                    ModelName: diagram.ProductPartsDiagram.ModelName,
                    Image: diagram.ProductPartsDiagram.Image
                });
            }
            return diagrams_array
        }, []) || [];
        setRows(row_parsed);
    }, [product_diagrams]);

    const add_diagram = useCallback((event, diagram, temp_image_url) => {
        event.preventDefault();
        AddDiagramAction(product_id, category_id, diagram, temp_image_url, product_type);
    }, [product_id, category_id, AddDiagramAction, product_type]);

    const add_diagram_from_list = useCallback((event) => {
        event.preventDefault();
        const diagram = diagrams.find(diagram => diagram.id === selected_diagram.value);
        AddDiagramFromListAction(product_id, category_id, diagram, product_type);
    }, [product_id, category_id, product_type, selected_diagram, diagrams, AddDiagramFromListAction]);

    const delete_diagram = useCallback((diagram_id) => {
        DeleteDiagramAction(product_id, category_id, diagram_id, product_type);
    }, [category_id, product_id, DeleteDiagramAction, product_type]);

    const remove_diagram_form_product = useCallback((diagram_id) => {
        DeleteDiagramFromProductAction(product_id, category_id, diagram_id, product_type);
    },  [category_id, product_id, DeleteDiagramFromProductAction, product_type]);

    const edit_cell = useCallback((params) => {
        PatchDiagramAction(params.id, params.value, product_id, category_id, product_type);
    }, [PatchDiagramAction, product_id, category_id, product_type]);

  return (<>  
  <div className="w-[50vw] h-screen mt-5 flex flex-col">
    <div className='flex gap-4 justify-center'>
        <fieldset className='border-2 border-forest-green-500 px-4 py-4 w-fit'>
            <legend className='text-forest-900 px-4 text-2xl'>הוסף דיאגרמה חדשה</legend>
            <FormConnector 
            inputs={DiagramForms.add_diagram}  
            action={add_diagram} />
        </fieldset>
        <fieldset className='border-2 border-forest-green-500 px-4 py-4 w-fit'>
            <legend className='text-forest-900 px-4 text-2xl'>חבר דיאגרמה</legend>
            { form_controller.length !== 0 && <FormConnector 
            controller={form_controller}
            inputs={DiagramForms.connect_diagram}  
            action={add_diagram_from_list} />}
        </fieldset>
    </div>
    <DataGrid
    rows={rows}
    columns={columns}
    pageSize={10}
    rowsPerPageOptions={[10]}
    onCellEditCommit={edit_cell}></DataGrid>
</div>
    </>);
};

export default DiagramEditor;