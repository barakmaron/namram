import { CategoriesModel, ProductPropsModel, ProductDiagramsListModel, ProductsImagesModel, ProductsModel, SaleProductsModel, ProductPartsDiagramModel, SparePartsModel } from "../../db/models/index.js";

async function GetAllWithNested() {
    return await CategoriesModel.findAll({
        where: {
            Type: "Sale"
        },
        include: [{
            model: SaleProductsModel,
            include: {
                model: ProductsModel,
                include: [ProductPropsModel, ProductsImagesModel, {
                    model: ProductDiagramsListModel,
                    include: {
                        model: ProductPartsDiagramModel,
                        include: SparePartsModel
                    }
                }]
            }
        }]
    });
}

const SaleDB = {
    GetAllWithNested
};

export default SaleDB;