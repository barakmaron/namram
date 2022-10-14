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
        }
    }, {
        sequelize,
        modelName: "SpareParts"
    });
    return SpareParts;
};

export default SpareParts;