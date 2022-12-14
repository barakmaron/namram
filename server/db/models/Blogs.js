'use strict';

import { Model, Sequelize } from "sequelize";

const Blogs = (sequelize, DataTypes) => {
    class Blogs extends Model {
        static associations(models) {

        }
    }

    Blogs.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        Title: {
            type: DataTypes.STRING
        },
        Text: {
            type: DataTypes.TEXT('long')
        },
        Image: {
            type: DataTypes.STRING
        },
        Date: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    }, {
        sequelize,
        timestamps: false,
        modelName: "Blogs"
    });
    return Blogs;
};

export default Blogs;