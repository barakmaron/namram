import ProductsService from '../../services/Products/index.js';
import { StatusCode } from 'status-code-enum';

async function PatchProps(req, res, next) {
    try {
        const { id } = req.params;
        const { name, value } = req.body;
        await ProductsService.Props.PatchProps(id, name, value);
        return res.status(StatusCode.SuccessOK).json();
    } catch (err) {
        next(err);
    }
}

async function AddProp(req, res, next) {
    try {
        const { product_id } = req.body;
        const prop = await ProductsService.Props.AddProp(product_id);
        return res.status(StatusCode.SuccessOK).json(prop);
    } catch (err) {
        next(err);
    }
}

async function DeleteProp(req, res, next) {
    try {
        const { id } = req.params;
        await ProductsService.Props.DeleteProp(id);
        return res.status(StatusCode.SuccessOK).json();
    } catch (err) {
        next(err);
    }
}

const PropsController = {
    PatchProps,
    AddProp,
    DeleteProp
};

export default PropsController;