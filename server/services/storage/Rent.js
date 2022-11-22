import { CategoriesModel, ProductPropsModel, ProductsImagesModel, ProductsModel, RentalProductsModel, ProductPartsDiagramModel, SparePartsModel, RentalAgreementListModel, RentalAgreementModel } from "../../db/models/index.js";

async function GetAllCategoriesNested() {
    return await CategoriesModel.findAll({
        where: {
            Type: "Rental"
        },        
        include: [{
            model: RentalProductsModel,            
            include: {
                model: ProductsModel,
                include: [ProductPropsModel, ProductsImagesModel, {
                    model: ProductPartsDiagramModel,
                    include: SparePartsModel
                }]
            }
        }]
    });
}


const RentDB = {
    GetAllCategoriesNested
};

export default RentDB;