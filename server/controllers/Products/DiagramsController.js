import ProductsService from "../../services/Products/index.js";
import { StatusCode } from 'status-code-enum';

async function AddDiagram(req, res, next) {
    try {
        const { product_id, model_name, filesNames } = req.body;
        const diagram = await ProductsService.Diagrams.AddDiagram(product_id, model_name, filesNames);
        return res.status(StatusCode.SuccessOK).json(diagram);
    } catch (err) {
        next(err);
    }
}

async function AddDiagramFromList(req, res, next) {
    try {
        const { id } = req.params;
        const { product_id } = req.body;
        const diagram = await ProductsService.Diagrams.AddDiagramFromList(id, product_id);
        return res.status(StatusCode.SuccessOK).json(diagram);
    } catch (err) {
        next(err);
    }
}

async function DeleteDiagram(req, res, next) {
    try {
        const { id } = req.params;
        await ProductsService.Diagrams.DeleteDiagram(id);
        return res.status(StatusCode.SuccessOK).json();
    } catch (err) {
        next(err);
    }
}

async function DeleteDiagramFromProduct(req, res, next) {
    try {
        const { diagram_id, product_id } = req.params;
        await ProductsService.Diagrams.DeleteDiagramFromProduct(diagram_id, product_id);
        return res.status(StatusCode.SuccessOK).json();
    } catch (err) {
        next(err);
    }
}


async function PatchDiagram(req, res, next) {
    try {
        const { id } = req.params;
        const { value } = req.body;
        await ProductsService.Diagrams.PatchDiagram(id, value);
        return res.status(StatusCode.SuccessOK).json();
    } catch (err) {
        next(err);
    }
}

async function GetDiagrams(req, res, next) {
    try {
        const diagrams = await ProductsService.Diagrams.GetDiagrams();
        return res.status(StatusCode.SuccessOK).json(diagrams);
    } catch (err) {
        next(err);
    }
}

const DiagramsController = {
    AddDiagram,
    AddDiagramFromList,
    DeleteDiagram,
    DeleteDiagramFromProduct,
    PatchDiagram,
    GetDiagrams
};

export default DiagramsController;