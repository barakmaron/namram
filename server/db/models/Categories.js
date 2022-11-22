'use strict';
import { Model } from 'sequelize';

const Categories = (sequelize, DataTypes) => {
    class Categories extends Model {
        static associations(models) {

        }
    }

    Categories.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        }, 
        Name: {
            type: DataTypes.STRING
        },
        Image: {
            type: DataTypes.STRING
        }, 
        Type: {
            type: DataTypes.ENUM("Rental", "Sale")
        }
    }, {
        sequelize,
        modelName: "Categories"
    });

    return Categories;
};

export default Categories;