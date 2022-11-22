import { PartsChangedModel, ProductPartsDiagramModel, SparePartsModel } from "../../../db/models/index.js";

async function GetChangedPartById(id) {
    return await PartsChangedModel.findOne({
        where: { 
            id: id
        },
        include: {
            model: SparePartsModel,
            include: {
                model: ProductPartsDiagramModel,
                attributes: ["ModelName"]
            }
        }
    })
}

async function AddChangedPart(service_report_id, spare_part_id) {
    const part = await PartsChangedModel.create({
        ServiceReportId: service_report_id,
        SparePartId: spare_part_id
    });
    return await GetChangedPartById(part.id);
}

async function DeleteChangedPart(service_report_id, spare_part_id) {
    return await PartsChangedModel.destroy({
        where: {
            ServiceReportId: service_report_id,
            SparePartId: spare_part_id
        }
    });
}

const ChangedPartDb = {
    AddChangedPart,
    DeleteChangedPart
};

export default ChangedPartDb;