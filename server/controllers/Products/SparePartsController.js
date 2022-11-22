import ProductsService from "../../services/Products/index.js";

async function AddPart(req, res) {
    try {
        const { diagram_id, serial_number, name_english, name_hebrew, price, count } = req.body;
        const new_part = await ProductsService.SpareParts.AddPart(diagram_id, serial_number, name_english, name_hebrew, price, count);
        return res.status(200).json(new_part);
    } catch (err) {

    }
}

async function DeletePart(req, res) {
    try {
        const { id } = req.params;
        await ProductsService.SpareParts.DeletePart(id);
        return res.status(200).json();
    } catch (err) {

    }
}

async function PatchPart(req, res) {
    try {
        const { id } = req.params;
        const { field_name, value } = req.body;
        await ProductsService.SpareParts.PatchPart(id, field_name, value);
        return res.status(200).json();
    } catch (err) {
        
    }
}


const SparePartsController = {
    AddPart,
    DeletePart,
    PatchPart
};

export default SparePartsController;