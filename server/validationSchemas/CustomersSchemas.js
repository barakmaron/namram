import ErrorMessages from "./ErrorMessages.js";

const DeleteCustomer = {    
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

const PatchCustomer = {   
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
    },
    value: {        
        isLength: {
            options: { 
                min: 3
            }
        },
        errorMessage: ErrorMessages.value,
    }
}

const CustomersSchemas = {
    DeleteCustomer,
    PatchCustomer
};

export default CustomersSchemas;