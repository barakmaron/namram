import ProductsDB from "../storage/Products/index.js";
import moment from 'moment';

async function GetAllScheduledServices() {
    return await ProductsDB.ScheduledService.GetAllScheduledServices()
}

async function AddService(product_id, name, text, scheduled) {
    return await ProductsDB.ScheduledService.AddService(product_id, name, text, scheduled);
}

async function DeleteService(id) {
    return await ProductsDB.ScheduledService.DeleteService(id);
}

async function PatchService(id, param, value) {
    return await ProductsDB.ScheduledService.PatchService(id, param, value);
}

async function RequiredServices() {
    const services = await GetAllScheduledServices();
    const products = await Promise.all(services.map(service => ProductsDB.GetRentProductWithRentalAgreements(service.RentProductId, service.LastServiceDate)));
    const product_with_rental_agreements = services.map((service, index) => ({
        Product: products[index],
        Service: service,
    }));
    const count_rental_days_for_products = product_with_rental_agreements.map(product => ({
        num_rental_days: product.Product.RentalAgreementLists.reduce((accumulator, agreement) => {
            const end_date = moment(agreement.EndDate);
            const start_date = moment(agreement.StartDate);
            const diff = end_date.diff(start_date, 'days') + 1;
            return accumulator + diff;
        }, 0),
        Product: product.Product,
        Service: product.Service
    }));
    const required_services = count_rental_days_for_products.filter(product => {
        return product.Service.Scheduled <= product.num_rental_days;
    });
    return required_services;
}

const ScheduledService = {
    AddService,
    DeleteService,
    PatchService,
    RequiredServices
};

export default ScheduledService;