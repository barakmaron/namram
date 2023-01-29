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
        SerialNumber: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            unique: true,
            key: "SerialNumber",
            allowNull: false
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
        Location: {
            type: DataTypes.STRING
        },
        StartFuelCount: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        StartFuelPrice: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0
        }, 
        EndFuelCount: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        EndFuelPrice: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0
        }, 
        StartTransportCount: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        StartTransportPrice: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0
        },        
        EndTransportCount: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        EndTransportPrice: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0
        },  
        StartSignature: {
            type: DataTypes.STRING
        },
        EndSignature: {
            type: DataTypes.STRING,
            allowNull: true
        }   
    }, {
        initialAutoIncrement: 20000,
        sequelize,
        timestamps: false,
        modelName: "RentalAgreement"
    });

    return RentalAgreement;
};

export default RentalAgreement;