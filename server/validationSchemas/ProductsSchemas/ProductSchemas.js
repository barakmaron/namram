import ErrorMessages from "../ErrorMessages.js";

const AddProduct = {    
    category_id: {        
        isLength: {
            options: { 
                min: 36
            }
        },
        errorMessage: ErrorMessages.id
    },
    Name: {
        isLength: {
            options: { 
                min: 3
            }
        },
        errorMessage: ErrorMessages.product_name
    },
    SerialNumber: {
        isLength: {
            options: { 
                min: 1
            }
        },
        errorMessage: ErrorMessages.serial_number
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

const DeleteProduct = {    
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

const PatchProduct = {   
    id: {
        isLength: {
            options: { 
                min: 36
            }
        },
        errorMessage: ErrorMessages.id,
        in: ['params']
    },
    param_name: {
        isLength: {
            options: { 
                min: 3
            }
        },
        errorMessage: ErrorMessages.param_name,
        in: ['body']
    },
    value: {
        isLength: {
            options: { 
                min: 1
            }
        },
        errorMessage: ErrorMessages.value,
        in: ['body']
    }
}

const ProductSchemas = {
    AddProduct,
    DeleteProduct,
    PatchProduct
};

export default ProductSchemas;