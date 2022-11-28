
const AddImages = {
    product_id: {
        notEmpty: true,
        type: "string",
        minLength: 36
    }
};

const DeleteImage = {
    id: {
        notEmpty: true,
        type: "string",
        minLength: 36
    },
};

const ProductsImagesSchemas = {
    AddImages,
    DeleteImage
};

export default ProductsImagesSchemas;