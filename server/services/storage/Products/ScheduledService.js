import { ScheduledServiceModel } from "../../../db/models/index.js";

async function AddService(product_id, name, text, scheduled) {
    return await ScheduledServiceModel.create({
        RentProductId: product_id,
        Name: name,
        Text: text,
        Scheduled: scheduled
    });
}

async function DeleteService(id) {
    return await ScheduledServiceModel.destroy({
        where: {
            id: id
        }
    });
}

async function PatchService(id, param, value) {
    return await ScheduledServiceModel.update({
        [param]: value
    }, {
        where: {
            id: id
        }
    });
}

const ScheduledService = {
    AddService,
    DeleteService,
    PatchService
};

export default ScheduledService;