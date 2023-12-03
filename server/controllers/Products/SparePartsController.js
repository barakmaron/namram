import ProductsService from "../../services/Products/index.js";
import { StatusCode } from 'status-code-enum';

async function AddPart(req, res, next) {
    try {
        const { diagram_id, serial_number, name_english, name_hebrew, price, count } = req.body;
        const new_part = await ProductsService.SpareParts.AddPart(diagram_id, serial_number, name_english, name_hebrew, price, count);
        return res.status(StatusCode.SuccessOK).json(new_part);
    } catch (err) {
        next(err);
    }
}

async function DeletePart(req, res, next) {
    try {
        const { id } = req.params;
        await ProductsService.SpareParts.DeletePart(id);
        return res.status(StatusCode.SuccessOK).json();
    } catch (err) {
        next(err);
    }
}

async function PatchPart(req, res, next) {
    try {
        const { id } = req.params;
        const { field_name, value } = req.body;
        switch (field_name) {
            case 'Diagram': {
                const diagrams = await ProductsService.Diagrams.GetDiagrams();
                const findDiagram = diagrams.find(diagram => diagram.ModelName === value);
                await ProductsService.SpareParts.PatchPart(id, 'ProductPartsDiagramId', findDiagram.id);
                return res.status(StatusCode.SuccessOK).json(findDiagram.id);
            }
            default: {
                await ProductsService.SpareParts.PatchPart(id, field_name, value);
            }
        }
        return res.status(StatusCode.SuccessOK).json();
    } catch (err) {
        next(err);
    }
}


const SparePartsController = {
    AddPart,
    DeletePart,
    PatchPart
};

export default SparePartsController;