import SaleCategoriesDB from "../storage/Sale/Categories.js";

async function AddCategory(name, image) {
    return await SaleCategoriesDB.AddCategory(name, image);
}

const SaleCategoriesService = {
    AddCategory
};

export default SaleCategoriesService;