import Constants from "../../Constants.js";
import PdfService from "../PdfServices/index.js";
import ServiceReportsDb from "../storage/ServiceReports/ServiceReports.js";
import moment from 'moment';
import ChangedPartsService from './ChangedPartsService.js'

async function GetServiceReports() {
    return await ServiceReportsDb.GetServiceReports();
}

async function AddServiceReport(product_id, problem) {
    return await ServiceReportsDb.AddServiceReport(product_id, problem);
}

async function GetServiceReport(id) {
    return await ServiceReportsDb.GetServiceReportById(id);
}

async function GetServiceReportsByProductId(product_id) {
    return await ServiceReportsDb.GetServiceReportsByProductId(product_id);
}

async function GetServiceReportById(id) {
    return await ServiceReportsDb.GetProductByServiceReportId(id);
}

async function GetServiceReportPdf(id) {
    const service_report = await GetServiceReportById(id);
    const parsed_object_from_db = service_report.toJSON();
    parsed_object_from_db.ServiceReports = ParseServiceReportData(parsed_object_from_db.ServiceReports);    
    return await PdfService.CreateServiceReportPdf(parsed_object_from_db);
}

async function GetServiceBook(product_id) {
    const service_book = await GetServiceReportsByProductId(product_id);
    const parsed_object_from_db = service_book.toJSON();
    parsed_object_from_db.ServiceReports = ParseServiceReportData(parsed_object_from_db.ServiceReports);    
    return await PdfService.CreateServiceReportPdf(parsed_object_from_db);
}

function ParseServiceReportData(ServiceReports) {    
    return ServiceReports.map(report => {
        const temp_report = {...report};
        temp_report.StartDate = moment(report.StartDate).locale('he').format(Constants.TIME_DATE_FORMAT);
        temp_report.EndDate = report.EndDate ? moment(report.EndDate).locale('he').format(Constants.TIME_DATE_FORMAT) : null;
        temp_report.SumParts = report.PartsChangeds?.reduce((accumulator, part) => accumulator + Number.parseInt(part.SparePart.Price), 0) || 0;
        temp_report.Problem = report.Problem.replace(Constants.html_remove_regex, "");
        return temp_report;
    });
}

async function PatchServiceReport(id, param_name, value) {
    return await ServiceReportsDb.PatchServiceReport(id, param_name, value);
}

const ServiceReportsService = {
    GetServiceReports,
    AddServiceReport,
    GetServiceReport,
    GetServiceReportPdf,
    GetServiceBook,
    PatchServiceReport,
    ParseServiceReportData,
    ChangedPartsService
};

export default ServiceReportsService;