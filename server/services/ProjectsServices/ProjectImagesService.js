import ImageService from "../ImageService.js";
import ProjectsImagesDB from "../storage/Projects/ProjectsImages.js";

async function AddImages(images, project_id) {
    return await Promise.all(images.map(image => ProjectsImagesDB.AddImage(image, project_id)));
}

async function DeleteImages(images, project_id) {
    const delete_from_server = images.map(image => ImageService.DeleteStoredImages(image.Image));
    return await Promise.all([ProjectsImagesDB.DeleteImages(project_id), ...delete_from_server]);
}
async function DeleteImage(image_id) {
    const image = await ProjectsImagesDB.GetImageById(image_id);
    const delete_from_server = ImageService.DeleteStoredImages(image.Image);
    const delete_from_db = ProjectsImagesDB.DeleteImage(image_id);
    return [await Promise.all([delete_from_db, delete_from_server])];
}

const ProjectsImagesService = {
    AddImages,
    DeleteImages,
    DeleteImage
};

export default ProjectsImagesService;