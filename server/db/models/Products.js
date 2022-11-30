'use strict';
import { Model } from "sequelize";

const Products = (sequelize, DataTypes) => {
    class Products extends Model {
        static associations(models) {

        }
    }

    Products.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        Name: {
            type: DataTypes.STRING
        },
        Text: {
            type: DataTypes.TEXT('long')
        },
        SerialNumber: {
            type: DataTypes.INTEGER
        }
    }, {
        sequelize,
        modelName: "Products"
    });
    return Products;
};

export default Products;