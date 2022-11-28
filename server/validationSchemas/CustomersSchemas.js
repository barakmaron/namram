const DeleteCustomer = {    
    id: {
        notEmpty: true,
        type: "string",
        minLength: 36,
        in: ['params']
    }
};

const PatchCustomer = {   
    id: {
        notEmpty: true,
        type: "string",
        minLength: 36,
        in: ['params']
    },
    param_name: {        
        notEmpty: true,
        type: "string",
        minLength: 3
    },
    value: {        
        notEmpty: true,
        type: "string",
        minLength: 3
    }
}

const CustomersSchemas = {
    DeleteCustomer,
    PatchCustomer
};

export default CustomersSchemas;