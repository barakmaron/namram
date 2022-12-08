import Props from "./Props.js";
import Images from './Images.js';
import { ProductsImagesModel, ProductsModel, RentalProductsModel, ProductPropsModel, SaleProductsModel, RentalAgreementListModel, RentalAgreementModel, sequelize } from "../../../db/models/index.js";
import Diagrams from './Diagrams.js';
import SpareParts from './SpareParts.js';
import ScheduledService from './ScheduledService.js';
import Constants from '../../../Constants.js';
import { Op } from "sequelize";


async function AddProduct(id, name, serial_number, text, price, images, props, product_type, display, hour_clock) {
    const transaction = await sequelize.transaction();
    try {
        const type_condition = product_type.includes(Constants.PRODUCT_TYPE.SALE.toLocaleLowerCase());    
        const product = await ProductsModel.create({
            Name: name,
            Text: text,
            SerialNumber: serial_number,
        }, { transaction });
        const products_images = images.map((image) => ProductsImagesModel.create({
            Image: image,
            ProductId: product.id
        }, { transaction }));
        const props_promises = props.map(({ name, value }) => ProductPropsModel.create({
            PropName: name,
            Value: value,
            ProductId: product.id
        }, { transaction }));
        const typed_product = type_condition ? 
        SaleProductsModel.create({
            SerialNumber: serial_number,
            Price: price,
            ProductId: product.id,
            CategoryId: id
        }, { transaction }) :
        RentalProductsModel.create({
            DayPrice: price.DayPrice,
            WeekPrice: price.WeekPrice,
            MonthPrice: price.MonthPrice,
            ProductId: product.id,
            CategoryId: id,
            Display: display,
            HourClock: hour_clock ? hour_clock : null
        }, { transaction });
        const [product_row] = await Promise.all([typed_product, ...props_promises, ...products_images]);
        return type_condition ? 
        await GetSaleProductById(product_row.id) :
        await GetRentProductById(product_row.id);
    } catch (err) {
        await transaction.rollback();
        throw err;
    }
}


async function GetSaleProductById(id) {
    return await SaleProductsModel.findOne({
        where: {
            id: id
        },
        include: {
            model: ProductsModel,
            include: [ProductsImagesModel, ProductPropsModel]
        }
    });
}

async function GetRentProductById(id) {
    return await RentalProductsModel.findOne({
        where: {
            id: id
        },
        include: {
            model: ProductsModel,
            include: [ProductsImagesModel, ProductPropsModel]
        }
    });
}

async function GetProductById(id) {
    return await ProductsModel.findOne({
        where: {
            id: id
        },
        include: [ProductsImagesModel, ProductPropsModel]
    });
}


async function DeleteProduct(id, product_type) {
    const type_condition = product_type.includes(Constants.PRODUCT_TYPE.SALE);
    ProductPropsModel.destroy({
        where: {
            ProductId: id
        }
    });
    ProductsImagesModel.destroy({
        where: {
            ProductId: id
        }
    });
    type_condition ? SaleProductsModel.destroy({
        where: {
            ProductId: id
        }
    }) : RentalProductsModel.destroy({
        where: {
            ProductId: id
        }
    });
    return await ProductsModel.destroy({
        where: {
            id: id
        }
    });
}


async function PatchName(id, value) {
    return await ProductsModel.update({
        Name: value
    }, {
        where: {
            id: id
        }
    });
}

async function PatchPrice(id, value) {
    return await SaleProductsModel.update({
        Price: value
    }, {
        where: {
            ProductId: id
        }
    });
}

async function PatchRentProp(id, value, name) {
    return await RentalProductsModel.update({
        [name]: value
    }, {
        where: {
            ProductId: id
        }
    });
}

async function PatchText(product_id, text) {
    return await ProductsModel.update({
        Text: text
    }, {
        where: {
            id: product_id
        }
    });
}


async function PatchSerialNumber(product_id, SerialNumber) {
    return await ProductsModel.update({
        SerialNumber: SerialNumber
    }, {
        where: {
            id: product_id
        }
    });
}

async function GetRentProductWithRentalAgreements(rent_product_id, date){
    return await RentalProductsModel.findOne({
        where: {
            id: rent_product_id
        },
        include: [ProductsModel, {
            model: RentalAgreementListModel,            
            include: {
                model: RentalAgreementModel,
                where: {
                    StartDate: {
                        [Op.gte]: date
                    },
                    EndDate: {
                        [Op.ne]: null
                    }
                }
            }
        }]        
    });
}

const ProductsDB = {
    Props,
    Images,
    Diagrams,
    SpareParts,
    ScheduledService,
    AddProduct,
    DeleteProduct,
    PatchName,
    PatchPrice,
    PatchText,
    PatchSerialNumber,
    PatchRentProp,
    GetProductById,
    GetRentProductWithRentalAgreements
};

export default ProductsDB;