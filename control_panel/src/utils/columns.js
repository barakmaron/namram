import { Button } from "@mui/material";
import {
    Address,
    Category, CompanyName, Cost, Count, Customer, DayPrice, Diagram, Display, EndDate, FaxNumber, FullName, HomePhoneNumber, HourClock, IdNumber, LastServiceDate, LocationTitle, ModelName, MonthPrice, Name, NameEnglish, NameHebrew, PhoneNumber, Price, Problem, Product, ProductName, PropName, Scheduled, SerialNumber, StartDate, Update, Value, WeekPrice, actionTitle,
    addPartsToRepairActions,
    addRentToolsSelectorActions, addressTitle, agreementsTitle, amountInInventoryTitle, category, categoryTitle,
    clientNameTitle, closeRentalAgreementTitle, closeTitle, companyNameTitle, costTitle, customersActions, deleteClientTitle, deleteRentalAgreementTitle,
    deleteTitle,
    descriptionTitle, diagramEditorTableActions, diagramTitle, diagramsTitle, displayToolOnSite,
    doneDateTitle,
    editDescriptionTitle,
    faxNumberTitle,
    fromDateTitle, fullNameTitle, hourClockTitle, idNumberTitle, imagesTitle, locationTitle, markAsDoneTitle, modelTitle, nameInEnglishTitle, nameInHebrewTitle, partsTitle, phoneNumberTitle, pricePerDayTitle, pricePerMonthTitle, pricePerWeekTitle, priceTitle, printTitle,
    problemTitle,
    productNameTitle, propNameTitle, propsEditorActions, propsTitle,
    removeThisProductTitle,
    rentToolsTableActions, rentalAgreementOpenTitle, rentalAgreementTitle,
    rentalAgreementsActions, repairServiceReportActions, scheduledServiceActions, serviceBookTitle, serviceTitle,
    showTitle,
    sparePartsActions,
    toolNameTitle,
    toolsTitle, untilDateTitle, updateTitle, valueTitle, whenToServiceTitle
} from "../strings";
import moment from "moment";
import { FaCheck, FaShekelSign, FaTimes, FaTrash } from "react-icons/fa";

