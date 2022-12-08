'use strict';

import { Model } from 'sequelize';

const PartsChanged = (sequelize, DataTypes) => {
    class PartsChanged extends Model {
        static associations(models) {

        }
    }

    PartsChanged.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        }
    }, {
        sequelize,
        timestamps: false,
        modelName: "PartsChanged"
    });

    return PartsChanged;
};

export default PartsChanged;