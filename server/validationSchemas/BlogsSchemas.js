const AddBlog = {    
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
};

const DeleteBlog = {    
    id: {
        notEmpty: true,
        type: "string",
        minLength: 36,
        in: ['params']
    }
};

const PatchBlog = {   
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

const BlogsSchemas = {
    AddBlog,
    DeleteBlog,
    PatchBlog
};

export default BlogsSchemas;