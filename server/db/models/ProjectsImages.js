'use strict';

import { Model } from "sequelize";

const ProjectsImages = (sequelize, DataTypes) => {
    class ProjectsImages extends Model {
        static associations(models) {

        }
    }

    ProjectsImages.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        Alt: {
            type: DataTypes.STRING
        },
        Image: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: "ProjectsImages"
    });
    return ProjectsImages;
};

export default ProjectsImages;