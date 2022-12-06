import ProductsDB from "../storage/Products/index.js";
import ImageService from '../ImageService.js';

async function AddDiagram(product_id, model_name, file) {
    const image = await ImageService.ResizeAndStoreImage(file.path, file.filename);
    const diagram = await ProductsDB.Diagrams.AddDiagram(product_id, model_name, image);
    return await ProductsDB.Diagrams.GetById(diagram.ProductPartsDiagramId);
}

async function AddDiagramFromList(diagram_id, product_id) {
    return await ProductsDB.Diagrams.AddDiagramFromList(diagram_id, product_id);
}

async function DeleteDiagram(id) {
    const diagram = await ProductsDB.Diagrams.GetById(id);
    const delete_image = ImageService.DeleteStoredImages(diagram.ProductPartsDiagram.Image);
    return [await Promise.all([ProductsDB.Diagrams.DeleteDiagram(id), delete_image])];
}

async function DeleteDiagramFromProduct(diagram_id, product_id) {
    return await ProductsDB.Diagrams.DeleteDiagramFromProduct(diagram_id, product_id);
}

async function PatchDiagram(id, value) {
    return await ProductsDB.Diagrams.PatchDiagramName(id, value);
}

async function GetDiagrams() {
    return await ProductsDB.Diagrams.GetDiagrams();
}

const DiagramsService = {
    AddDiagram,
    AddDiagramFromList,
    DeleteDiagram,
    DeleteDiagramFromProduct,
    PatchDiagram,
    GetDiagrams
};

export default DiagramsService;