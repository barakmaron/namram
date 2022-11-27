import ProductsDB from "../storage/Products/index.js";

async function AddPart(diagram_id, serial_number, name_english, name_hebrew, price, count) {
    return await ProductsDB.SpareParts.AddPart(diagram_id, serial_number, name_english, name_hebrew, price, count);
}

async function DeletePart(id) {
    return await ProductsDB.SpareParts.DeletePart(id);
}

async function PatchPart(id, field_name, value) {
   return await ProductsDB.SpareParts.PatchPart(id, field_name, value);
}

async function GetOutOfStockParts() {
    return await ProductsDB.SpareParts.GetOutOfStock();
}

const SparePartsService = {
    AddPart,
    DeletePart,
    PatchPart,
    GetOutOfStockParts
};

export default SparePartsService;