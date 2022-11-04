import { ProductPropsModel } from "../../../db/models/index.js";

async function PatchName(id, value) {
    return await ProductPropsModel.update({
        PropName: value
    }, {
        where: {
            id: id
        }
    });
}

async function PatchValue(id, value) {
    return await ProductPropsModel.update({
        Value: value
    }, {
        where: {
            id: id
        }
    });
}

const Props = {
    PatchName,
    PatchValue
};

export default Props;