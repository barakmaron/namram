import { ProductDiagramsListModel, ProductPartsDiagramModel, SparePartsModel } from "../../../db/models/index.js";

async function AddDiagram(product_id, model_name, image) {
    const diagram = await ProductPartsDiagramModel.create({
        ModelName: model_name,
        Image: image
    });
    const diagram_list_item = await ProductDiagramsListModel.create({
        ProductPartsDiagramId: diagram.id,
        ProductId: product_id
    });
    return await GetById(diagram.id);
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
    const lists = ProductDiagramsListModel.destroy({
        where: {
            ProductPartsDiagramId: id
        }
    })
    return await Promise.all([ parts, diagram, lists ]);
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
    return await ProductDiagramsListModel.findOne({        
        include: {
            model: ProductPartsDiagramModel,
            include: SparePartsModel,
            where: {
                id: id
            },
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