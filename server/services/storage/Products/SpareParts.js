import { ProductDiagramsListModel, ProductPartsDiagramModel, ProductsModel, SparePartsModel } from "../../../db/models/index.js";

async function GetSparePartById(part_id) {
    return await SparePartsModel.findOne({
        where: {
            id: part_id
        }
    });
}

async function AddPart(diagram_id, serial_number, name_english, name_hebrew, price, count) {
    return await SparePartsModel.create({
        SerialNumber: serial_number,
        NameEnglish: name_english,
        NameHebrew: name_hebrew,
        Price: price,
        Count: count,
        ProductPartsDiagramId: diagram_id
    });
}

async function DeletePart(id) {
    return await SparePartsModel.destroy({
        where: {
            id: id
        }
    });
}

async function PatchPart(id, field_name, value) {
    return await SparePartsModel.update({
        [field_name]: value
    }, {
        where: {
            id: id
        }
    });
}

async function DecrementPartInInventory(part_id) {
    const part = await GetSparePartById(part_id);
    return await part.decrement('Count');
}

async function IncrementPartInInventory(part_id) {
    const part = await GetSparePartById(part_id);
    return await part.increment('Count');
}

async function GetOutOfStock() {
    return await SparePartsModel.findAll({
        where: {
            Count: 0
        },
        include: {
            model: ProductPartsDiagramModel,
            attributes: ["ModelName"],
            include: {
                model: ProductDiagramsListModel,
                include: ProductsModel
            }
        }
    });
}

const SparePartsDB = {
    AddPart,
    DeletePart,
    PatchPart,
    DecrementPartInInventory,
    IncrementPartInInventory,
    GetOutOfStock
};

export default SparePartsDB;