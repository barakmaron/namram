import ErrorMessages from "./ErrorMessages.js";

const AddBlog = {    
    Title: {        
        isLength: {
            options: { 
                min: 3
            }
        },
        errorMessage: ErrorMessages.title
    },
    Text: {
        isLength: {
            options: { 
                min: 3
            }
        },
        errorMessage: ErrorMessages.text
    }
};

const DeleteBlog = {    
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

const PatchBlog = {   
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
        errorMessage: ErrorMessages.title
    },
    Text: {
        isLength: {
            options: { 
                min: 3
            }
        },
        errorMessage: ErrorMessages.text
    }
}

const BlogsSchemas = {
    AddBlog,
    DeleteBlog,
    PatchBlog
};

export default BlogsSchemas;