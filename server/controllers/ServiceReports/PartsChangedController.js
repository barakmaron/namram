import ServiceReportsService from "../../services/ServiceReports/ServiceReportsService.js";

async function AddChangedPart(req, res){
    try {
        const { id } = req.params;
        const { part_id } = req.body;
        const part = await ServiceReportsService.ChangedPartsService.AddChangedPart(id, part_id);
        return res.status(200).json(part);
    } catch(err) {
        console.log(err);
    }
}

async function DeleteChangedPart(req, res) {
    try {
        const { id, part_id } = req.params;
        await ServiceReportsService.ChangedPartsService.DeleteChangedPart(id, part_id);
        return res.status(200).json();
    } catch (err) {
        console.log(err);
    }
}

const PartsChangedController = {
    AddChangedPart,
    DeleteChangedPart
};

export default PartsChangedController;