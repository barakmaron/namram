'use strict';

import { Model, Sequelize } from 'sequelize';

const ServiceReports = (sequelize, DataTypes) => {
    class ServiceReports extends Model {
        static associations(models) {

        }
    }

    ServiceReports.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        Problem: {
            type: DataTypes.STRING
        },
        Update: {
            type: DataTypes.STRING
        },
        StartDate: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        EndDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        ManHours: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {
        sequelize,
        modelName: "ServiceReports"
    });

    return ServiceReports;
};

export default ServiceReports;