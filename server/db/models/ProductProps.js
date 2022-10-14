'use strict';

import { Model } from "sequelize";

const ProductProps = (sequelize, DataTypes) => {
    class ProductProps extends Model {
        static associations(models) {

        }
    }

    ProductProps.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        PropName: {
            type: DataTypes.STRING
        },
        Value: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: "ProductProps"
    });
    return ProductProps;
};

export default ProductProps;