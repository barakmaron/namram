import CategoriesDB from "./storage/Categories.js";
import ImageService from "./ImageService.js";

async function AddCategory(name, image, product_type){
    const image_resized = await ImageService.ResizeAndStoreImage(image.path, image.filename);
    return await CategoriesDB.AddCategory(name, image_resized, product_type);
}

async function DeleteCategory(id) {
    const category = await CategoriesDB.GetOnlyCategoryById(id);
    const delete_image = ImageService.DeleteStoredImages(category.Image); 
    return [await Promise.all([CategoriesDB.DeleteCategory(id), delete_image])];
}

async function EditCategory(name, id) {
    return await CategoriesDB.EditCategory(name, id);
}

const CategoriesService = {
    AddCategory,
    DeleteCategory,
    EditCategory
};

export default CategoriesService;