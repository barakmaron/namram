import ErrorMessages from "./ErrorMessages.js";

const AddCategory = {    
    name: {        
        isLength: {
            options: { 
                min: 3
            }
        },
        errorMessage: ErrorMessages.category_name,
    }
};

const DeleteCategory = {    
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

const PatchCategory = {   
    id: {
        isLength: {
            options: { 
                min: 36
            }
        },
        errorMessage: ErrorMessages.id,
        in: ['params']
    },
    name: {        
        isLength: {
            options: { 
                min: 3
            }
        },
        errorMessage: ErrorMessages.category_name,
    }
}

const CategoriesSchemas = {
    AddCategory,
    DeleteCategory,
    PatchCategory
};

export default CategoriesSchemas;