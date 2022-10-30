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
        Description: {
            type: DataTypes.STRING
        },
        Problem: {
            type: DataTypes.STRING
        },
        StartDate: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        EndDate: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: true
        }
    }, {
        sequelize,
        modelName: "ServiceReports"
    });

    return ServiceReports;
};

export default ServiceReports;