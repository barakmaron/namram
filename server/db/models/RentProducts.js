'use strict';

import { Model } from 'sequelize';

const RentProducts = (sequelize, DataTypes) => {
    class RentProducts extends Model {
        static associations(models) {

        }
    }

    RentProducts.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        SerialNumber: {
            type: DataTypes.INTEGER
        },
        DayPrice: {
            type: DataTypes.INTEGER
        },
        WeekPrice: {
            type: DataTypes.INTEGER
        },
        MonthPrice: {
            type: DataTypes.INTEGER
        }
    }, {
        sequelize,
        modelName: "RentProducts"
    });

    return RentProducts;
};

export default RentProducts;