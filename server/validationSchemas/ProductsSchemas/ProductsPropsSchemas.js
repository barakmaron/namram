import ErrorMessages from "../ErrorMessages.js";

const AddProp = {
    product_id: {
        isLength: {
            options: { 
                min: 36
            }
        },
        errorMessage: ErrorMessages.id,
    }
};

const DeleteProp = {
    id: {
        isLength: {
            options: { 
                min: 36
            }
        },
        errorMessage: ErrorMessages.id,
    },
};

const PatchProp = {
    id: {
        isLength: {
            options: { 
                min: 36
            }
        },
        errorMessage: ErrorMessages.id,
    },
    name: {
        isLength: {
            options: { 
                min: 3
            }
        },
        errorMessage: ErrorMessages.param_name,
    },
    value: {
        isLength: {
            options: { 
                min: 3
            }
        },
        errorMessage: ErrorMessages.value
    }
};

const ProductsPropsSchemas = {
    AddProp,
    DeleteProp,
    PatchProp
};

export default ProductsPropsSchemas;