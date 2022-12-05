import ErrorMessages from "../ErrorMessages.js";

const AddServiceReport = {    
    product_id: {
        isLength: {
            options: { 
                min: 36
            }
        },
        errorMessage: ErrorMessages.id
    },
    Problem: {
        isLength: {
            options: { 
                min: 3
            }
        },
        errorMessage: ErrorMessages.text
    }
};


const GetServiceReport = {    
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

const PatchServiceReport = {   
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

const ServiceReportsSchemas = {
    AddServiceReport,
    GetServiceReport,
    PatchServiceReport
};

export default ServiceReportsSchemas;