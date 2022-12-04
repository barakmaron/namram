import ErrorMessages from "../ErrorMessages.js";

const AddImages = {    
    id: {        
        isLength: {
            options: { 
                min: 36
            }
        },
        errorMessage: ErrorMessages.id,
        in: ['params']
    }
};

const DeleteImage = {    
    image_id: {
        isLength: {
            options: { 
                min: 36
            }
        },
        errorMessage: ErrorMessages.id,
        in: ['params']
    }
};


const ProjectsImagesSchemas = {
    AddImages,
    DeleteImage
};

export default ProjectsImagesSchemas;