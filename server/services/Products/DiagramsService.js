import ProductsDB from "../storage/Products/index.js";
import ImageService from '../ImageService.js';

async function AddDiagram(product_id, model_name, file) {
    const image = await ImageService.ResizeAndStoreImage(file.path, file.filename);
    const diagram = await ProductsDB.Diagrams.AddDiagram(product_id, model_name, image);
    return await ProductsDB.Diagrams.GetById(diagram.id);
}

async function DeleteDiagram(id) {
    const diagram = await ProductsDB.Diagrams.GetById(id);
    const delete_image = ImageService.DeleteStoredImages(diagram.Image);
    return [await Promise.all([ProductsDB.Diagrams.DeleteDiagram(id), delete_image])];
}

async function PatchDiagram(id, value) {
    return await ProductsDB.Diagrams.PatchDiagramName(id, value);
}

const DiagramsService = {
    AddDiagram,
    DeleteDiagram,
    PatchDiagram
};

export default DiagramsService;