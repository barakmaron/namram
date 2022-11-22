import { CustomersModel, ProductsModel, RentalAgreementListModel, RentalAgreementModel, RentalProductsModel, sequelize } from "../../db/models/index.js";

async function GetAllOpenAgreements() {
    return await RentalAgreementModel.findAll({
        where: {
            EndDate: null
        },
        include: {
            model: RentalAgreementListModel,            
            include: [{
                model: RentalProductsModel,
                include: [ProductsModel]
            }]
        }
    });
}

async function GetAllCloseAgreements() {
    return await RentalAgreementModel.findAll({
        where: {
            EndDate: {
                ne: null
            }
        },
        include: {
            model: RentalAgreementListModel,            
            include: [{
                model: RentalProductsModel,
                include: [ProductsModel]
            }]
        }
    });
}

async function GetAllAgreementsByCustomer(customer) {
    return await RentalAgreementModel.findAll({
        include: [{
            model: RentalAgreementListModel,            
            include: [{
                model: RentalProductsModel,
                include: [ProductsModel]
            }]
        }, {
            model: CustomersModel,
            where: {
                id: customer
            }
        }]
    });
}

async function AddAgreement(tools, location, fuel_amount, fuel_price, transport_amount, transport_price, signature, customer_id) {
    const rental_agreement = await RentalAgreementModel.create({
        Location: location,
        CustomerId: customer_id,
        StartSignature: signature,
        StartFuelCount: fuel_amount,
        StartFuelPrice: fuel_price,
        StartTransportCount: transport_amount,
        StartTransportPrice: transport_price
    });
    const tools_array = await JSON.parse(tools);
    const tools_db_promises = tools_array.map(tool => RentalAgreementListModel.create({
        RentalAgreementId: rental_agreement.id,
        RentProductId: tool.product
    }));
    await Promise.all(tools_db_promises);
    return await GetRentalAgreementById(rental_agreement.id);
}

async function GetRentalAgreementById(id) {
    return await RentalAgreementModel.findOne({
        where: {
            id: id
        },
        include: [CustomersModel, {
            model: RentalAgreementListModel,            
            include: [{
                model: RentalProductsModel,
                include: [ProductsModel]
            }]
        }]
    });
}

async function CloseAgreement(id, fuel_amount, fuel_price, transport_amount, transport_price, signature) {
    return await RentalAgreementModel.update({
        EndFuelCount: fuel_amount,
        EndFuelPrice: fuel_price,
        EndTransportCount: transport_amount,
        EndTransportPrice: transport_price,
        EndSignature: signature,
        EndDate: sequelize.literal('CURRENT_TIMESTAMP')
    }, {
        where: {
            id: id
        }
    });
}

async function DeleteAgreement(id) {
    const delete_rental_tools_list = RentalAgreementListModel.destroy({
        where: {
            RentalAgreementId: id
        }
    });
    const delete_rental_agreement = RentalAgreementModel.destroy({
        where: {
            id: id
        }
    });
    return await Promise.all([delete_rental_tools_list, delete_rental_agreement]);
}

async function GetAgreement(id) {
    return await RentalAgreementModel.findOne({
        where: {
            id: id
        }, 
        include: [CustomersModel, {
            model: RentalAgreementListModel,
            include: {
                model: RentalProductsModel,
                include: ProductsModel
            }
        }]
    });
}

const RentAgreementsDb = {
    GetAllOpenAgreements,
    GetAllCloseAgreements,
    GetAllAgreementsByCustomer,
    AddAgreement,
    CloseAgreement,
    DeleteAgreement,
    GetAgreement
};

export default RentAgreementsDb;