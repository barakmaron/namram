
import React, { useState, useEffect, useCallback } from 'react';

import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { Button, Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { FaShekelSign } from 'react-icons/fa';

import { getCategories } from "../../redux/selectors/categoriesSelector";
import { PatchProductAction } from "../../redux/actions/ProductsActions/ProductsActions";
import Modal from '../Modal/Modal';
import PropsEditor from '../DataEditors/PropsEditor';
import ImageEditor from '../DataEditors/ImageEditor/ImageEditor';
import TextEditor from '../DataEditors/TextEditor';
import DiagramEditor from '../DataEditors/DiagramEditor/DiagramEditor';
import SparePartsEditor from '../DataEditors/SparePartsEditor/SparePartsEditor';
import Constants from '../../Constants';
import ScheduledServiceEditor from '../DataEditors/ScheduledServiceEditor/ScheduledServiceEditor';
import { actionTitle, categoryTitle, descriptionTitle, diagramsTitle, imagesTitle, partsTitle, priceTitle, productNameTitle, propsTitle, serialNumberTitle, serviceBookTitle, serviceTitle } from '../../strings';

const ProductsTable = ({
    categories,
    products,
    PatchProductAction,
    type,
}) => {
    const [selected_product, setSelectedProduct] = useState(undefined);
    const [edit_props, setEditProps] = useState(false);
    const [edit_images, setEditImages] = useState(false);
    const [edit_text, setEditText] = useState(false);
    const [edit_diagram, setEditDiagram] = useState(false);
    const [edit_spare_parts, setSpareParts] = useState(false);
    const [edit_scheduled_service, setScheduledService] = useState(false);
    const [selected_product_parts, setSelectedProductParts] = useState([]);
    const [rows, setRows] = useState([]);

    const is_sale = Constants.PRODUCT_TYPE.SaleProducts.toLowerCase().includes(type);

    const product_type_columns = is_sale ? [{
        field: 'Price',
        headerName: priceTitle,
        editable: true,
        renderCell: (params) => {
            return <span className='text-forest-green-600 font-bold flex justify-end items-center gap-2 w-full'>{params.value}<FaShekelSign /></span>;
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
            return <span className='text-forest-green-600 font-bold flex justify-end items-center gap-2 w-full'>{params.value}<FaShekelSign /></span>;
        }
    }, {
        field: 'WeekPrice',
        headerName: 'מחיר לשבוע',
        editable: true,
        renderCell: (params) => {
            return <span className='text-forest-green-600 font-bold flex justify-end items-center gap-2 w-full'>{params.value}<FaShekelSign /></span>;
        }
    }, {
        field: 'MonthPrice',
        headerName: 'מחיר לחודש',
        editable: true,
        renderCell: (params) => {
            return <span className='text-forest-green-600 font-bold flex justify-end items-center gap-2 w-full'>{params.value}<FaShekelSign /></span>;
        }
    }];

    const columns = [{
        field: 'id',
        headerName: 'ID'
    }, {
        field: 'Name',
        headerName: productNameTitle,
        editable: true,
        flex: 1
    }, {
        field: 'category',
        headerName: categoryTitle
    }, {
        field: 'SerialNumber',
        headerName: serialNumberTitle,
        editable: true
    },
    ...product_type_columns,
    {
        field: 'actions',
        headerName: actionTitle,
        flex: 1,
        type: "actions",
        renderCell: (params) => {
            return <div className='flex gap-2 justify-center w-full'>
                <Button
                    onClick={() => edit_images_click(params)}
                    variant="outlined">{imagesTitle}</Button>
                <Button
                    onClick={() => edit_props_click(params)}
                    variant="outlined">{propsTitle}</Button>
                <Button
                    onClick={() => edit_text_click(params)}
                    variant="outlined" >{descriptionTitle}</Button>
                <Button
                    onClick={() => edit_diagram_click(params)}
                    variant="outlined">{diagramsTitle}</Button>
                <Button
                    onClick={() => edit_spare_parts_click(params)}
                    variant="outlined">{partsTitle}</Button>
                {!is_sale && <>
                    <Button
                        onClick={() => get_pdf_service_book(params)}
                        variant="outlined">{serviceBookTitle}</Button>
                    <Button
                        onClick={() => edit_scheduled_service_click(params)}
                        variant="outlined">{serviceTitle}</Button>
                </>}
            </div>;
        }
    }];


    useEffect(() => {
        const row_parsed = (products && products.reduce((products_array, product) => {
            if (product.id) {
                const category = categories.find(category => category.id === product.CategoryId);
                if (category) {
                    const { Product } = product;
                    const extra_rent_data = is_sale ? { Price: product.Price } : {
                        DayPrice: product.DayPrice,
                        WeekPrice: product.WeekPrice,
                        MonthPrice: product.MonthPrice,
                        Display: product.Display,
                        HourClock: product.HourClock
                    }
                    products_array.push({
                        id: Product.id,
                        Name: Product.Name,
                        category: category.Name,
                        SerialNumber: Product.SerialNumber,
                        ...extra_rent_data
                    });
                }
            }
            return products_array;
        }, [])) || [];
        setRows(row_parsed);
    }, [categories, products, is_sale]);

    const edit_cell = useCallback((params) => {
        const category_name = rows.find(row => row.id === params.id).category;
        const category = categories.find(category => category.Name === category_name);
        PatchProductAction(params.field, params.value, params.id, category.id, type);
    }, [PatchProductAction, categories, rows, type]);

    const select_spare_parts = useCallback((product) => {
        if (product !== undefined) {
            const parts = product.Product.ProductDiagramsLists?.flatMap((diagram) => diagram.ProductPartsDiagram.SpareParts?.map((part) => part));
            setSelectedProductParts(parts || []);
        }
    }, []);

    useEffect(() => {
        select_spare_parts(selected_product);
    }, [selected_product, select_spare_parts])

    const select_product = useCallback((product_id) => {
        const product = products.find(product => product.ProductId === product_id);
        setSelectedProduct(product);
        select_spare_parts(product);
    }, [products, select_spare_parts]);

    useEffect(() => {
        if (selected_product !== undefined)
            select_product(selected_product.ProductId);
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
        select_spare_parts(selected_product);
        setSpareParts(true);
    }, [select_product, selected_product, select_spare_parts]);

    const get_pdf_service_book = useCallback((params) => {
        window.open(`${process.env.REACT_APP_API_BASE_URL}/service_reports/product/${params.id}`);
    }, []);

    const edit_scheduled_service_click = useCallback((params) => {
        select_product(params.id);
        setScheduledService(true);
    }, [select_product]);

    return <>
        <Box sx={{ width: '100%' }} className="h-screen mt-5">
            <DataGrid
                components={{ Toolbar: GridToolbar }}
                rows={rows}
                columns={columns}
                onCellEditCommit={edit_cell}></DataGrid>
        </Box>
        {edit_props && <Modal setClose={() => setEditProps(false)}>
            <PropsEditor
                props={selected_product.Product.ProductProps}
                category_id={selected_product.CategoryId}
                product_id={selected_product.Product.id}
                product_type={type} />
        </Modal>}
        {edit_images && <Modal setClose={() => setEditImages(false)}>
            <ImageEditor
                images={selected_product.Product.ProductsImages}
                meta_data={{
                    category_id: selected_product.CategoryId,
                    product_id: selected_product.Product.id,
                    product_type: type
                }}
            />
        </Modal>}
        {edit_text && <Modal setClose={() => setEditText(false)}>
            <TextEditor
                text={selected_product.Product.Text}
                Action={PatchProductAction}
                meta_data={{
                    product_id: selected_product.Product.id,
                    category_id: selected_product.CategoryId,
                    product_type: type
                }}
            />
        </Modal>}
        {edit_diagram && <Modal setClose={() => setEditDiagram(false)}>
            <DiagramEditor
                product_diagrams={selected_product.Product.ProductDiagramsLists}
                category_id={selected_product.CategoryId}
                product_id={selected_product.Product.id}
                product_type={type} />
        </Modal>}
        {edit_spare_parts && <Modal setClose={() => setSpareParts(false)}>
            <SparePartsEditor
                parts={selected_product_parts}
                diagrams={selected_product.Product.ProductDiagramsLists}
                category_id={selected_product.CategoryId}
                product_id={selected_product.Product.id}
                product_type={type} />
        </Modal>}
        {edit_scheduled_service && <Modal setClose={() => setScheduledService(false)}>
            <ScheduledServiceEditor
                services={selected_product.ScheduledServices}
                product_id={selected_product.id}
                category_id={selected_product.CategoryId} />
        </Modal>}
    </>;
};

const mapStateToProps = (state, ownProps) => {
    const categories = getCategories(state);
    return { ...ownProps, categories };
};

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        PatchProductAction
    }, dispatch);
};

export default connect(mapStateToProps, mapActionToProps)(ProductsTable);