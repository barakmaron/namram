'use strict';

import { Model } from "sequelize";

const Users = (sequelize, DataTypes) => {
    class Users extends Model {
        static associations(models) {

        }
    }

    Users.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        Email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        Password: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: "Users"
    });
    return Users;
};

export default Users;