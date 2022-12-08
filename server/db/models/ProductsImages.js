'use strict';
import { Model } from "sequelize";

const ProductsImages = (sequelize, DataTypes) => {
    class ProductsImages extends Model {
        static associations(models) {

        }
    }

    ProductsImages.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        }, 
        Image: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        timestamps: false,
        modelName: "ProductsImages"
    });
    return ProductsImages;
};

export default ProductsImages;