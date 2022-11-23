import { Op } from "sequelize";
import { CategoriesModel, ProductPropsModel, ProductsImagesModel, ProductsModel, RentalProductsModel, ProductPartsDiagramModel, SparePartsModel, RentalAgreementListModel, RentalAgreementModel, ServiceReportsModel, PartsChangedModel } from "../../db/models/index.js";

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

async function GetRentalProduct(id) {
    return await RentalProductsModel.findOne({
        where: {
            id: id
        },
        include: [{
            model: ProductsModel,
            include: [ProductPropsModel, ProductsImagesModel, {
                model: ProductPartsDiagramModel,
                include: SparePartsModel
            }]
        }, {
            model: RentalAgreementListModel,
            include: {
                model: RentalAgreementModel,
                where: {
                    EndDate: {
                        [Op.ne]: null
                    }
                }
            }
        }, {
            model: ServiceReportsModel,
            include: {
                model: PartsChangedModel,
                include: {
                    model: SparePartsModel
                }
            }
        }]
    });
}


const RentDB = {
    GetAllCategoriesNested,
    GetRentalProduct
};

export default RentDB;