export const COLUMNS = {
    [SerialNumber]: (title = rentalAgreementTitle) => ({
        field: SerialNumber,
        headerName: title,
        flex: 1
    }),
    [StartDate]: {
        field: StartDate,
        headerName: fromDateTitle,
        renderCell: (params) => moment(params.value).format("DD/MM/YYYY")
    },
    [EndDate]: {
        field: EndDate,
        headerName: untilDateTitle,
        renderCell: (params) => params.value ? moment(params.value).format("DD/MM/YYYY") : rentalAgreementOpenTitle
    },
    [Customer]: (customers, openCustomerData) => ({
        field: Customer,
        headerName: clientNameTitle,
        flex: 1,
        renderCell: (params) => {
            const customer = customers?.find(customer => customer.id === params.value);
            return <Button
                onClick={() => openCustomerData(customer)}
                variant="outlined">{customer?.FullName}</Button>
        }
    }),
    [LocationTitle]: {
        field: LocationTitle,
        headerName: locationTitle,
        flex: 1
    },
    [Category]: (parsedCategories) => ({
        field: Category,
        headerName: categoryTitle,
        editable: true,
        flex: 1,
        type: "singleSelect",
        valueOptions: parsedCategories.map((category) => category.label)
    }),
    [Name]: (title = productNameTitle) => ({
        field: Name,
        headerName: title,
        editable: true,
        flex: 1
    }),
    [category]: {
        field: category,
        headerName: categoryTitle
    },
    [Product]: (parsedProducts) => ({
        field: Product,
        headerName: productNameTitle,
        editable: true,
        flex: 1,
        type: "singleSelect",
        valueOptions: parsedProducts.map((product) => product.label)
    }),
    [Price]: {
        field: Price,
        headerName: priceTitle,
        flex: 1,
        renderCell: (params) => {
            return <span className='text-forest-green-600 font-bold flex justify-end items-center gap-2 w-full'>{params.value}<FaShekelSign /></span>;
        },
        editable: true
    },
    [Display]: {
        field: Display,
        headerName: displayToolOnSite,
        editable: true,
        type: "singleSelect",
        valueOptions: ['true', 'false'],
        renderCell: ({ value }) => value && value !== 'false' ? <FaCheck className="text-forest-green-600" /> : <FaTimes className="text-rose-600" />
    },
    [HourClock]: {
        field: HourClock,
        headerName: hourClockTitle,
        editable: true
    },
    [DayPrice]: {
        field: DayPrice,
        headerName: pricePerDayTitle,
        editable: true,
        renderCell: (params) => {
            return <span className='text-forest-green-600 font-bold flex justify-end items-center gap-2 w-full'>{params.value}<FaShekelSign /></span>;
        }
    },
    [WeekPrice]: {
        field: WeekPrice,
        headerName: pricePerWeekTitle,
        editable: true,
        renderCell: (params) => {
            return <span className='text-forest-green-600 font-bold flex justify-end items-center gap-2 w-full'>{params.value}<FaShekelSign /></span>;
        }
    },
    [MonthPrice]: {
        field: MonthPrice,
        headerName: pricePerMonthTitle,
        editable: true,
        renderCell: (params) => {
            return <span className='text-forest-green-600 font-bold flex justify-end items-center gap-2 w-full'>{params.value}<FaShekelSign /></span>;
        }
    },
    [PropName]: {
        field: PropName,
        headerName: propNameTitle,
        editable: true,
        flex: 1
    },
    [Value]: {
        field: Value,
        headerName: valueTitle,
        editable: true,
        flex: 1
    },
    [ModelName]: {
        field: ModelName,
        headerName: modelTitle,
        editable: true,
        flex: 1
    },
    [NameHebrew]: {
        field: NameHebrew,
        headerName: nameInHebrewTitle,
        editable: true,
        flex: 1
    },
    [NameEnglish]: {
        field: NameEnglish,
        headerName: nameInEnglishTitle,
        editable: true,
        flex: 1
    },
    [Count]: {
        field: Count,
        headerName: amountInInventoryTitle,
        editable: true,
        flex: 1
    },
    [Diagram]: (parsedDiagramsList) => ({
        field: Diagram,
        headerName: diagramTitle,
        editable: true,
        flex: 1,
        type: "singleSelect",
        valueOptions: parsedDiagramsList.map((diagram) => diagram.label),
    }),
    [Scheduled]: {
        field: Scheduled,
        headerName: whenToServiceTitle,
        editable: true
    },
    [LastServiceDate]: {
        field: LastServiceDate,
        headerName: doneDateTitle
    },
    [FullName]: {
        field: FullName,
        headerName: fullNameTitle,
        editable: true
    },
    [CompanyName]: {
        field: CompanyName,
        headerName: companyNameTitle,
        flex: 1,
        editable: true
    },
    [PhoneNumber]: {
        field: PhoneNumber,
        headerName: phoneNumberTitle,
        editable: true,
        renderCell: (params) => {
            return <a href={`tel:${params.value}`} className='text-forest-green-500 font-bold'>{params.value}</a>;
        }
    },
    [IdNumber]: {
        field: IdNumber,
        headerName: idNumberTitle,
        editable: true
    },
    [Address]: {
        field: Address,
        headerName: addressTitle,
        flex: 1,
        editable: true
    },
    [HomePhoneNumber]: {
        field: HomePhoneNumber,
        headerName: phoneNumberTitle,
        editable: true,
        renderCell: (params) => {
            return <a href={`tel:${params.value}`} className='text-forest-green-500 font-bold'>{params.value}</a>;
        }
    },
    [FaxNumber]: {
        field: FaxNumber,
        headerName: faxNumberTitle,
        editable: true
    },
    [Problem]: {
        field: Problem,
        headerName: problemTitle,
        flex: 1,
        editable: true
    },
    [Update]: {
        field: Update,
        headerName: updateTitle,
        editable: true
    },
    [Cost]: {
        field: Cost,
        headerName: costTitle,
        renderCell: (params) => {
            return <span className='text-forest-green-600 font-bold flex justify-end items-center gap-2 w-full'>{params.value}<FaShekelSign /></span>;
        }
    },
    [ProductName]: {
        field: ProductName,
        headerName: toolNameTitle,
        flex: 1
    }
};

