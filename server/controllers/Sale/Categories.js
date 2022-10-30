import SaleCategoriesService from '../../services/SaleService/Categories.js';

async function AddCategory(req, res) {
    try {
        const { name, image } = req.body;
        const category = await SaleCategoriesService.AddCategory(name, image);
        return res.status(200).json(category);
    } catch (err) {
        throw err;
    }
}

const Categories = {
    AddCategory
};

export default Categories;