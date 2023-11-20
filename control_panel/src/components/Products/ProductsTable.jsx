
import React, { useState, useEffect, useCallback } from 'react';

import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

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
import { DayPrice, Display, HourClock, MonthPrice, Name, Price, SerialNumber, WeekPrice, category, rentToolsTableActions, serialNumberTitle, } from '../../strings';
import { ACTIONS_COLUMNS, COLUMNS } from '../../utils/columns';
import { Box } from '@mui/material';

const ProductsTable = ({
    categories,
    products,
    PatchProductAction,
    type,
}) => {
    const [selected_product, setSelectedProduct] = useState(undefined);
    const [editProps, setEditProps] = useState(false);
    const [editImages, setEditImages] = useState(false);
    const [editText, setEditText] = useState(false);
    const [editDiagram, setEditDiagram] = useState(false);
    const [editSpareParts, setSpareParts] = useState(false);
    const [editScheduledService, setScheduledService] = useState(false);
    const [selectedProductParts, setSelectedProductParts] = useState([]);
    const [rows, setRows] = useState([]);

    const isSale = Constants.PRODUCT_TYPE.SaleProducts.toLowerCase().includes(type);

    useEffect(() => {
        const parsedRow = (products && products.reduce((accumulatedProducts, product) => {
            if (product.id) {
                const category = categories.find(category => category.id === product.CategoryId);
                if (category) {
                    const { Product } = product;
                    const extra_rent_data = isSale ? { Price: product.Price } : {
                        DayPrice: product.DayPrice,
                        WeekPrice: product.WeekPrice,
                        MonthPrice: product.MonthPrice,
                        Display: product.Display,
                        HourClock: product.HourClock
                    }
                    accumulatedProducts.push({
                        id: Product.id,
                        Name: Product.Name,
                        category: category.Name,
                        SerialNumber: Product.SerialNumber,
                        ...extra_rent_data
                    });
                }
            }
            return accumulatedProducts;
        }, [])) || [];
        setRows(parsedRow);
    }, [categories, products, isSale]);

    const editCell = useCallback((params) => {
        const category_name = rows.find(row => row.id === params.id).category;
        const category = categories.find(category => category.Name === category_name);
        PatchProductAction(params.field, params.value, params.id, category.id, type);
    }, [PatchProductAction, categories, rows, type]);

    const selectSpareParts = useCallback((product) => {
        if (product !== undefined) {
            const parts = product.Product.ProductDiagramsLists?.flatMap((diagram) => diagram.ProductPartsDiagram.SpareParts?.map((part) => part));
            setSelectedProductParts(parts || []);
        }
    }, []);

    useEffect(() => {
        selectSpareParts(selected_product);
    }, [selected_product, selectSpareParts])

    const select_product = useCallback((product_id) => {
        const product = products.find(product => product.ProductId === product_id);
        setSelectedProduct(product);
        selectSpareParts(product);
    }, [products, selectSpareParts]);

    useEffect(() => {
        if (selected_product !== undefined)
            select_product(selected_product.ProductId);
    }, [products]);

    const editPropsClick = useCallback((params) => {
        select_product(params.id);
        setEditProps(true);
    }, [select_product]);

    const editImagesClick = useCallback((params) => {
        select_product(params.id);
        setEditImages(true);
    }, [select_product]);

    const editTextClick = useCallback((params) => {
        select_product(params.id);
        setEditText(true);
    }, [select_product]);

    const editDiagramClick = useCallback((params) => {
        select_product(params.id);
        setEditDiagram(true);
    }, [select_product]);

    const editSparePartsClick = useCallback((params) => {
        select_product(params.id);
        selectSpareParts(selected_product);
        setSpareParts(true);
    }, [select_product, selected_product, selectSpareParts]);

    const getPdfServiceBook = useCallback((params) => {
        window.open(`${process.env.REACT_APP_API_BASE_URL}/service_reports/product/${params.id}`);
    }, []);

    const editScheduledServiceClick = useCallback((params) => {
        select_product(params.id);
        setScheduledService(true);
    }, [select_product]);

    const product_type_columns = isSale ? [
        COLUMNS[Price]
    ] : [
        COLUMNS[Display],
        COLUMNS[HourClock],
        COLUMNS[DayPrice],
        COLUMNS[WeekPrice],
        COLUMNS[MonthPrice]
    ];

    const columns = [
        COLUMNS[Name](),
        COLUMNS[category],
        COLUMNS[SerialNumber](serialNumberTitle),
        ...product_type_columns,
        ACTIONS_COLUMNS[rentToolsTableActions](isSale, editImagesClick, editPropsClick, editTextClick, editDiagramClick, editSparePartsClick, getPdfServiceBook, editScheduledServiceClick)
    ];

    return <>
        <Box sx={{ width: '100%' }} className="h-screen mt-5">
            <DataGrid
                components={{ Toolbar: GridToolbar }}
                rows={rows}
                columns={columns}
                onCellEditCommit={editCell}></DataGrid>
        </Box>
        {editProps && <Modal setClose={() => setEditProps(false)}>
            <PropsEditor
                props={selected_product.Product.ProductProps}
                category_id={selected_product.CategoryId}
                product_id={selected_product.Product.id}
                product_type={type} />
        </Modal>}
        {editImages && <Modal setClose={() => setEditImages(false)}>
            <ImageEditor
                images={selected_product.Product.ProductsImages}
                meta_data={{
                    category_id: selected_product.CategoryId,
                    product_id: selected_product.Product.id,
                    product_type: type
                }}
            />
        </Modal>}
        {editText && <Modal setClose={() => setEditText(false)}>
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
        {editDiagram && <Modal setClose={() => setEditDiagram(false)}>
            <DiagramEditor
                product_diagrams={selected_product.Product.ProductDiagramsLists}
                category_id={selected_product.CategoryId}
                product_id={selected_product.Product.id}
                product_type={type} />
        </Modal>}
        {editSpareParts && <Modal setClose={() => setSpareParts(false)}>
            <SparePartsEditor
                parts={selectedProductParts}
                diagrams={selected_product.Product.ProductDiagramsLists}
                category_id={selected_product.CategoryId}
                product_id={selected_product.Product.id}
                product_type={type} />
        </Modal>}
        {editScheduledService && <Modal setClose={() => setScheduledService(false)}>
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