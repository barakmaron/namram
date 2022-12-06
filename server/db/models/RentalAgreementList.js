'use strict';

import { Model } from 'sequelize';

const RentalAgreementList = (sequelize, DataTypes) => {
    class RentalAgreementList extends Model {
        static associations(models) {

        }
    }

    RentalAgreementList.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        ProductId: {
            type: DataTypes.UUID
        },
        ProductPartsDiagramId: {
            type: DataTypes.UUID
        }
    }, {
        sequelize,
        modelName: "RentalAgreementList",
        indexes: [{
            name: 'unique_index',
            type:"unique",
            fields: ['ProductId', 'ProductPartsDiagramId']
        }]
    });

    return RentalAgreementList;
};

export default RentalAgreementList;