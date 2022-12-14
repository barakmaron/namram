'use strict';
import { Model, Sequelize } from 'sequelize';

const ScheduledService = (sequelize, DataTypes) => {
    class ScheduledService extends Model {
        static associations(models) {

        }
    }

    ScheduledService.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        Name: {
            type: DataTypes.STRING
        },
        Text: {
            type: DataTypes.TEXT('long')
        },
        Scheduled: {
            type: DataTypes.INTEGER
        },
        LastServiceDate: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
    }, {
        sequelize,
        timestamps: false,
        modelName: "ScheduledService"
    });
    return ScheduledService;
};

export default ScheduledService;