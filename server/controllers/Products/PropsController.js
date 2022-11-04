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
const PropsController = {
    PatchProps
};

export default PropsController;