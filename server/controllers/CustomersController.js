import CustomerService from "../services/CustomerService.js";
import { StatusCode } from 'status-code-enum';

async function GetAllCustomers(req, res, next) {
    try {
        const customers = await CustomerService.GetAll();
        return res.status(StatusCode.SuccessOK).json(customers);
    } catch (err) {
        next(err);
    }
}

async function PatchCustomer(req, res, next) {
    try {
        const { id } = req.params;
        const { param_name, value } = req.body;
        await CustomerService.PatchCustomer(id, param_name, value);
        return res.status(StatusCode.SuccessOK).json();
    } catch (err) {
        next(err);
    }
}

async function DeleteCustomer(req, res, next) {
    try {
        const { id } = req.params;
        await CustomerService.DeleteCustomer(id);
        return res.status(StatusCode.SuccessOK).json();
    } catch (err) {
        next(err);
    }
}

async function AddCustomer(req, res, next) {
    try {
        const { FullName, Address, CompanyName, Fax, HomePhoneNumber, IdNumber, PhoneNumber } = req.body;
        const new_customer = await CustomerService.AddCustomer({FullName, Address, CompanyName,Fax, HomePhoneNumber, IdNumber, PhoneNumber});
        return res.status(StatusCode.SuccessOK).json(new_customer);
    } catch (err) {
        next(err);
    }
}

const CustomersController = {
    GetAllCustomers,
    PatchCustomer,
    DeleteCustomer,
    AddCustomer
};

export default CustomersController;