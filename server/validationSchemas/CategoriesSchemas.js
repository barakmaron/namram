const AddCategory = {    
    name: {        
        notEmpty: true,
        type: "string",
        minLength: 3
    }
};

const DeleteCategory = {    
    id: {
        notEmpty: true,
        type: "string",
        minLength: 36,
        in: ['params']
    }
};

const PatchCategory = {   
    id: {
        notEmpty: true,
        type: "string",
        minLength: 36,
        in: ['params']
    },
    name: {        
        notEmpty: true,
        type: "string",
        minLength: 3
    }
}

const CategoriesSchemas = {
    AddCategory,
    DeleteCategory,
    PatchCategory
};

export default CategoriesSchemas;