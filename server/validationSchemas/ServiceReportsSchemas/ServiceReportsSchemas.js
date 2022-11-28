const AddServiceReport = {    
    product_id: {
        notEmpty: true,
        type: "string",
        minLength: 36
    },
    Problem: {
        notEmpty: true,
        type: "string",
        minLength: 3
    }
};


const GetServiceReport = {    
    id: {
        notEmpty: true,
        type: "string",
        minLength: 36,
        in: ['params']
    }
};

const PatchServiceReport = {   
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

const ServiceReportsSchemas = {
    AddServiceReport,
    GetServiceReport,
    PatchServiceReport
};

export default ServiceReportsSchemas;