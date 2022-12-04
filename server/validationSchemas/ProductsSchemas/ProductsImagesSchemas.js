import ErrorMessages from "../ErrorMessages.js";

const AddImages = {
    product_id: {
        isLength: {
            options: { 
                min: 36
            }
        },
        errorMessage: ErrorMessages.id,
    }
};

const DeleteImage = {
    id: {
        isLength: {
            options: { 
                min: 36
            }
        },
        errorMessage: ErrorMessages.id,
    },
};

const ProductsImagesSchemas = {
    AddImages,
    DeleteImage
};

export default ProductsImagesSchemas;