import { Button } from "@mui/material";
import {
    Category, Customer, DayPrice, Display, EndDate, HourClock, LocationTitle, ModelName, MonthPrice, Name, Price, Product, PropName, SerialNumber, StartDate, Value, WeekPrice, actionTitle,
    addRentToolsSelectorActions, category, categoryTitle,
    clientNameTitle, closeRentalAgreementTitle, deleteRentalAgreementTitle,
    deleteTitle,
    descriptionTitle, diagramEditorTableActions, diagramsTitle, displayToolOnSite,
    fromDateTitle, hourClockTitle, imagesTitle, locationTitle, modelTitle, partsTitle, pricePerDayTitle, pricePerMonthTitle, pricePerWeekTitle, priceTitle, printTitle,
    productNameTitle, propNameTitle, propsEditorActions, propsTitle,
    removeThisProductTitle,
    rentToolsTableActions, rentalAgreementOpenTitle, rentalAgreementTitle,
    rentalAgreementsActions, serviceBookTitle, serviceTitle,
    showTitle,
    toolsTitle, untilDateTitle, valueTitle
} from "../strings";
import moment from "moment";
import { FaCheck, FaShekelSign, FaTimes, FaTrash } from "react-icons/fa";

export const COLUMNS = {
    [SerialNumber]: {
        field: SerialNumber,
        headerName: rentalAgreementTitle,
        flex: 1
    },
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
    [Name]: {
        field: Name,
        headerName: productNameTitle,
        editable: true,
        flex: 1
    },
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
        }
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
    })
}