'use strict';

import { Model } from "sequelize";

const ProductDiagramsList = (sequelize, DataTypes) => {
    class ProductDiagramsList extends Model {
        static associations(models) {

        }
    }

    ProductDiagramsList.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        }, 
        ProductId: {
            type: DataTypes.UUID
        },
        ProductPartsDiagramId: {
            type: DataTypes.UUID
        }
    }, {
        sequelize,
        timestamps: false,
        modelName: "ProductDiagramsList",
        indexes: [{
            name: 'unique_index',
            type:"unique",
            fields: ['ProductId', 'ProductPartsDiagramId']
        }]
    });
    return ProductDiagramsList;
};

export default ProductDiagramsList;