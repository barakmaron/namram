import ErrorMessages from "../ErrorMessages.js";

const AddPart = {
    diagram_id: {
        isLength: {
            options: { 
                min: 36
            }
        },
        errorMessage: ErrorMessages.id,
    },
    serial_number: {
        isLength: {
            options: { 
                min: 36
            }
        },
        errorMessage: ErrorMessages.serial_number
    },
    name_english: {
        isLength: {
            options: { 
                min: 3
            }
        },
        errorMessage: ErrorMessages.name
    },
    name_hebrew: {
        isLength: {
            options: { 
                min: 3
            }
        },
        errorMessage: ErrorMessages.name
    },
    price: {
        isLength: {
            options: { 
                min: 1
            }
        },
        isFloat: true,
        errorMessage: ErrorMessages.price
    },
    count: {
        isLength: {
            options: { 
                min: 1
            }
        },
        isInt: true,
        errorMessage: ErrorMessages.value
    }
};

const DeletePart = {
    id: {
        isLength: {
            options: { 
                min: 36
            }
        },
        errorMessage: ErrorMessages.id,
    },
};

const PatchPart = {
    id: {
        isLength: {
            options: { 
                min: 36
            }
        },
        errorMessage: ErrorMessages.id,
    },
    field_name: {
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
        errorMessage: ErrorMessages.value,
    }
};

const ProductsSparePartsSchemas = {
    AddPart,
    DeletePart,
    PatchPart
};

export default ProductsSparePartsSchemas;