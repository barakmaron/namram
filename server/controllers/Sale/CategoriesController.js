import ImageService from '../../services/ImageService.js';
import SaleService from '../../services/SaleService/index.js';

async function AddCategory(req, res) {
    try {
        const { name } = req.body;
        const { path, filename } = req.file;
        const image_resized = await ImageService.ResizeAndStoreImage(path, filename);
        const category = await SaleService.categories.AddCategory(name, image_resized);
        return res.status(200).json(category);
    } catch (err) {
        throw err;
    }
}

async function DeleteCategory(req, res) {
    try {
        const { id } = req.params;
        await SaleService.categories.DeleteCategory(id);
        return res.status(200).json();
    } catch(err) {
        throw err;
    }
}

async function EditCategory(req, res) {
    try {
        const { id } = req.params;
        const { name, image } = req.body;
        const category = await SaleService.categories.EditCategory(name, image, id);
        return res.status(200).json(category);
    } catch (err) {
        throw err;
    }
}

const Categories = {
    AddCategory,
    DeleteCategory,
    EditCategory
};

export default Categories;