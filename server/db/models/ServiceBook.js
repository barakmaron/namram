'use strict';

import { Model } from 'sequelize';

const ServiceBook = (sequelize, DataTypes) => {
    class ServiceBook extends Model {
        static associations(models) {

        }
    }

    ServiceBook.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        }
    }, {
        sequelize,
        modelName: "ServiceBook"
    });

    return ServiceBook;
};

export default ServiceBook;