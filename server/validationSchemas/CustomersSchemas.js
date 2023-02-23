import ErrorMessages from "./ErrorMessages.js";

const AddCustomer = {
    FullName: {
        isLength: {
            options: { 
                min: 3
            }
        },
        errorMessage: ErrorMessages.full_name
    },
    Address: {
        isLength: {
            options: { 
                min: 3
            }
        },
        errorMessage: ErrorMessages.address
    }, 
    IdNumber: {
        isLength: {
            options: { 
                min: 8
            }
        },
        errorMessage: ErrorMessages.id_number
    },
    PhoneNumber: {
        isLength: {
            options: { 
                min: 8
            }
        },
        errorMessage: ErrorMessages.phone
    },
};

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
    PatchCustomer,
    AddCustomer
};

export default CustomersSchemas;