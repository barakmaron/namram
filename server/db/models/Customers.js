'use strict';

import { Model } from 'sequelize';

const Customers = (sequelize, DataTypes) => {
    class Customers extends Model {
        static associations(models) {

        }
    }

    Customers.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        FullName: {
            type: DataTypes.STRING
        },
        Address: {
            type: DataTypes.STRING
        },
        PhoneNumber: {
            type: DataTypes.STRING
        },
        IdNumber: {
            type: DataTypes.STRING
        },
        CompanyName: {
            type: DataTypes.STRING
        },
        HomePhoneNumber: {
            type: DataTypes.STRING
        },
        FaxNumber: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        timestamps: false,
        modelName: "Customers"
    });

    return Customers;
};

export default Customers;