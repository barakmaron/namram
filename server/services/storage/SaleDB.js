import { SaleCategoriesModel, ProductPropsModel, ProductsImagesModel, ProductsModel, SaleProductsModel } from "../../db/models/index.js";

async function GetCategoriesWithProducts() {
    return SaleCategoriesModel.findAll({
        include: [{
            model: SaleProductsModel,
            include: {
                model: ProductsModel,
                include: [ProductPropsModel, ProductsImagesModel]
            }
        }]
    });
}

const SaleDB = {
    GetCategoriesWithProducts
};

export default SaleDB;