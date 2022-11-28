
const AddProp = {
    product_id: {
        notEmpty: true,
        type: "string",
        minLength: 36
    }
};

const DeleteProp = {
    id: {
        notEmpty: true,
        type: "string",
        minLength: 36
    },
};

const PatchProp = {
    id: {
        notEmpty: true,
        type: "string",
        minLength: 36
    },
    name: {
        notEmpty: true,
        type: "string",
        minLength: 3
    },
    value: {
        notEmpty: true,
        type: "string",
        minLength: 3
    }
};

const ProductsPropsSchemas = {
    AddProp,
    DeleteProp,
    PatchProp
};

export default ProductsPropsSchemas;