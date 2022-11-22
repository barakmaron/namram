import { ProductPropsModel } from "../../../db/models/index.js";

async function PatchProp(id, field_name, value) {
    return await ProductPropsModel.update({
        [field_name]: value
    }, {
        where: {
            id: id
        }
    });
}

async function AddProp(product_id) {
    return await ProductPropsModel.create({
        ProductId: product_id
    });
}

async function DeleteProp(id) {
    return await ProductPropsModel.destroy({
        where: {
            id: id
        }
    });
}

const Props = {
    PatchProp,
    AddProp,
    DeleteProp
};

export default Props;