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

async function CreateRentalProductReport(product) {
    const parse_product_from_db = ParseRentalProductForPdf(product);
    parse_product_from_db.RentalProducts = [{...parse_product_from_db}];
    return await PdfService.CreateRentalProductPdf(parse_product_from_db);
}

function ParseRentalProductForPdf(product) {
    const temp_product = {...product};
    temp_product.RentalAgreementLists = temp_product.RentalAgreementLists.map(agreement => ({
        RentalAgreement: RentalAgreementsService.ParseAgreementForPdf(agreement.RentalAgreement),
        ...agreement
    }));
    temp_product.SumRentalDays = temp_product.RentalAgreementLists.reduce((accumulator, agreement) => accumulator + agreement.RentalAgreement.SumDays, 0);
    temp_product.SumRentalIncome = temp_product.SumRentalDays * temp_product.DayPrice;
    temp_product.ServiceReports = ServiceReportsService.ParseServiceReportData(temp_product.ServiceReports);
    temp_product.ServicePrice = temp_product.ServiceReports.reduce((accumulator, report) => accumulator + report.SumParts, 0);
    temp_product.SumNetIncome = temp_product.SumRentalIncome - temp_product.ServicePrice;
    return temp_product;
}


const RentService = {
    GetAll,
    GetAllAvailable,
    GetRentalProduct, 
    CreateRentalProductReport,
    ParseRentalProductForPdf
};

export default RentService;