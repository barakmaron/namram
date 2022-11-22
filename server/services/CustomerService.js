import CustomersDb from './storage/Customers.js'

async function GetAll() {
    return await CustomersDb.GetAll();
}

async function AddCustomer(customer) { 
    return await CustomersDb.AddCustomer(customer);
}

async function PatchCustomer(id, param_name, value) {
    return await CustomersDb.PatchCustomer(id, param_name, value);
}

async function DeleteCustomer(id) {
    return await CustomersDb.DeleteCustomer(id);
}

const CustomerService = {
    AddCustomer,
    GetAll,
    PatchCustomer,
    DeleteCustomer
};

export default CustomerService;