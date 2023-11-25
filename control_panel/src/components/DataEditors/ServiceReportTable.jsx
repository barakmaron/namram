
import React, { useCallback, useEffect, useState } from 'react';

import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

import { Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import { PatchServiceReportAction } from "../../redux/actions/ServiceActions/ServiceActions";
import Constants from '../../Constants';
import Modal from '../Modal/Modal';
import PartsChancedEditor from './PartsChancedEditor/PartsChancedEditor';
import { Cost, Problem, ProductName, SerialNumber, Update, partsTitle, repairServiceReportActions, serialNumberTitle } from '../../strings';
import { ACTIONS_COLUMNS, COLUMNS } from '../../utils/columns';

const ServiceReportTable = ({
    service_reports,
    PatchServiceReportAction
}) => {

    const [rows, setRows] = useState([]);
    const [openChangedPartsList, setOpenChangedPartsList] = useState(false);
    const [selectedServiceReport, setSelectedServiceReport] = useState({});

    useEffect(() => {
        const parsedRows = (service_reports && service_reports.reduce((accumulatedReports, report) => {
            if (report.id) {
                accumulatedReports.push({
                    id: report.id,
                    ProductId: report.RentProduct.ProductId,
                    ProductName: report.RentProduct.Product.Name,
                    SerialNumber: report.RentProduct.Product.SerialNumber,
                    Problem: report.Problem.replace(Constants.html_remove_regex, ""),
                    Update: report.Update,
                    Cost: report.PartsChangeds.reduce((accumulator, part) => accumulator + Number.parseInt(part.SparePart.Price), 0) || 0
                });
            }
            return accumulatedReports;
        }, [])) || [];
        setRows(parsedRows);
    }, [service_reports]);

    const getPdfServiceReport = useCallback((params) => {
        window.open(`${process.env.REACT_APP_API_BASE_URL}/service_reports/${params.id}?pdf=true`);
    }, []);

    const getPdfServiceBook = useCallback((params) => {
        window.open(`${process.env.REACT_APP_API_BASE_URL}/service_reports/product/${params.row.ProductId}`);
    }, []);

    const openChangedParts = useCallback((params) => {
        const service_report = service_reports.find(report => report.id === params.id);
        setSelectedServiceReport(service_report);
        setOpenChangedPartsList(true);
    }, [service_reports]);

    const editCell = useCallback((params) => {
        PatchServiceReportAction(params.id, params.field, params.value);
    }, [PatchServiceReportAction]);

    const columns = [
        COLUMNS[ProductName],
        COLUMNS[SerialNumber](serialNumberTitle),
        COLUMNS[Problem],
        COLUMNS[Update],
        COLUMNS[Cost],
        ACTIONS_COLUMNS[repairServiceReportActions](getPdfServiceReport, openChangedParts, getPdfServiceBook, editCell)
    ];

    return (<>
        <Box sx={{ width: '100%' }} className="h-screen mt-5">
            <DataGrid
                components={{ Toolbar: GridToolbar }}
                rows={rows}
                columns={columns}
                onCellEditCommit={editCell}></DataGrid>
        </Box>
        {openChangedPartsList && <Modal header={partsTitle} setClose={() => setOpenChangedPartsList(false)}>
            <PartsChancedEditor
                service_report_id={selectedServiceReport.id}
            />
        </Modal>}
    </>)
}


const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps
    };
};

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        PatchServiceReportAction
    }, dispatch);
};

export default connect(mapStateToProps, mapActionToProps)(ServiceReportTable);