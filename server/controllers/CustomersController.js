import CustomerService from "../services/CustomerService.js";

async function GetAllCustomers(req, res) {
    try {
        const customers = await CustomerService.GetAll();
        return res.status(200).json(customers);
    } catch (err) {

    }
}

async function PatchCustomer(req, res) {
    try {
        const { id } = req.params;
        const { param_name, value } = req.body;
        await CustomerService.PatchCustomer(id, param_name, value);
        return res.status(200).json();
    } catch (err) {

    }
}

async function DeleteCustomer(req, res) {
    try {
        const { id } = req.params;
        await CustomerService.DeleteCustomer(id);
        return res.status(200).json();
    } catch (err) {

    }
}

const CustomersController = {
    GetAllCustomers,
    PatchCustomer,
    DeleteCustomer
};

export default CustomersController;