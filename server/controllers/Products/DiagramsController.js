import ProductsService from "../../services/Products/index.js";

async function AddDiagram(req, res) {
    try {
        const { product_id, model_name } = req.body;
        const diagram = await ProductsService.Diagrams.AddDiagram(product_id, model_name, req.file);
        return res.status(200).json(diagram);
    } catch (err) {
        
    }
}

async function DeleteDiagram(req, res) {
    try {
        const { id } = req.params;
        await ProductsService.Diagrams.DeleteDiagram(id);
        return res.status(200).json();
    } catch (err) {
        
    }
}


async function PatchDiagram(req, res) {
    try {
        const { id } = req.params;
        const { value } = req.body;
        await ProductsService.Diagrams.PatchDiagram(id, value);
        return res.status(200).json();
    } catch (err) {
        
    }
}



const DiagramsController = {
    AddDiagram,
    DeleteDiagram,
    PatchDiagram
};

export default DiagramsController;