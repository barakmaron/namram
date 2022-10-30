import { SaleCategoriesModel } from "../../../db/models/index.js";

async function AddCategory(name, image) {
    return await SaleCategoriesModel.create({
        Name: name,
        Image: image
    });
}

const SaleCategoriesDB = {
    AddCategory
};

export default SaleCategoriesDB;