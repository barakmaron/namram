
import React, { useEffect, useState, useCallback } from 'react';

import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

import { FaPlus, FaTrash } from 'react-icons/fa';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';

import { PatchProductPropsAction, NewProductPropAction, DeletePropAction } from "../../redux/actions/ProductsActions/propsActions";
import { actionTitle, propNameTitle, valueTitle } from '../../strings';


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

    const onChangeCell = useCallback((params) => {
        PatchProductPropsAction(params.id, category_id, product_id, params.field, params.value, product_type);
    }, [PatchProductPropsAction, category_id, product_id, product_type]);

    const newCell = useCallback(() => {
        NewProductPropAction(category_id, product_id, product_type);
    }, [NewProductPropAction, product_id, category_id, product_type]);

    const deleteCell = useCallback((params) => {
        DeletePropAction(category_id, product_id, params.id, product_type);
    }, [DeletePropAction, category_id, product_id, product_type]);

    const columns = [{
        field: 'id',
        headerName: 'ID'
    }, {
        field: 'PropName',
        headerName: propNameTitle,
        editable: true,
        flex: 1
    }, {
        field: 'Value',
        headerName: valueTitle,
        editable: true,
        flex: 1
    }, {
        field: 'actions',
        headerName: actionTitle,
        flex: 1,
        type: "actions",
        renderCell: (params) => {
            return <Button
                onClick={() => deleteCell(params)}
                variant="outlined">
                <FaTrash></FaTrash>
            </Button>;
        }
    }];

    useEffect(() => {
        const parsedRows = props.map((prop) => {
            return {
                id: prop.id,
                PropName: prop.PropName,
                Value: prop.Value
            }
        });
        setRows(parsedRows);
    }, [props]);

    return (<>
        <Box className="h-screen mt-5 w-full min-w-[33vw] flex ">
            <Button
                className='mx-auto w-fit'
                onClick={newCell}
                variant="outlined">
                <FaPlus></FaPlus>
            </Button>
            <DataGrid
                rows={rows}
                columns={columns}
                onCellEditCommit={onChangeCell}></DataGrid>
        </Box>
    </>);
}

const mapStateToProps = (state, ownProps) => {
    return { ...ownProps };
};

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        PatchProductPropsAction,
        NewProductPropAction,
        DeletePropAction
    }, dispatch);
};

export default connect(mapStateToProps, mapActionToProps)(PropsEditor);