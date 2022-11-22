import CategoriesService from '../services/CategoriesService.js';

async function AddCategory(req, res) {
    try {
        const { name } = req.body;
        const { path, filename } = req.file;
        const category = await CategoriesService.AddCategory(name, { 
            path, 
            filename 
        }, req.baseUrl);
        return res.status(200).json(category);
    } catch (err) {
        throw err;
    }
}

async function DeleteCategory(req, res) {
    try {
        const { id } = req.params;
        await CategoriesService.DeleteCategory(id);
        return res.status(200).json();
    } catch(err) {
        throw err;
    }
}

async function EditCategory(req, res) {
    try {
        const { id } = req.params;
        const { name } = req.body;
        await CategoriesService.EditCategory(name, id);
        return res.status(200).json();
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