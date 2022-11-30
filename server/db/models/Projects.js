'use strict';

import { Model, Sequelize } from "sequelize";

const Projects = (sequelize, DataTypes) => {
    class Projects extends Model {
        static associations(models) {

        }
    }

    Projects.init({
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
        Date: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: "Projects"
    });
    return Projects;
};

export default Projects;