import ErrorMessages from "../ErrorMessages.js";

const AddProject = {    
    Title: {        
        isLength: {
            options: { 
                min: 3
            }
        },
        errorMessage: ErrorMessages.title,
    },
    Date: {
        isLength: {
            options: { 
                min: 10
            }
        },
        errorMessage: ErrorMessages.date,
    },
    Text: {
        isLength: {
            options: { 
                min: 3
            }
        },
        errorMessage: ErrorMessages.text,
    }
};

const DeleteProject = {    
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

const PatchProject = {   
    id: {
        isLength: {
            options: { 
                min: 36
            }
        },
        errorMessage: ErrorMessages.id,
        in: ['params']
    },
    Title: {        
        isLength: {
            options: { 
                min: 3
            }
        },
        errorMessage: ErrorMessages.title,
    },
    Text: {
        isLength: {
            options: { 
                min: 3
            }
        },
        errorMessage: ErrorMessages.text,
    }
}

const ProjectsSchemas = {
    AddProject,
    DeleteProject,
    PatchProject
};

export default ProjectsSchemas;