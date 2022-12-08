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
        }
    }, {
        sequelize,
        modelName: "RentalAgreementList"        
    });

    return RentalAgreementList;
};

export default RentalAgreementList;