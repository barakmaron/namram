import CategoriesService from '../services/CategoriesService.js';
import { StatusCode } from 'status-code-enum';

async function AddCategory(req, res, next) {
    try {
        const { name, filesNames } = req.body;
        const category = await CategoriesService.AddCategory(name, filesNames, req.baseUrl);
        return res.status(StatusCode.SuccessOK).json(category);
    } catch (err) {
        next(err);
    }
}

async function DeleteCategory(req, res, next) {
    try {
        const { id } = req.params;
        await CategoriesService.DeleteCategory(id);
        return res.status(StatusCode.SuccessOK).json();
    } catch(err) {
        next(err);
    }
}

async function EditCategory(req, res, next) {
    try {
        const { id } = req.params;
        const { name } = req.body;
        await CategoriesService.EditCategory(name, id);
        return res.status(StatusCode.SuccessOK).json();
    } catch (err) {
        next(err);
    }
}

async function GetCategory(req, res, next) {
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
        return res.status(StatusCode.SuccessOK).json(category);
    } catch (err) {
        next(err);
    }
}

const Categories = {
    AddCategory,
    DeleteCategory,
    EditCategory,
    GetCategory
};

export default Categories;