import { Button, Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { FaShekelSign } from 'react-icons/fa';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import Modal from '../../../components/Modal/Modal';
import PropsEditorConnector from '../../../components/DataEditors/PropsEditor/PropsEditorConnector';
import ImageEditorConnector from '../../../components/DataEditors/ImageEditor/ImageEditorConnector';
import TextEditorConnector from '../../../components/DataEditors/TextEditor/TextEditorConnector';
import DiagramEditorConnector from '../../../components/DataEditors/DiagramEditor/DiagramEditorConnector';
import SparePartsEditorConnector from '../../../components/DataEditors/SparePartsEditor/SparePartsEditorConnector';
import Constants from '../../../Constants';

const ProductsTable = ({
    categories,
    products,
    PatchProductAction,
    type
}) => {
    const [selected_product, setSelectedProduct] = useState(undefined);
    const [edit_props, setEditProps] = useState(false);
    const [edit_images, setEditImages] = useState(false);
    const [edit_text, setEditText] = useState(false);
    const [edit_diagram, setEditDiagram] = useState(false);
    const [edit_spare_parts, setSpareParts] = useState(false);
    const [selected_product_parts, setSelectedProductParts] = useState([]);

    const is_sale = Constants.PRODUCT_TYPE.SaleProducts.toLowerCase().includes(type);

    const product_type_columns = is_sale ? [{
        field: 'Price',
        headerName: 'מחיר',
        editable: true,
        renderCell: (params) => {
            return <span className='text-forest-green-600 font-bold flex justify-end items-center gap-2 w-full'>{params.value}<FaShekelSign/></span>;
        }
    }] : [{
        field: 'Display',
        headerName: 'הצגת כלי באתר',
        editable: true,
        type: "singleSelect",
        valueOptions: ['true', 'false']
    }, {
        field: 'HourClock',
        headerName: 'שעון שעות',
        editable: true        
    }, {
        field: 'DayPrice',
        headerName: 'מחיר ליום',
        editable: true,
        renderCell: (params) => {
            return <span className='text-forest-green-600 font-bold flex justify-end items-center gap-2 w-full'>{params.value}<FaShekelSign/></span>;
        }
    }, {
        field: 'WeekPrice',
        headerName: 'מחיר לשבוע',
        editable: true,
        renderCell: (params) => {
            return <span className='text-forest-green-600 font-bold flex justify-end items-center gap-2 w-full'>{params.value}<FaShekelSign/></span>;
        }
    }, {
        field: 'MonthPrice',
        headerName: 'מחיר לחודש',
        editable: true,
        renderCell: (params) => {
            return <span className='text-forest-green-600 font-bold flex justify-end items-center gap-2 w-full'>{params.value}<FaShekelSign/></span>;
        }
    }];

    const columns = [{ 
            field: 'id', 
            headerName: 'ID'
        }, {
            field: 'Name',
            headerName: 'שם המוצר',
            editable: true,
        }, {
            field: 'category',
            headerName: 'קטגוריה'
        }, {
            field: 'SerialNumber',
            headerName: 'מספר סידורי',
            editable: true
        },
        ...product_type_columns,
        {
            field: 'actions',
            headerName: 'פעולות',
            flex: 1,
            type: "actions",
            renderCell: (params) => {
                return <div className='flex gap-2 justify-center w-full'>                    
                    <Button 
                    onClick={() => edit_images_click(params)}
                    variant="outlined">תמונות</Button>
                    <Button 
                    onClick={() => edit_props_click(params)}
                    variant="outlined">תכונות</Button>
                    <Button 
                    onClick={() => edit_text_click(params)}
                    variant="outlined" >תיאור</Button>
                    <Button 
                    onClick={() => edit_diagram_click(params)}
                    variant="outlined">דיאגרמות</Button>
                    <Button 
                    onClick={() => edit_spare_parts_click(params)}
                    variant="outlined">חלקים</Button>
                    { !is_sale && <Button 
                    onClick={() => get_pdf_service_book(params)}
                    variant="outlined">ספר תחזוקה</Button>}
                </div>;
            }
        }];

    const [rows, setRows] = useState([]);

    useEffect(() => {
        const row_parsed = products ? products.map((product) => {
            if(product.id){
                const category = categories.find(category => category.id === product.CategoryId);
                if(category) {
                    const { Product } = product;
                    const extra_rent_data = is_sale ? { Price: product.Price } : {
                        DayPrice: product.DayPrice,
                        WeekPrice: product.WeekPrice,
                        MonthPrice: product.MonthPrice,
                        Display: product.Display,
                        HourClock: product.HourClock
                    }
                    return {
                        id: Product.id,
                        Name: Product.Name,
                        category: category.Name,
                        SerialNumber: Product.SerialNumber,
                        ...extra_rent_data
                    };
                }
            }
        }) : [];
        const filter_add_only_redux = row_parsed.filter(row => row !== undefined);
        setRows(filter_add_only_redux);
    }, [categories, products, is_sale]);

    const edit_cell = useCallback((params) => {
        const category_name = rows.find(row => row.id === params.id).category;
        const category = categories.find(category => category.Name === category_name);
        PatchProductAction(params.id, category.id, params.field, params.value, type);
    }, [PatchProductAction, categories, rows, type]);

    useEffect(() => {
        if(selected_product !== undefined) {
            const product = products.find(product => product.id === selected_product.id)
            const parts = product.Product.ProductPartsDiagrams?.flatMap((diagram) => diagram.SpareParts?.map((part) => part) || []);
            setSelectedProductParts(parts);
        }
    }, [selected_product, products, categories]);

    const select_product = useCallback((product_id) => {
        const product = products.find(product => product.ProductId === product_id);
        setSelectedProduct(product);
        const parts = product.Product.ProductPartsDiagrams?.flatMap((diagram) => diagram.SpareParts?.map((part) => part ) || []);
        setSelectedProductParts(parts);
    }, [products]);
    
    const edit_props_click = useCallback((params) => {
        select_product(params.id);
        setEditProps(true);
    }, [select_product]);

    const edit_images_click = useCallback((params) => {
        select_product(params.id);
        setEditImages(true);
    }, [select_product]);
    
    const edit_text_click = useCallback((params) => {
        select_product(params.id);
        setEditText(true);
    }, [select_product]);

    const edit_diagram_click = useCallback((params) => {
        select_product(params.id);
        setEditDiagram(true);
    }, [select_product]);

    const edit_spare_parts_click = useCallback((params) => {
        select_product(params.id);
        setSpareParts(true);
    }, [select_product]);

    const get_pdf_service_book = useCallback((params) => {
        window.open(`${process.env.REACT_APP_API_BASE_URL}/service_reports/product/${params.id}`); 
    }, []);

    return <>
    <Box sx={{width: '100%' }} className="h-screen mt-5">
        <DataGrid
        components={{ Toolbar: GridToolbar }}
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        onCellEditCommit={edit_cell}></DataGrid>
    </Box>
    {edit_props && <Modal setClose={() => setEditProps(false)}>
        <PropsEditorConnector 
        props={selected_product.Product.ProductProps}
        category_id={selected_product.CategoryId}
        product_id={selected_product.Product.id}
        product_type={type}/>
    </Modal>}
    {edit_images && <Modal setClose={() => setEditImages(false)}>
        <ImageEditorConnector 
        images={selected_product.Product.ProductsImages}
        category_id={selected_product.CategoryId}
        product_id={selected_product.Product.id}
        product_type={type}/>
    </Modal>}
    {edit_text && <Modal setClose={() => setEditText(false)}>
        <TextEditorConnector 
        text={selected_product.Product.Text}
        category_id={selected_product.CategoryId}
        product_id={selected_product.Product.id}
        product_type={type}/>
    </Modal>}
    {edit_diagram && <Modal setClose={() => setEditDiagram(false)}>
        <DiagramEditorConnector 
        diagrams={selected_product.Product.ProductPartsDiagrams}
        category_id={selected_product.CategoryId}
        product_id={selected_product.Product.id}
        product_type={type}/>
    </Modal>}
    {edit_spare_parts && <Modal setClose={() => setSpareParts(false)}>
        <SparePartsEditorConnector 
        parts={selected_product_parts}
        diagrams={selected_product.Product.ProductPartsDiagrams}
        category_id={selected_product.CategoryId}
        product_id={selected_product.Product.id}
        product_type={type}/>
    </Modal>}
    </>;
};

export default ProductsTable;