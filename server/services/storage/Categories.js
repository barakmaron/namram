import Constants from "../../Constants.js";
import DbConstants from "../../db/DbConstants.js";
import { RentalProductsModel, SaleProductsModel, ProductPropsModel, ProductsModel, ProductsImagesModel, CategoriesModel } from "../../db/models/index.js";

async function GetCategoryById(id, product_type) {
    const type_condition = product_type.includes(Constants.PRODUCT_TYPE.SALE);
    return await CategoriesModel.findOne({
        where: {
            id: id
        },
        include:  [{
            model: type_condition ? SaleProductsModel : RentalProductsModel,
            include: {
                model: ProductsModel,
                include: [ProductPropsModel, ProductsImagesModel]
            }
        }]
    });
}

async function GetOnlyCategoryById(id) {
    return await CategoriesModel.findOne({
        where: {
            id: id
        }
    });
}

async function AddCategory(name, image, product_type) {
    const type_condition = product_type.includes(Constants.PRODUCT_TYPE.SALE);
    const type_enum = DbConstants.GetCategoryTypeEnum();
    const category = await CategoriesModel.create({
        Name: name,
        Image: image,
        Type: type_condition ? type_enum[1] : type_enum[0]
    }); 
    return await GetCategoryById(category.id, product_type); 
}

async function DeleteCategory(id) {
    return await CategoriesModel.destroy({
        where: {
            id: id
        }
    });
}

async function EditCategory(name, id) {
   return await CategoriesModel.update({
    Name: name
   }, {
    where: {
        id: id
    }
   });
}

const SaleCategoriesDB = {
    AddCategory,
    DeleteCategory,
    EditCategory,
    GetOnlyCategoryById
};

export default SaleCategoriesDB;