import { Button, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { FaShekelSign } from 'react-icons/fa';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import Modal from '../../../../components/Modal/Modal';
import PropsEditor from '../../../../components/DataEditors/PropsEditor';

const SaleProductsTable = ({
    categories,
    sale_products,
    PatchProductAction,
    PatchProductPropsAction
}) => {
    const [selected_product, setSelectedProduct] = useState({})
    const [edit_props, setEditProps] = useState(false);

    const columns = [{ 
            field: 'id', 
            headerName: 'ID'
        }, {
            field: 'Name',
            headerName: 'שם המוצר',
            editable: true,
            flex: 1
        }, {
            field: 'category',
            headerName: 'קטגוריה',
            flex: 1
        }, {
            field: 'SerialNumber',
            headerName: 'מספר סידורי',
            editable: true,
            flex: 1
        }, {
            field: 'images',
            headerName: 'תמונות',
            flex: 1,
            renderCell: (params) => {
                return <Button variant="outlined">החלף</Button>;
            }
        },  {
            field: 'props',
            headerName: 'תכונות',
            flex: 1,
            renderCell: (params) => {
                return <Button 
                onClick={() => edit_props_click(params)}
                variant="outlined">נהל</Button>;
            }
        }, {
            field: 'text',
            headerName: 'תיאור',
            flex: 1,
            renderCell: (params) => {
                return <Button 
                variant="outlined" >ערוך</Button>;
            }
        }, {
            field: 'Price',
            headerName: 'מחיר',
            editable: true,
            flex: 1,
            renderCell: (params) => {
                return <span className='text-forest-green-600 font-bold flex justify-end items-center gap-2 w-full'>{params.value}<FaShekelSign/></span>;
            }
        }, {
            field: 'diagrams',
            headerName: 'דיגרמות',
            flex: 1,
            renderCell: (params) => {
                return <Button variant="outlined">הוסף</Button>;
            }
        }, {
            field: 'spare_parts',
            headerName: 'חלקי חילוף',
            flex: 1,
            renderCell: (params) => {
                return <Button variant="outlined">הצג רשימה</Button>;
            }
        }];

    const [rows, setRows] = useState([]);

    useEffect(() => {
        const row_parsed = sale_products.map((product, index) => {
            if(product.id){
                const category = categories.find(category => category.id === product.SaleCategoryId);
                const { Product } = product;
                return {
                    id: Product.id,
                    Name: Product.Name,
                    category: category.Name,
                    SerialNumber: product.SerialNumber,
                    Price: product.Price
                };
            }
        });
        setRows(row_parsed);
    }, [categories, sale_products]);

    const edit_cell = useCallback((params, event) => {
        PatchProductAction(params.id, params.field, params.value);
    }, [PatchProductAction]);
    
    const edit_props_click = useCallback((params) => {
        const product = sale_products.find(product => product.ProductId === params.id);
        setSelectedProduct(product);
        setEditProps(true);
    }, [sale_products]);

    const edit_props_on_change = useCallback((id, prop_name, value) => {
        PatchProductPropsAction(id, prop_name, value);
    }, [PatchProductPropsAction]);

    return <>
    <Box sx={{width: '100%' }} className="h-screen mt-5">
        <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        onCellEditCommit={edit_cell}></DataGrid>
    </Box>
    {edit_props && <Modal setClose={() => setEditProps(false)}>
        <PropsEditor props={selected_product.Product.ProductProps} onChange={edit_props_on_change}/>
    </Modal>}
    </>;
};

export default SaleProductsTable;