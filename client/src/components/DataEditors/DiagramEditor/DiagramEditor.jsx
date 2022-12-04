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
    product_id,
    category_id,
    AddDiagramAction,
    DeleteDiagramAction,
    PatchDiagramAction,
    product_type
}) => {
    
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
            return <>
                <Button 
                onClick={() => {
                    window.open(GetImageUrl(params.row.Image));
                }}            
                variant="outlined">הצג</Button>
                <Button      
                onClick={() => {
                    delete_diagram(params.id);
                }}       
                variant="outlined">מחק</Button>
            </>;
        }
    }];

    const [rows, setRows] = useState([]);

    useEffect(() => {
        const row_parsed = diagrams?.map((diagram) => {
            if(diagram.id){
                return {
                    id: diagram.id,
                    ModelName: diagram.ModelName,
                    Image: diagram.Image
                };
            }
        }) || [];
        const filter_add_only_redux = row_parsed.filter(row => row !== undefined);
        setRows(filter_add_only_redux);
    }, [diagrams]);

    const add_diagram = useCallback((event, diagram, temp_image_url) => {
        event.preventDefault();
        AddDiagramAction(product_id, category_id, diagram, temp_image_url, product_type);
    }, [product_id, category_id, AddDiagramAction, product_type]);

    const delete_diagram = useCallback((diagram_id) => {
        DeleteDiagramAction(product_id, category_id, diagram_id, product_type);
    }, [category_id, product_id, DeleteDiagramAction, product_type]);

    const edit_cell = useCallback((params) => {
        PatchDiagramAction(params.id, params.value, product_id, category_id, product_type);
    }, [PatchDiagramAction, product_id, category_id, product_type]);

  return (<>  
  <div className="w-[50vw] h-screen mt-5 flex flex-col">
    <div className='w-96 mx-auto'>
        <FormConnector 
        inputs={DiagramForms.add_diagram}  
        action={add_diagram} />
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