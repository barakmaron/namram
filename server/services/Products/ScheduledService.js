import ProductsDB from "../storage/Products/index.js";

async function AddService(product_id, name, text, scheduled) {
    return await ProductsDB.ScheduledService.AddService(product_id, name, text, scheduled);
}

async function DeleteService(id) {
    return await ProductsDB.ScheduledService.DeleteService(id);
}

async function PatchService(id, param, value) {
    return await ProductsDB.ScheduledService.PatchService(id, param, value);
}

const ScheduledService = {
    AddService,
    DeleteService,
    PatchService
};

export default ScheduledService;