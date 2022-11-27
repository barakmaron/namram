import ProjectsImagesService from "../../services/ProjectsServices/ProjectImagesService.js";


async function AddImages(req, res) { 
    try {
        const { id } = req.params;
        const images = req.files.map((file) => ({
            path: file.path, 
            filename: file.filename 
        }));  
        const added_images = await ProjectsImagesService.AddImages(images, id);
        return res.status(200).json(added_images);
    } catch (err) {
        console.log(err);
    }
}

async function DeleteImage(req, res) {
    try {
        const { image_id } = req.params;
        await ProjectsImagesService.DeleteImage(image_id);
        return res.status(200).json();
    } catch (err) {
        console.log(err)
    }
}

const ProjectsImagesController = {
    AddImages,
    DeleteImage
};

export default ProjectsImagesController;