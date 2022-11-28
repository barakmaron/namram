
const AddDiagram = {
    product_id: {
        notEmpty: true,
        type: "string",
        minLength: 36
    },
    model_name: {
        notEmpty: true,
        type: "string",
        minLength: 3,
    }
};

const DeleteDiagram = {
    id: {
        notEmpty: true,
        type: "string",
        minLength: 36
    }
}

const PatchDiagram = {
    id: {
        notEmpty: true,
        type: "string",
        minLength: 36,
        in: ["params"]
    },
    value: {
        notEmpty: true,
        type: "string",
        minLength: 3,
    }
}

const ProductsDiagramSchemas = {
    AddDiagram,
    DeleteDiagram,
    PatchDiagram
};

export default ProductsDiagramSchemas;