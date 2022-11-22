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

async function GetCategory(req, res) {
    try {
        const { id } = req.params;
        const { pdf, income } = req.query;
        let category, html_file;
        if(pdf) {
            res.set('Content-Type', 'text/html');
            if(income) {
                category = await CategoriesService.GetRentCategory(id);
                html_file = await CategoriesService.CreateRentalIncomeCategoryReport(category.toJSON());
                return res.send(html_file);
            }
            category = await CategoriesService.GetCategory(id);
            html_file = await CategoriesService.CreateCategoryReport(category.toJSON());            
            return res.send(html_file);
        }
        category = await CategoriesService.GetCategory(id);
        return res.status(200).json(category);
    } catch (err) {
        console.log(err);
    }
}

const Categories = {
    AddCategory,
    DeleteCategory,
    EditCategory,
    GetCategory
};

export default Categories;