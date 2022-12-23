import ErrorMessages from "../ErrorMessages.js";

const AddDiagram = {
    product_id: {
        isLength: {
            options: { 
                min: 36
            }
        },
        errorMessage: ErrorMessages.id,
    },
    model_name: {
        isLength: {
            options: { 
                min: 3
            }
        },
        errorMessage: ErrorMessages.model_name,        
    }    
};

const AddDiagramFromList = {
    id: {
        isLength: {
            options: { 
                min: 36
            }
        },
        errorMessage: ErrorMessages.id,
        in: ["params"]
    },
    product_id: {
        isLength: {
            options: { 
                min: 36
            }
        },
        errorMessage: ErrorMessages.id,
    },
}

const DeleteDiagram = {
    id: {
        isLength: {
            options: { 
                min: 36
            }
        },
        errorMessage: ErrorMessages.id,
    }
}

const DeleteDiagramFromProduct = {
    diagram_id: {
        isLength: {
            options: { 
                min: 36
            }
        },
        errorMessage: ErrorMessages.id,
        in: ["params"]
    },
    product_id: {
        isLength: {
            options: { 
                min: 36
            }
        },
        errorMessage: ErrorMessages.id,
        in: ["params"]
    },
}

const PatchDiagram = {
    id: {
        isLength: {
            options: { 
                min: 36
            }
        },
        errorMessage: ErrorMessages.id,
        in: ["params"]
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

const ProductsDiagramSchemas = {
    AddDiagram,
    AddDiagramFromList,
    DeleteDiagram,
    DeleteDiagramFromProduct,
    PatchDiagram
};

export default ProductsDiagramSchemas;