import ProductImagesActions from '../../actions/actionConstants/Products/ImagesActionConstants';
import reducerUtilities from '../reducerUtilities';

function AddImages(state, payload, product_type) {
    const { product_id, category_id, images } = payload;
    const { object: category, filtered_array: filtered_categories } = reducerUtilities.destructorArray(state.categories, category_id);
    const { object: product, filtered_array: filtered_products } = reducerUtilities.destructorArray(category[product_type], product_id, "ProductId");
    const images_parsed = images.images.map((image) => ({
        id: `temp-image`,
        TempUrl: image
    }));
    product.Product.ProductsImages = [ ...product.Product.ProductsImages, ...images_parsed ];
    category[product_type] = [ ...filtered_products, product ];
    return { 
        ...state, 
        categories: [ ...filtered_categories, category ]
    };
}

function UpdateImages(state, payload, product_type) {
    const { product_id, category_id, images } = payload;
    const { object: category, filtered_array: filtered_categories } = reducerUtilities.destructorArray(state.categories, category_id);
    const { object: product, filtered_array: filtered_products } = reducerUtilities.destructorArray(category[product_type], product_id, "ProductId");
    const { filtered_array: filtered_images } = reducerUtilities.destructorArray(product.Product.ProductsImages, "temp-image");
    product.Product.ProductsImages = images.length !== 0 ? [ ...filtered_images, ...images ] : [ ...filtered_images ];
    category[product_type] = [ ...filtered_products, product ];
    return { 
        ...state, 
        categories: [ ...filtered_categories, category ]
    };
}

function DeleteImage(state, payload, product_type) {
    const { product_id, category_id, image_id } = payload;
    const { object: category, filtered_array: filtered_categories } = reducerUtilities.destructorArray(state.categories, category_id);
    const { object: product, filtered_array: filtered_products } = reducerUtilities.destructorArray(category[product_type], product_id, "ProductId");
    const { filtered_array: filtered_images } = reducerUtilities.destructorArray(product.Product.ProductsImages, image_id);
    product.Product.ProductsImages = [ ...filtered_images ];
    category[product_type] = [ ...filtered_products, product ];
    return { 
        ...state, 
        categories: [ ...filtered_categories, category ]
    };
}


const ProductImagesFunctions = {
    [ProductImagesActions.ADD_PRODUCT_IMAGE]: AddImages,
    [ProductImagesActions.UPDATE_PRODUCT_IMAGE]: UpdateImages,
    [ProductImagesActions.DELETE_PRODUCT_IMAGE]: DeleteImage
};

export default ProductImagesFunctions;