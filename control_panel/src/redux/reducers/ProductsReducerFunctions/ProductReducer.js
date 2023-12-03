import ProductsActions from '../../actions/actionConstants/Products/ProductsActionConstants';
import reducerUtilities from '../reducerUtilities';

function AddProduct(state, payload, product_type) {
    const new_product = payload.form;
    const { object: category, filtered_array: filtered_categories } = reducerUtilities.destructorArray(state.categories, payload.category_id);
    const { filtered_array: filtered_products } = reducerUtilities.destructorArray(category[product_type]);
    const new_products_arr = [ new_product, ...filtered_products ];
    category[product_type] = new_products_arr;
    return { 
        ...state, 
        categories: [ ...filtered_categories, category ]
    };
}

function UpdateProduct(state, payload, product_type) {
    const { id, product: new_product } = payload;
    const { object: category, filtered_array: filtered_categories } = reducerUtilities.destructorArray(state.categories, id);
    const { filtered_array: filtered_products } = reducerUtilities.destructorArray(category[product_type]);
    const new_products_arr = new_product.id  ? [ new_product, ...filtered_products ] : [ ...filtered_products ];
    category[product_type] = new_products_arr;
    return { 
        ...state, 
        categories: [ ...filtered_categories, category ]
    };
}

function DeleteProduct(state, payload, product_type) {
    const { category_id, product_id } = payload;
    const { object: category, filtered_array: filtered_categories } = reducerUtilities.destructorArray(state.categories, category_id);
    const { filtered_array: filtered_products } = reducerUtilities.destructorArray(category[product_type], product_id, "ProductId");
    category[product_type] = [ ...filtered_products];
    return { 
        ...state, 
        categories: [ ...filtered_categories, category ]
    };
}

function PatchProduct(state, payload, product_type) {
    const { category_id, product_id, param_name, value } = payload;
    const { object: category, filtered_array: filtered_categories } = reducerUtilities.destructorArray(state.categories, category_id);
    const { object: product, filtered_array: filtered_products } = reducerUtilities.destructorArray(category[product_type], product_id, "ProductId");
    ["Price", "Display", "HourClock"].some(to_test => param_name.includes(to_test)) ? 
    product[param_name] = value :
    product.Product[param_name] = value ;
    category[product_type] = [ ...filtered_products, product ];
    return { 
        ...state, 
        categories: [ ...filtered_categories, category ]
    };
}

const ProductFunctions = {
    [ProductsActions.ADD_PRODUCT]: AddProduct,
    [ProductsActions.UPDATE_PRODUCT]: UpdateProduct,
    [ProductsActions.DELETE_PRODUCT]: DeleteProduct,
    [ProductsActions.PATCH_PRODUCT]: PatchProduct
};

export default ProductFunctions;