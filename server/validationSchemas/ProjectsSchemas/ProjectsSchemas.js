const AddProject = {    
    Title: {        
        notEmpty: true,
        type: "string",
        minLength: 3
    },
    Date: {
        notEmpty: true,
        type: "string",
        minLength: 10
    },
    Text: {
        notEmpty: true,
        type: "string",
        minLength: 3
    }
};

const DeleteProject = {    
    id: {
        notEmpty: true,
        type: "string",
        minLength: 36,
        in: ['params']
    }
};

const PatchProject = {   
    id: {
        notEmpty: true,
        type: "string",
        minLength: 36,
        in: ['params']
    },
    Title: {        
        notEmpty: true,
        type: "string",
        minLength: 3
    },
    Text: {
        notEmpty: true,
        type: "string",
        minLength: 3
    }
}

const ProjectsSchemas = {
    AddProject,
    DeleteProject,
    PatchProject
};

export default ProjectsSchemas;