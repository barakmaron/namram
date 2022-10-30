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
        PhoneNumber: {
            type: DataTypes.STRING
        },
        IdNumber: {
            type: DataTypes.STRING
        },
        CompanyName: {
            type: DataTypes.STRING
        },
    }, {
        sequelize,
        modelName: "Customers"
    });

    return Customers;
};

export default Customers;