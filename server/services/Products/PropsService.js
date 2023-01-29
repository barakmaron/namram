import ProductDB from '../storage/Products/index.js';

async function PatchProps(id, name, value) {
    return await ProductDB.Props.PatchProp(id, name, value);    
}

async function AddProp(product_id) {
    return await ProductDB.Props.AddProp(product_id);
}

async function DeleteProp(id) {
    return await ProductDB.Props.DeleteProp(id);
}

const PropsService = {
    PatchProps,
    AddProp,
    DeleteProp
};

export default PropsService;