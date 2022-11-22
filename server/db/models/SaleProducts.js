'use strict';

import { Model } from 'sequelize';

const SaleProducts = (sequelize, DataTypes) => {
    class SaleProducts extends Model {
        static associations(models) {

        }
    }

    SaleProducts.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        Price: {
            type: DataTypes.INTEGER
        }
    }, {
        sequelize,
        modelName: "SaleProducts"
    });

    return SaleProducts;
};

export default SaleProducts;