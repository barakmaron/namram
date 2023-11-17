
import React, { useCallback, useState, useEffect } from 'react';

import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

import { Box } from '@mui/system';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import { CloseRentalAgreementAction, DeleteRentalAgreementAction } from '../../redux/actions/RentActions/RentalAgreementsActions';
import AgreementRentalToolsList from '../DataDisplay/AgreementRentalToolsList';
import CustomerData from '../DataDisplay/CustomerData';
import Modal from '../Modal/Modal';
import RentalAgreementsForms from '../../pages/RentalPage/FormsConstants';
import Form from '../Form/Form';
import { Customer, EndDate, LocationTitle, SerialNumber, StartDate, rentalAgreementsActions } from '../../strings';
import { ACTIONS_COLUMNS, COLUMNS } from '../../utils/columns';

const RentalAgreementsTable = ({
    customers,
    agreements,
    CloseRentalAgreementAction,
    DeleteRentalAgreementAction,
    filter_fields
}) => {
    const [closeAgreement, setCloseAgreement] = useState(false);
    const [openToolsList, setOpenToolsList] = useState(false);
    const [toolsListProps, setToolsListProps] = useState([]);
    const [selectedAgreement, setSelectedAgreement] = useState({});
    const [selectedCustomer, setSelectedCustomer] = useState({});
    const [showCustomer, setShowCustomer] = useState(false);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const parsedRows = (agreements && agreements.reduce((accumulatedAgreements, agreement) => {
            if (agreement.id) {
                accumulatedAgreements.push({
                    id: agreement.id,
                    SerialNumber: agreement.SerialNumber,
                    StartDate: agreement.StartDate,
                    EndDate: agreement.EndDate,
                    Customer: agreement.CustomerId,
                    Location: agreement.Location,
                    ToolsList: agreement.RentalAgreementLists.map(list => list.RentProduct)
                });
            }
            return accumulatedAgreements;
        }, [])) || [];
        setRows(parsedRows);
    }, [agreements]);


    const deleteAgreement = useCallback((params) => {
        DeleteRentalAgreementAction(params.id);
    }, [DeleteRentalAgreementAction]);


    const closeAgreementCallback = useCallback((params) => {
        const agreement = agreements.find(agreement => agreement.id === params.id);
        setSelectedAgreement(agreement);
        setCloseAgreement(true)
    }, [agreements]);

    const openToolsListCallback = useCallback((params) => {
        setToolsListProps({
            agreement_number: params.row.SerialNumber,
            tools: params.row.ToolsList
        });
        setOpenToolsList(true);
    }, []);

    const openCustomerData = useCallback((customer) => {
        setSelectedCustomer(customer);
        setShowCustomer(true);
    }, []);

    const getPdfAgreement = useCallback((params) => {
        window.open(`${process.env.REACT_APP_API_BASE_URL}/rental_agreements/${params.id}?pdf=true`);
    }, []);

    const closeAgreementFormSubmit = useCallback((event, form) => {
        event.preventDefault();
        CloseRentalAgreementAction(selectedAgreement.id, form);
    }, [CloseRentalAgreementAction, selectedAgreement]);

    const temp_columns = [
        COLUMNS[SerialNumber],
        COLUMNS[StartDate],
        COLUMNS[EndDate],
        COLUMNS[Customer](customers, openCustomerData),
        COLUMNS[LocationTitle],
        ACTIONS_COLUMNS[rentalAgreementsActions](openToolsListCallback, getPdfAgreement, closeAgreementCallback, deleteAgreement)
    ];

    const columns = temp_columns.filter(column => !filter_fields.find(field => field === column.field));

    return (<>
        <Box sx={{ width: '100%' }} className="h-screen mt-5">
            <DataGrid
                components={{ Toolbar: GridToolbar }}
                rows={rows}
                columns={columns}></DataGrid>
        </Box>
        {openToolsList && <Modal setClose={() => setOpenToolsList(false)}>
            <AgreementRentalToolsList
                {...toolsListProps}
            />
        </Modal>}
        {showCustomer && <Modal setClose={() => setShowCustomer(false)}>
            <CustomerData
                customer={selectedCustomer}
            />
        </Modal>}
        {closeAgreement && <Modal setClose={() => setCloseAgreement(false)}>
            <Form
                className={`w-3/4 mx-auto flex gap-5 flex-wrap justify-center`}
                inputs={RentalAgreementsForms.closeRentalAgreement}
                action={closeAgreementFormSubmit} />
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
        CloseRentalAgreementAction,
        DeleteRentalAgreementAction
    }, dispatch);
};

export default connect(mapStateToProps, mapActionToProps)(RentalAgreementsTable);