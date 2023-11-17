
import React, { useState, useMemo, useCallback, useEffect } from 'react';

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { FaPlus } from 'react-icons/fa';

import { GetRentOnlyAvailableAction } from "../../redux/actions/RentActions/RentActions";
import { getCategories } from "../../redux/selectors/categoriesSelector";
import { Category, Price, Product, addRentToolsSelectorActions } from '../../strings';
import { ACTIONS_COLUMNS, COLUMNS } from '../../utils/columns';

const RentToolsSelector = ({
    setData,
    categories,
    GetRentOnlyAvailableAction
}) => {

    const [rows, setRows] = useState([]);
    const [parsedCategories, setParsedCategories] = useState([]);
    const [parsedProducts, setParsedProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [allProducts, setAllProducts] = useState([]);

    const defaultCategory = useMemo(() => ({
        value: -1,
        label: "Chose Category"
    }), []);

    const defaultProduct = useMemo(() => ({
        value: -1,
        label: "Chose Product"
    }), []);

    useEffect(() => {
        GetRentOnlyAvailableAction();
    }, [GetRentOnlyAvailableAction]);

    useEffect(() => {
        const tempParsedCategories = categories.map(category => ({
            label: category.Name,
            value: category.id
        }))
        setParsedCategories([defaultCategory, ...tempParsedCategories]);
        setAllProducts(() => categories?.flatMap(category => category?.RentProducts?.map(product => ({
            label: `${product.Product.Name} | מס ${product.Product.SerialNumber} | ${product.Identifier}`,
            value: product.id
        }))));
    }, [categories, defaultCategory]);

    useEffect(() => {
        const temp_products = selectedCategory ? selectedCategory.RentProducts.map(product => ({
            label: `${product.Product.Name} | מס ${product.Product.SerialNumber} | ${product.Identifier}`,
            value: product.id,
            Price: product.DayPrice
        })) : [];
        setParsedProducts([defaultProduct, ...temp_products]);
    }, [selectedCategory, defaultProduct]);

    const deleteCell = useCallback((params) => {
        setRows(row => {
            const filter_data = row.filter(row => row.id !== params.id);
            return filter_data;
        });
    }, [setRows]);

    const columns = [
        COLUMNS[Category](parsedCategories),
        COLUMNS[Product](parsedProducts),
        COLUMNS[Price],
        ACTIONS_COLUMNS[addRentToolsSelectorActions](deleteCell)
    ];

    useEffect(() => {
        setData(() => rows.map(row => ({
            id: row.id,
            [Category]: parsedCategories.find(category => category.label === row.Category)?.value || null,
            [Product]: allProducts.find(product => product.label === row.Product)?.value || null,
            [Price]: allProducts.find(product => product.label === row.Product)?.Price || null
        })))
    }, [rows, setData, parsedCategories, allProducts]);

    const newCell = useCallback(() => {
        setRows(rows => [...rows, {
            id: rows.length,
            Category: "Chose Category",
            Product: "Chose Product"
        }]);
    }, [setRows]);

    const editCell = useCallback((params) => {
        setRows(rows => {
            const findRow = rows.find(row => row.id === params.id);
            const filter_rows = rows.filter(row => row.id !== params.id);
            if (params.field === "Category") {
                const findCategory = parsedCategories.find(category => category.label === params.value);
                const getCategoryFromList = categories.find(category => category.id === findCategory.value);
                setSelectedCategory(getCategoryFromList);
                const category = parsedCategories.find(category => category.label === params.value);
                findRow.Category = category.label;
            }
            else {
                const product = parsedProducts.find(product => product.label === params.value);
                findRow.Product = product.label;
                findRow.Price = product.Price;
            }
            return [...filter_rows, findRow];
        })
    }, [setRows, parsedCategories, categories, setSelectedCategory, parsedProducts]);

    return (<>
        <Box className="h-96 mt-5 w-full min-w-[33vw] flex ">
            <Button
                className='mx-auto w-fit'
                onClick={newCell}
                variant="outlined">
                <FaPlus></FaPlus>
            </Button>
            <DataGrid
                rows={rows}
                columns={columns}
                onCellEditCommit={editCell}></DataGrid>
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