export const ACTIONS_COLUMNS = {
    [rentalAgreementsActions]: (openToolsListCallback, getPdfAgreement, closeAgreementCallback, deleteAgreement) => ({
        field: rentalAgreementsActions,
        headerName: actionTitle,
        flex: 1,
        type: "actions",
        renderCell: (params) => {
            return <div className='flex gap-2 justify-center w-full'>
                <Button
                    onClick={() => openToolsListCallback(params)}
                    variant="outlined">{toolsTitle}</Button>
                <Button
                    onClick={() => getPdfAgreement(params)}
                    variant="outlined">{printTitle}</Button>
                {!params.row.EndDate && <Button
                    onClick={() => closeAgreementCallback(params)}
                    variant="outlined">{closeRentalAgreementTitle}</Button>}
                {!params.row.EndDate && <Button
                    onClick={() => deleteAgreement(params)}
                    variant="outlined">{deleteRentalAgreementTitle}</Button>}
            </div>;
        }
    }),
    [addRentToolsSelectorActions]: (deleteCell) => ({
        field: addRentToolsSelectorActions,
        headerName: actionTitle,
        flex: 1,
        renderCell: (params) => {
            return <Button
                onClick={() => deleteCell(params)}
                variant="outlined">
                <FaTrash></FaTrash>
            </Button>;
        }
    }),
    [rentToolsTableActions]: (isSale, editImagesClick, editPropsClick, editTextClick, editDiagramClick, editSparePartsClick, getPdfServiceBook, editScheduledServiceClick) => ({
        field: rentToolsTableActions,
        headerName: actionTitle,
        flex: 1,
        type: "actions",
        renderCell: (params) => {
            return <div className='flex gap-2 justify-center w-full'>
                <Button
                    onClick={() => editImagesClick(params)}
                    variant="outlined">{imagesTitle}</Button>
                <Button
                    onClick={() => editPropsClick(params)}
                    variant="outlined">{propsTitle}</Button>
                <Button
                    onClick={() => editTextClick(params)}
                    variant="outlined" >{descriptionTitle}</Button>
                <Button
                    onClick={() => editDiagramClick(params)}
                    variant="outlined">{diagramsTitle}</Button>
                <Button
                    onClick={() => editSparePartsClick(params)}
                    variant="outlined">{partsTitle}</Button>
                {!isSale && <>
                    <Button
                        onClick={() => getPdfServiceBook(params)}
                        variant="outlined">{serviceBookTitle}</Button>
                    <Button
                        onClick={() => editScheduledServiceClick(params)}
                        variant="outlined">{serviceTitle}</Button>
                </>}
            </div>;
        }
    }),
    [propsEditorActions]: (deleteCell) => ({
        field: propsEditorActions,
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
    }),
    [diagramEditorTableActions]: (GetImageUrl, removeDiagramFormProduct, deleteDiagram) => ({
        field: diagramEditorTableActions,
        headerName: actionTitle,
        flex: 1,
        type: "actions",
        renderCell: (params) => {
            return < div className='flex gap-2'>
                <Button
                    onClick={() => {
                        window.open(GetImageUrl(params.row.Image));
                    }}
                    variant="outlined">{showTitle}</Button>
                <Button
                    onClick={() => {
                        removeDiagramFormProduct(params.id);
                    }}
                    variant="outlined">{removeThisProductTitle}</Button>
                <Button
                    onClick={() => {
                        deleteDiagram(params.id);
                    }}
                    variant="outlined">{deleteTitle}</Button>
            </div>;
        }
    }),
    [sparePartsActions]: (deleteSparePart) => ({
        field: sparePartsActions,
        headerName: actionTitle,
        flex: 1,
        type: "actions",
        renderCell: (params) => {
            return <>
                <Button
                    onClick={() => deleteSparePart(params)}
                    variant="outlined">{deleteTitle}</Button>
            </>;
        }
    }),
    [scheduledServiceActions]: (deleteService, openTextEdit, setServiceDone) => ({
        field: scheduledServiceActions,
        headerName: actionTitle,
        flex: 1,
        type: "actions",
        renderCell: (params) => {
            return <div className='flex gap-2 justify-center w-full'>
                <Button
                    onClick={() => deleteService(params)}
                    variant="outlined">{deleteTitle}</Button>
                <Button
                    onClick={() => openTextEdit(params)}
                    variant="outlined">{editDescriptionTitle}</Button>
                <Button
                    onClick={() => setServiceDone(params)}
                    variant="outlined">{markAsDoneTitle}</Button>
            </div>;
        }
    }),
    [customersActions]: (openPrintCallback, openRentalAgreementsCallback, deleteCustomer) => ({
        field: customersActions,
        headerName: actionTitle,
        flex: 1,
        type: "actions",
        renderCell: (params) => {
            return <div className='flex gap-2 justify-center w-full flex-wrap'>
                <Button
                    onClick={() => openPrintCallback(params)}
                    variant="outlined">{printTitle}</Button>
                <Button
                    onClick={() => openRentalAgreementsCallback(params)}
                    variant="outlined">{agreementsTitle}</Button>
                <Button
                    onClick={() => deleteCustomer(params)}
                    variant="outlined">{deleteClientTitle}</Button>
            </div>;
        }
    }),
    [repairServiceReportActions]: (getPdfServiceReport, openChangedParts, getPdfServiceBook, editCell) => ({
        field: repairServiceReportActions,
        headerName: actionTitle,
        flex: 1,
        type: "actions",
        renderCell: (params) => {
            return <div className='flex gap-2 justify-center w-full'>
                <Button
                    onClick={() => getPdfServiceReport(params)}
                    variant="outlined">{printTitle}</Button>
                <Button
                    onClick={() => openChangedParts(params)}
                    variant="outlined">{partsTitle}</Button>
                <Button
                    onClick={() => getPdfServiceBook(params)}
                    variant="outlined">{serviceBookTitle}</Button>
                <Button
                    onClick={() => editCell({
                        id: params.id,
                        field: "EndDate",
                        value: moment().toString()
                    })}
                    variant="outlined">{closeTitle}</Button>
            </div>;
        }
    }),
    [addPartsToRepairActions]: (deleteChangedPart) => ({
        field: addPartsToRepairActions,
        headerName: actionTitle,
        flex: 1,
        type: "actions",
        renderCell: (params) => {
            return <>
                <Button
                    onClick={() => deleteChangedPart(params)}
                    variant="outlined">{deleteTitle}</Button>
            </>;
        }
    })
}