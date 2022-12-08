import ErrorMessages from "../ErrorMessages.js";

const AddScheduledService = {
    product_id: {
        isLength: {
            options: { 
                min: 36
            }
        },
        errorMessage: ErrorMessages.id,
    },
    Name: {
        isLength: {
            options: { 
                min: 3
            }
        },
        errorMessage: ErrorMessages.name,
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

const DeleteScheduledService = {
    id: {
        isLength: {
            options: { 
                min: 36
            }
        },
        errorMessage: ErrorMessages.id,
        in: ["params"]
    },
};

const PatchScheduledService = {
    id: {
        isLength: {
            options: { 
                min: 36
            }
        },
        errorMessage: ErrorMessages.id,
    },
    param: {
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
                min: 1
            }
        },
        errorMessage: ErrorMessages.value
    }
};

const ProductsScheduledServiceSchema = {
    AddScheduledService,
    DeleteScheduledService,
    PatchScheduledService
};

export default ProductsScheduledServiceSchema;