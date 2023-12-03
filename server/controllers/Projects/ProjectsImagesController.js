import ProjectsImagesService from "../../services/ProjectsServices/ProjectImagesService.js";
import { StatusCode } from 'status-code-enum';

async function AddImages(req, res, next) { 
    try {
        const { id } = req.params;
        const {filesNames} = req.body;
        const added_images = await ProjectsImagesService.AddImages(filesNames, id);
        return res.status(StatusCode.SuccessOK).json(added_images);
    } catch (err) {
        next(err);
    }
}

async function DeleteImage(req, res, next) {
    try {
        const { image_id } = req.params;
        await ProjectsImagesService.DeleteImage(image_id);
        return res.status(StatusCode.SuccessOK).json();
    } catch (err) {
        next(err);
    }
}

const ProjectsImagesController = {
    AddImages,
    DeleteImage
};

export default ProjectsImagesController;