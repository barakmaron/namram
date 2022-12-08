'use strict';

import { Model } from "sequelize";

const ProductPartsDiagram = (sequelize, DataTypes) => {
    class ProductPartsDiagram extends Model {
        static associations(models) {

        }
    }

    ProductPartsDiagram.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        ModelName: {
            type: DataTypes.STRING
        },
        Image: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        timestamps: false,
        modelName: "ProductPartsDiagram"
    });
    return ProductPartsDiagram;
};

export default ProductPartsDiagram;