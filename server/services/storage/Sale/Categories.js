import { SaleCategoriesModel, SaleProductsModel, ProductPropsModel, ProductsModel, ProductsImagesModel } from "../../../db/models/index.js";

async function AddCategory(name, image) {
    const category = await SaleCategoriesModel.create({
        Name: name,
        Image: image
    });
    return await SaleCategoriesModel.findOne({
        where: {
            id: category.id
        },
        include:  [{
            model: SaleProductsModel,
            include: {
                model: ProductsModel,
                include: [ProductPropsModel, ProductsImagesModel]
            }
        }]
    });
}

async function DeleteCategory(id) {
    return await SaleCategoriesModel.destroy({
        where: {
            id: id
        }
    });
}

async function EditCategory(name, image, id) {
    return await SaleProductsModel.update({ 
        image,
        name
    }, {
        where: {
            id: id
        }
    });
}

const SaleCategoriesDB = {
    AddCategory,
    DeleteCategory,
    EditCategory
};

export default SaleCategoriesDB;