import ProductsService from "../../services/Products/index.js";
import { StatusCode } from 'status-code-enum';

async function AddService(req, res, next) {
    try {
        const { product_id, Name, Text, Scheduled } = req.body;
        const service = await ProductsService.ScheduledService.AddService(product_id, Name, Text, Scheduled);
        return res.status(StatusCode.SuccessOK).json(service);
    } catch (err) {
        next(err);
    }
}

async function DeleteService(req, res, next) {
    try {
        const { id } = req.params;
        await ProductsService.ScheduledService.DeleteService(id);
        return res.status(StatusCode.SuccessOK).json();
    } catch (err) {
        next(err);
    }
}

async function PatchService(req, res, next) {
    try {
        const { id } = req.params;
        const { param, value } = req.body;
        await ProductsService.ScheduledService.PatchService(id, param, value);
        return res.status(StatusCode.SuccessOK).json();
    } catch (err) {
        next(err);
    }
}

const ScheduledServiceController = {
    AddService,
    DeleteService,
    PatchService
};

export default ScheduledServiceController;