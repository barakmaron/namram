import { Op } from "sequelize";
import Constants from "../../Constants.js";
import DbConstants from "../../db/DbConstants.js";
import { RentalProductsModel, SaleProductsModel, ProductPropsModel, ProductsModel, ProductsImagesModel, CategoriesModel, ProductPartsDiagramModel, SparePartsModel, RentalAgreementListModel, RentalAgreementModel, ServiceReportsModel, PartsChangedModel, ProductDiagramsListModel } from "../../db/models/index.js";

async function GetCategoryById(id) {
    const category = await CategoriesModel.findOne({
        where: {
            id: id
        }
    });
    const type_enum = DbConstants.GetCategoryTypeEnum();
    const type_condition = category.Type === type_enum[1];
    return await CategoriesModel.findOne({
        where: {
            id: id
        },
        include:  [{
            model: type_condition ? SaleProductsModel : RentalProductsModel,
            include: {
                model: ProductsModel,
                include: [ProductPropsModel, ProductsImagesModel],
                order: "Name ASC"
            }
        }]
    });
}

async function GetRentCategory(id) {
    return await CategoriesModel.findOne({
        where: {
            id: id
        }, 
        include: {
            model: RentalProductsModel,
            include: [{
                model: ProductsModel,
                include: [ProductPropsModel, ProductsImagesModel, {
                    model: ProductDiagramsListModel,
                    include: {
                        model: ProductPartsDiagramModel,
                        include: SparePartsModel
                    }
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
        }
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
    const type_condition = product_type.includes(Constants.PRODUCT_TYPE.SALE.toLocaleLowerCase());
    const type_enum = DbConstants.GetCategoryTypeEnum();
    const category = await CategoriesModel.create({
        Name: name,
        Image: image,
        Type: type_condition ? type_enum[1] : type_enum[0]
    }); 
    return await GetCategoryById(category.id); 
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
    GetOnlyCategoryById,
    GetCategoryById,
    GetRentCategory
};

export default SaleCategoriesDB;