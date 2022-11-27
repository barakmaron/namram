import { ProjectsImagesModel, ProjectsModel } from "../../../db/models/index.js";

async function GetAllProjects() {
    return await ProjectsModel.findAll({
        include: ProjectsImagesModel
    })
}

async function GetProjectById(id) {
    return await ProjectsModel.findOne({
        where: {
            id: id
        },
        include: ProjectsImagesModel
    });
}

async function AddProject(title, text, date) {
    return await ProjectsModel.create({
        Title: title,
        Text: text,
        Date: date
    });
}

async function DeleteProject(id) {
    return await ProjectsModel.destroy({
        where: {
            id: id
        }
    });
}

async function PatchProject(id, title, text) {
    return await ProjectsModel.update({
        Title: title,
        Text: text
    }, {
        where: {
            id: id
        }
    });
}

const ProjectsDB = {
    GetAllProjects,
    GetProjectById,
    AddProject,
    DeleteProject,
    PatchProject
};

export default ProjectsDB;