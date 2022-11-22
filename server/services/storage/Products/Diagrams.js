import { ProductPartsDiagramModel, SparePartsModel } from "../../../db/models/index.js";

async function AddDiagram(product_id, model_name, image) {
    return await ProductPartsDiagramModel.create({
        ModelName: model_name,
        Image: image,
        ProductId: product_id
    });
}

async function DeleteDiagram(id) {
    const parts = SparePartsModel.destroy({
        where: {
            ProductPartsDiagramId: id
        }
    });
    const diagram = ProductPartsDiagramModel.destroy({
        where: {
            id: id
        }
    });
    return await Promise.all([ parts, diagram ]);
}

async function PatchDiagramName(id, value) {
    return await ProductPartsDiagramModel.update({
        ModelName: value
    }, {
        where: {
            id: id
        }
    });
}

async function GetById(id) {
    return await ProductPartsDiagramModel.findOne({
        where: {
            id: id
        }
    });
}

const DiagramsDB = {
    AddDiagram,
    DeleteDiagram,
    PatchDiagramName,
    GetById
};

export default DiagramsDB;