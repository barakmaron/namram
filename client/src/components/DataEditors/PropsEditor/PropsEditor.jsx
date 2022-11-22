import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';

function PropsEditor({
    props,
    product_id,
    category_id,
    PatchProductPropsAction,
    NewProductPropAction,
    DeletePropAction,
    product_type
}) {
    const [rows, setRows] = useState([]);

    const on_change_call = useCallback((params) => {
        PatchProductPropsAction(params.id, category_id, product_id, params.field, params.value, product_type);
    }, [PatchProductPropsAction, category_id, product_id, product_type]);

    const new_call = useCallback(() => {
        NewProductPropAction(category_id, product_id, product_type);
    }, [NewProductPropAction, product_id, category_id, product_type]);
    
    const delete_call = useCallback((params) => {
        DeletePropAction(category_id, product_id, params.id, product_type);
    }, [DeletePropAction, category_id, product_id, product_type]);

    const columns = [{ 
        field: 'id', 
        headerName: 'ID'
    }, {
        field: 'PropName',
        headerName: 'שם התכונה',
        editable: true,
        flex: 1
    }, {
        field: 'Value',
        headerName: 'ערך',
        editable: true,
        flex: 1
    }, {
        field: 'actions',
        headerName: 'פעולות',
        flex: 1,
        type: "actions",
        renderCell: (params) => {
            return <Button 
            onClick={() => delete_call(params)}
            variant="outlined">
                <FaTrash></FaTrash>
            </Button>;
        }
    }];

    useEffect(() => {
        const parsed_rows = props.map((prop) => {
            return {
                id: prop.id,
                PropName: prop.PropName,
                Value: prop.Value
            }
        });
        setRows(parsed_rows);
    }, [props]);

  return (<>
    <Box className="h-screen mt-5 w-full min-w-[33vw] flex ">
        <Button 
        className='mx-auto w-fit'
        onClick={new_call} 
        variant="outlined">
            <FaPlus></FaPlus>
        </Button>
        <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        onCellEditCommit={on_change_call}></DataGrid>
</Box>
  </>);
}

export default PropsEditor