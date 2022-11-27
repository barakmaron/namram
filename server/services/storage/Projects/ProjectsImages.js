import { ProjectsImagesModel } from "../../../db/models/index.js";

async function GetImageById(id) {
    return await ProjectsImagesModel.findOne({
        where: {
            id: id
        }
    });
}

async function AddImage(image, project_id) {
    return ProjectsImagesModel.create({
        Image: image,
        ProjectId: project_id
    });
}

async function DeleteImages(project_id) {
    return await ProjectsImagesModel.destroy({
        where: {
            ProjectId: project_id
        }
    });
}

async function DeleteImage(image_id) {
    return await ProjectsImagesModel.destroy({
        where: {
            id: image_id
        }
    });
}

const ProjectsImagesDB = {
    AddImage,
    DeleteImages,
    GetImageById,
    DeleteImage
};

export default ProjectsImagesDB;