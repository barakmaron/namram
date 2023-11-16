import ProductPropsAction from '../../actions/actionConstants/Products/PropsActionConstants';
import reducerUtilities from '../reducerUtilities';

function AddProp(state, payload, product_type){
    const { product_id, category_id } = payload;
    const { object: category, filtered_array: filtered_categories } = reducerUtilities.destructorArray(state.categories, category_id);
    const { object: product, filtered_array: filtered_products } = reducerUtilities.destructorArray(category[product_type], product_id, "ProductId");
    product.Product.ProductProps = [...product.Product.ProductProps, {
        id: "temp-prop",
        PropName: "New Prop",
        Value: "New Prop"
    }];
    category[product_type] = [ ...filtered_products, product ];
    return { 
        ...state, 
        categories: [ ...filtered_categories, category ]
    };
}

function UpdateProp(state, payload, product_type) {
    const { product_id, category_id, prop } = payload;
    const { object: category, filtered_array: filtered_categories } = reducerUtilities.destructorArray(state.categories, category_id);
    const { object: product, filtered_array: filtered_products } = reducerUtilities.destructorArray(category[product_type], product_id, "ProductId");
    const { filtered_array: filtered_props } = reducerUtilities.destructorArray(product.Product.ProductProps, 'temp-prop');
    product.Product.ProductProps = prop.id ? [...filtered_props, prop] : [ ...filtered_props ];
    category[product_type] = [ ...filtered_products, product ];
    return { 
        ...state, 
        categories: [ ...filtered_categories, category ]
    };
}

function PatchProp(state, payload, product_type) {
    const { product_id, category_id, name, value, prop_id } = payload;
    const { object: category, filtered_array: filtered_categories } = reducerUtilities.destructorArray(state.categories, category_id);
    const { object: product, filtered_array: filtered_products } = reducerUtilities.destructorArray(category[product_type], product_id, "ProductId");
    const { object: prop, filtered_array: filtered_props } = reducerUtilities.destructorArray(product.Product.ProductProps, prop_id);
    prop[name] = value;
    product.Product.ProductProps = [...filtered_props, prop];
    category[product_type] = [ ...filtered_products, product ];
    return { 
        ...state, 
        categories: [ ...filtered_categories, category ]
    };
}

function DeleteProp(state, payload, product_type) {
    const { product_id, category_id, prop_id } = payload;
    const { object: category, filtered_array: filtered_categories } = reducerUtilities.destructorArray(state.categories, category_id);
    const { object: product, filtered_array: filtered_products } = reducerUtilities.destructorArray(category[product_type], product_id, "ProductId");
    const { filtered_array: filtered_props } = reducerUtilities.destructorArray(product.Product.ProductProps, prop_id);
    product.Product.ProductProps = [ ...filtered_props ];
    category[product_type] = [ ...filtered_products, product ];
    return { 
        ...state, 
        categories: [ ...filtered_categories, category ]
    };
}

const ProductPropsFunctions = {
    [ProductPropsAction.ADD_PRODUCT_PROP]: AddProp,
    [ProductPropsAction.UPDATE_PRODUCT_PROP]: UpdateProp,
    [ProductPropsAction.PATCH_PRODUCT_PROP]: PatchProp,
    [ProductPropsAction.DELETE_PRODUCT_PROP]: DeleteProp
};

export default ProductPropsFunctions;