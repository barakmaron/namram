import ServiceReportsService from "../../services/ServiceReports/ServiceReportsService.js";
import { StatusCode } from 'status-code-enum';

async function AddChangedPart(req, res, next){
    try {
        const { id } = req.params;
        const { part_id } = req.body;
        const part = await ServiceReportsService.ChangedPartsService.AddChangedPart(id, part_id);
        return res.status(StatusCode.SuccessOK).json(part);
    } catch(err) {
        next(err);
    }
}

async function DeleteChangedPart(req, res, next) {
    try {
        const { id, part_id } = req.params;
        await ServiceReportsService.ChangedPartsService.DeleteChangedPart(id, part_id);
        return res.status(StatusCode.SuccessOK).json();
    } catch (err) {
        next(err);
    }
}

const PartsChangedController = {
    AddChangedPart,
    DeleteChangedPart
};

export default PartsChangedController;