import CustomerService from "./CustomerService.js";
import ImageService from "./ImageService.js";
import PdfService from "./PdfServices/index.js";
import RentAgreementsDb from "./storage/RentAgreements.js";
import moment from 'moment';
import Constants from "../Constants.js";

async function GetAllAgreements(close, customer) {
    let ret = close && await RentAgreementsDb.GetAllCloseAgreements();
    ret = customer ? await RentAgreementsDb.GetAllAgreementsByCustomer(customer) : await RentAgreementsDb.GetAllOpenAgreements();
    return ret;
}

async function AddAgreement(tools, location, fuel_amount, fuel_price, transport_amount, transport_price, start_signature, customer) {
    const customer_from_db = await CustomerService.AddCustomer(customer);
    const signature = await ImageService.ResizeAndStoreImage(start_signature.path, start_signature.filename);
    return await RentAgreementsDb.AddAgreement(tools, location, fuel_amount, fuel_price, transport_amount, transport_price, signature, customer_from_db.id);
}

async function AddAgreementOldCustomer(tools, location, fuel_amount, fuel_price, transport_amount, transport_price, start_signature, customer_id) {
    const signature = await ImageService.ResizeAndStoreImage(start_signature.path, start_signature.filename);
    return await RentAgreementsDb.AddAgreement(tools, location, fuel_amount, fuel_price, transport_amount, transport_price, signature, customer_id);
}

async function CloseAgreement(id, fuel_amount, fuel_price, transport_amount, transport_price, end_signature) {
    const signature = await ImageService.ResizeAndStoreImage(end_signature.path, end_signature.filename);
    return await RentAgreementsDb.CloseAgreement(id, fuel_amount, fuel_price, transport_amount, transport_price, signature);
}

async function DeleteAgreement(id) {
    return await RentAgreementsDb.DeleteAgreement(id);
}

async function GetAgreement(id) {
    return await RentAgreementsDb.GetRentalAgreementById(id);
}

async function SearchAgreements(SerialNumber, StartDate, EndDate) {
    if(SerialNumber)
        return [await RentAgreementsDb.GetAgreementBySerialNumber(SerialNumber)];
    else
        return await RentAgreementsDb.GetAllAgreementsByDateRange(StartDate, EndDate);
}

function ParseAgreementForPdf(parsed_object_from_db) {
    const end_date = moment(parsed_object_from_db.EndDate);
    const start_date = moment(parsed_object_from_db.StartDate);
    parsed_object_from_db.StartDate = start_date.locale('he').format(Constants.TIME_DATE_FORMAT);
    parsed_object_from_db.EndDate = parsed_object_from_db.EndDate && end_date.locale('he').format(Constants.TIME_DATE_FORMAT);
    parsed_object_from_db.RentToolsList = parsed_object_from_db.RentalAgreementLists?.flatMap(list => list.RentProduct);
    parsed_object_from_db.SumDays = end_date.diff(start_date, 'days') + 1;
    return parsed_object_from_db;
}

async function GetAgreementPdf(agreements, title) {
    const parsed_object_from_db = agreements.map(agreement => ParseAgreementForPdf(agreement.toJSON()));
    parsed_object_from_db.title = title;
    return await PdfService.CreateAgreementPdf(parsed_object_from_db);
}

const RentalAgreementsService = {
    GetAllAgreements,
    AddAgreement,
    AddAgreementOldCustomer,
    CloseAgreement,
    DeleteAgreement,
    GetAgreementPdf,
    GetAgreement,
    SearchAgreements,
    ParseAgreementForPdf    
};

export default RentalAgreementsService;