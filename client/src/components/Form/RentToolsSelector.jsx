
import React, { useState, useMemo, useCallback, useEffect } from 'react';

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { FaPlus, FaTrash } from 'react-icons/fa';

import { GetRentOnlyAvailableAction } from "../../redux/actions/RentActions/RentActions";
import { getCategories } from "../../redux/selectors/categoriesSelector";

const RentToolsSelector = ({
    setData,
    categories,
    GetRentOnlyAvailableAction
}) => {

    const [rows, setRows] = useState([]);
    const [parsed_categories, setParsedCategories] = useState([]);
    const [parsed_products, setParsedProducts] = useState([]);
    const [selected_category, setSelectedCategory] = useState(null);
    const [all_products, setAllProducts] = useState([]);

    const default_category = useMemo(() => ({
        value: -1,
        label: "Chose Category"
    }), []);

    const default_product = useMemo(() => ({
        value: -1,
        label: "Chose Product"
    }), []);

    useEffect(() => {
        GetRentOnlyAvailableAction();
    }, [GetRentOnlyAvailableAction]);

    useEffect(() => {
        const temp_parsed_categories = categories.map(category => ({
            label: category.Name,
            value: category.id
        }))
        setParsedCategories([default_category, ...temp_parsed_categories]);
        setAllProducts(() => categories?.flatMap(category => category?.RentProducts?.map(product => ({
            label: `${product.Product.Name} | מס ${product.Product.SerialNumber} | ${product.Identifier}`,
            value: product.id
        }))));
    }, [categories, default_category]);

    useEffect(() => {
        const temp_products = selected_category ? selected_category.RentProducts.map(product => ({
            label: `${product.Product.Name} | מס ${product.Product.SerialNumber} | ${product.Identifier}`,
            value: product.id,
            Price: product.DayPrice
        })) : [];
        setParsedProducts([default_product, ...temp_products]);
    }, [selected_category, default_product]);

    const delete_cell = useCallback((params) => {
        setRows(row => {
            const filter_data = row.filter(row => row.id !== params.id);
            return filter_data;
        });
    }, [setRows]);

    const columns = [{
        field: 'id',
        headerName: 'ID'
    }, {
        field: 'Category',
        headerName: 'קטגוריה',
        editable: true,
        flex: 1,
        type: "singleSelect",
        valueOptions: parsed_categories.map((category) => category.label)
    }, {
        field: 'Product',
        headerName: 'שם מוצר',
        editable: true,
        flex: 1,
        type: "singleSelect",
        valueOptions: parsed_products.map((product) => product.label)
    }, {
        field: "Price",
        headerName: "מחיר",
        flex: 1
    }, {
        field: 'actions',
        headerName: 'פעולות',
        flex: 1,
        renderCell: (params) => {
            return <Button
                onClick={() => delete_cell(params)}
                variant="outlined">
                <FaTrash></FaTrash>
            </Button>;
        }
    }];

    useEffect(() => {
        setData(() => rows.map(row => ({
            id: row.id,
            category: parsed_categories.find(category => category.label === row.Category)?.value || null,
            product: all_products.find(product => product.label === row.Product)?.value || null,
            price: all_products.find(product => product.label === row.Product)?.Price || null
        })))
    }, [rows, setData, parsed_categories, all_products]);

    const new_cell = useCallback(() => {
        setRows(rows => [...rows, {
            id: rows.length,
            Category: "Chose Category",
            Product: "Chose Product"
        }]);
    }, [setRows]);

    const edit_cell = useCallback((params) => {
        setRows(rows => {
            const find_row = rows.find(row => row.id === params.id);
            const filter_rows = rows.filter(row => row.id !== params.id);
            if (params.field === "Category") {
                const find_category = parsed_categories.find(category => category.label === params.value);
                const get_category_from_list = categories.find(category => category.id === find_category.value);
                setSelectedCategory(get_category_from_list);
                const category = parsed_categories.find(category => category.label === params.value);
                find_row.Category = category.label;
            }
            else {
                const product = parsed_products.find(product => product.label === params.value);
                find_row.Product = product.label;
                find_row.Price = product.Price;
            }
            return [...filter_rows, find_row];
        })
    }, [setRows, parsed_categories, categories, setSelectedCategory, parsed_products]);

    return (<>
        <Box className="h-96 mt-5 w-full min-w-[33vw] flex ">
            <Button
                className='mx-auto w-fit'
                onClick={new_cell}
                variant="outlined">
                <FaPlus></FaPlus>
            </Button>
            <DataGrid
                rows={rows}
                columns={columns}
                onCellEditCommit={edit_cell}></DataGrid>
        </Box>
    </>);
};

const mapStateToProps = (state, ownProps) => {
    const categories = getCategories(state);
    return { ...ownProps, categories };
};

const mapActionsToProps = (dispatch) => {
    return bindActionCreators({
        GetRentOnlyAvailableAction
    }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(RentToolsSelector);