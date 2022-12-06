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
        }
    }, {
        sequelize,
        modelName: "ProductDiagramsList"
    });
    return ProductDiagramsList;
};

export default ProductDiagramsList;