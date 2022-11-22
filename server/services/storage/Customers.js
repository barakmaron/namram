import { CustomersModel } from "../../db/models/index.js";

async function AddCustomer(customer) {
    const { FullName, CompanyName, Fax, Address, HomePhoneNumber, PhoneNumber, IdNumber } = customer;
    return await CustomersModel.create({
        FullName: FullName,
        Address: Address,
        PhoneNumber: PhoneNumber,
        IdNumber: IdNumber,
        CompanyName: CompanyName,
        HomePhoneNumber: HomePhoneNumber,
        FaxNumber: Fax
    });
}

async function GetAll() {
    return await CustomersModel.findAll();
}

async function PatchCustomer(id, param_name, value) {
    return await CustomersModel.update({
        [param_name]: value
    }, {
        where: {
            id: id
        }
    });
}

async function DeleteCustomer(id) {
    return await CustomersModel.destroy({
        where: {
            id: id
        }
    });
};

const CustomersDb = {
    AddCustomer,
    GetAll,
    PatchCustomer,
    DeleteCustomer
};

export default CustomersDb;