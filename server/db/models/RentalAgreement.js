'use strict';

import { Model, Sequelize } from 'sequelize';

const RentalAgreement = (sequelize, DataTypes) => {
    class RentalAgreement extends Model {
        static associations(models) {

        }
    }

    RentalAgreement.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
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
        modelName: "RentalAgreement"
    });

    return RentalAgreement;
};

export default RentalAgreement;