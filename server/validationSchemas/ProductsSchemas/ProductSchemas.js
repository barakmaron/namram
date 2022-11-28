const AddProduct = {    
    category_id: {        
        notEmpty: true,
        type: "string",
        minLength: 36
    },
    Name: {
        notEmpty: true,
        type: "string",
        minLength: 3
    },
    SerialNumber: {
        notEmpty: true,
        type: "string",
        minLength: 2
    },
    Text: {
        notEmpty: true,
        type: "string",
        minLength: 3
    }
};

const DeleteProduct = {    
    id: {
        notEmpty: true,
        type: "string",
        minLength: 36,
        in: ['query']
    }
};

const PatchProduct = {   
    id: {
        notEmpty: true,
        type: "string",
        minLength: 36,
        in: ['query']
    },
    param_name: {
        notEmpty: true,
        type: "string",
        minLength: 3,
        in: ['body']
    },
    value: {
        notEmpty: true,
        minLength: 2,
        in: ['body']
    }
}

const ProductSchemas = {
    AddProduct,
    DeleteProduct,
    PatchProduct
};

export default ProductSchemas;