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

const RentService = {
    GetAll,
    GetAllAvailable
};

export default RentService;