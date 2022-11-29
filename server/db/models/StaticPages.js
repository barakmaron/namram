'use strict';

import { Model } from 'sequelize';

const StaticPages = (sequelize, DataTypes) => {
    class StaticPages extends Model {
        static associations(models) {

        }
    }

    StaticPages.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        PageRoute: {
            type: DataTypes.STRING,
            allowNull: false
        },
        DisplayType: {
            type: DataTypes.ENUM("PRODUCTS", "CATEGORIES")
        }
    }, {
        sequelize,
        modelName: "StaticPages"
    });

    return StaticPages;
};

export default StaticPages;