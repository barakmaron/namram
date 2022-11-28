const AddImages = {    
    id: {        
        notEmpty: true,
        type: "string",
        minLength: 36
    }
};

const DeleteImage = {    
    image_id: {
        notEmpty: true,
        type: "string",
        minLength: 36,
        in: ['params']
    }
};


const ProjectsImagesSchemas = {
    AddImages,
    DeleteImage
};

export default ProjectsImagesSchemas;