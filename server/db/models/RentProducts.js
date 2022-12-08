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
        DayPrice: {
            type: DataTypes.INTEGER
        },
        WeekPrice: {
            type: DataTypes.INTEGER
        },
        MonthPrice: {
            type: DataTypes.INTEGER
        },
        HourClock: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true
        },
        Display: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        sequelize,
        timestamps: false,
        modelName: "RentProducts"
    });

    return RentProducts;
};

export default RentProducts;