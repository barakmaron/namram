
const AddPart = {
    diagram_id: {
        notEmpty: true,
        type: "string",
        minLength: 36
    },
    serial_number: {
        notEmpty: true,
        type: "integer",
        minLength: 3
    },
    name_english: {
        notEmpty: true,
        type: "string",
        minLength: 3
    },
    name_hebrew: {
        notEmpty: true,
        type: "string",
        minLength: 3
    },
    price: {
        notEmpty: true,
        type: "float",
        minLength: 1
    },
    count: {
        notEmpty: true,
        type: "integer",
        minLength: 1
    }
};

const DeletePart = {
    id: {
        notEmpty: true,
        type: "string",
        minLength: 36
    },
};

const PatchPart = {
    id: {
        notEmpty: true,
        type: "string",
        minLength: 36
    },
    field_name: {
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

const ProductsSparePartsSchemas = {
    AddPart,
    DeletePart,
    PatchPart
};

export default ProductsSparePartsSchemas;