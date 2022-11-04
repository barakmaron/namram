import { ProductPropsModel, ProductsImagesModel, ProductsModel, SaleProductsModel } from "../../../db/models/index.js";

async function AddProduct(id, name, serial_number, text, price, images, props) {
    const product = await ProductsModel.create({
        Name: name,
        Text: text
    });
    const products_images = images.map((image) => ProductsImagesModel.create({
        Image: image,
        ProductId: product.id
    }));
    const props_promises = props.map(({ name, value }) => ProductPropsModel.create({
        PropName: name,
        Value: value,
        ProductId: product.id
    }));
    const sale_product = SaleProductsModel.create({
        SerialNumber: serial_number,
        Price: price,
        ProductId: product.id,
        SaleCategoryId: id
    });
    const [sale_product_row] = await Promise.all([sale_product, ...props_promises, ...products_images]);
    return GetProductById(sale_product_row.id);
}

async function GetProductById(id) {
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

async function DeleteProduct(id) {
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
    SaleProductsModel.destroy({
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

const SaleProductsDB = {
    AddProduct,
    GetProductById,
    DeleteProduct,
    PatchPrice,
    PatchName
};

export default SaleProductsDB;