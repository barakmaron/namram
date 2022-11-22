import ProductsService from '../../services/Products/index.js';

async function PatchProps(req, res) {
    try {
        const { id } = req.params;
        const { name, value } = req.body;
        await ProductsService.Props.PatchProps(id, name, value);
        return res.status(200).json();
    } catch (err) {

    }
}

async function AddProp(req, res) {
    try {
        const { product_id } = req.body;
        const prop = await ProductsService.Props.AddProp(product_id);
        return res.status(200).json(prop);
    } catch (err) {

    }
}

async function DeleteProp(req, res) {
    try {
        const { id } = req.params;
        await ProductsService.Props.DeleteProp(id);
        return res.status(200).json();
    } catch (err) {

    }
}

const PropsController = {
    PatchProps,
    AddProp,
    DeleteProp
};

export default PropsController;