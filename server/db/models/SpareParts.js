'use strict';

import { Model } from "sequelize";

const SpareParts = (sequelize, DataTypes) => {
    class SpareParts extends Model {
        static associations(models) {

        }
    }

    SpareParts.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        SerialNumber: {
            type: DataTypes.STRING
        },
        NameEnglish: {
            type: DataTypes.STRING
        },
        NameHebrew: {
            type: DataTypes.STRING
        },
        Price: {
            type: DataTypes.STRING
        },
        Count: {
            type: DataTypes.INTEGER.UNSIGNED
        }
    }, {
        sequelize,
        timestamps: false,
        modelName: "SpareParts"
    });
    return SpareParts;
};

export default SpareParts;