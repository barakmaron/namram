import PdfService from "./PdfServices/index.js";
import RentalAgreementsService from "./RentalAgreementsService.js";
import ServiceReportsService from "./ServiceReports/ServiceReportsService.js";
import RentDB from "./storage/Rent.js";
import RentAgreementsDb from "./storage/RentAgreements.js";
import ServiceReportsDb from "./storage/ServiceReports/ServiceReports.js";

async function GetAll() {
   return await RentDB.GetAllCategoriesNested();
}

async function GetAllAvailable() {
    const [
        categories, 
        open_rental_agreements, 
        open_service_reports
    ] = await Promise.all([
        RentDB.GetAllCategoriesNested(), 
        RentAgreementsDb.GetAllOpenAgreements(), 
        ServiceReportsDb.GetServiceReports()
    ]);
    const products_in_rent = open_rental_agreements.flatMap(agreement => agreement.RentalAgreementLists.map(list => list.RentProduct));
    const products_in_service = open_service_reports.map(report => report.RentProduct);
    const products = [...products_in_rent, ...products_in_service];
    return categories.map(category => {
        const filtered_products = category.RentProducts.filter(product_in_category => {
            return !products.find(product => product_in_category.id === product.id);
        });
        category.setDataValue('RentProducts', filtered_products);
        return category;
    });
}

async function GetRentalProduct(id) {
    return await RentDB.GetRentalProduct(id);
}

async function CreateRentalProductReport(parse_product_from_db) {
    parse_product_from_db.RentalAgreementLists = parse_product_from_db.RentalAgreementLists.map(agreement => ({
        RentalAgreement: RentalAgreementsService.ParseAgreementForPdf(agreement.RentalAgreement),
        ...agreement
    }));
    parse_product_from_db.SumRentalDays = parse_product_from_db.RentalAgreementLists.reduce((accumulator, agreement) => accumulator + agreement.RentalAgreement.SumDays, 0);
    parse_product_from_db.SumRentalIncome = parse_product_from_db.SumRentalDays * parse_product_from_db.DayPrice;
    parse_product_from_db.ServiceReports = ServiceReportsService.ParseServiceReportData(parse_product_from_db.ServiceReports);
    parse_product_from_db.ServicePrice = parse_product_from_db.ServiceReports.reduce((accumulator, report) => accumulator + report.SumParts, 0);
    parse_product_from_db.SumNetIncome = parse_product_from_db.SumRentalIncome - parse_product_from_db.ServicePrice;
    return await PdfService.CreateRentalProductPdf(parse_product_from_db);
}

const RentService = {
    GetAll,
    GetAllAvailable,
    GetRentalProduct, 
    CreateRentalProductReport
};

export default RentService;