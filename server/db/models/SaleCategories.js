'use strict';
import { Model } from 'sequelize';

const SaleCategories = (sequelize, DataTypes) => {
    class SaleCategories extends Model {
        static associations(models) {

        }
    }

    SaleCategories.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        }, 
        Name: {
            type: DataTypes.STRING
        },
        Image: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: "SaleCategories"
    });

    return SaleCategories;
};

export default SaleCategories;