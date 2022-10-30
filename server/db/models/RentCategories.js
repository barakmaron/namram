'use strict';
import { Model } from 'sequelize';

const RentCategories = (sequelize, DataTypes) => {
    class RentCategories extends Model {
        static associations(models) {

        }
    }

    RentCategories.init({
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
        modelName: "RentCategories"
    });

    return RentCategories;
};

export default RentCategories;