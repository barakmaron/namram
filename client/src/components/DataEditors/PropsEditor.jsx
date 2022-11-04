import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';

function PropsEditor({
    props,
    onChange,
    new_action,
    delete_action
}) {
    const [rows, setRows] = useState([]);

    const on_change_call = useCallback((params, event) => {
        onChange(params.id, params.field, params.value);
    }, [onChange]);

    const new_call = useCallback(() => {}, []);
    
    const delete_call = useCallback(() => {}, []);

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
        renderCell: (params) => {
            return <Button variant="outlined"><FaTrash></FaTrash></Button>;
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
    <Box className="h-screen mt-5 w-96">
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