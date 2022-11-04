import SaleCategoriesDB from "../storage/Sale/Categories.js";

async function AddCategory(name, image) {
    return await SaleCategoriesDB.AddCategory(name, image);
}

async function DeleteCategory(id) {
    return await SaleCategoriesDB.DeleteCategory(id);
}

async function EditCategory(name, image, id) {
    return await SaleCategoriesDB.EditCategory(name, image, id);
}

const SaleCategoriesService = {
    AddCategory,
    DeleteCategory,
    EditCategory
};

export default SaleCategoriesService;