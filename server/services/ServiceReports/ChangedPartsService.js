import ServiceReportsDb from "../storage/ServiceReports/ServiceReports.js";
import SparePartsDB from '../storage/Products/SpareParts.js';

async function AddChangedPart(service_report_id, spare_part_id) {
    await SparePartsDB.DecrementPartInInventory(spare_part_id);
    return await ServiceReportsDb.ChangedPartDb.AddChangedPart(service_report_id, spare_part_id);
}

async function DeleteChangedPart(service_report_id, spare_part_id) {
    await SparePartsDB.IncrementPartInInventory(spare_part_id);
    return await ServiceReportsDb.ChangedPartDb.DeleteChangedPart(service_report_id, spare_part_id);
}

const ChangedPartsService = {
    AddChangedPart,
    DeleteChangedPart
};

export default ChangedPartsService;