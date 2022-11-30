import ProductSparePartsActions from '../../actions/actionConstants/Products/SparePartsActionConstants';
import reducerUtilities from '../reducerUtilities';

function AddPart(state, payload, product_type) {
    const { product_id, category_id, diagram_id, part_from } = payload;
    const { object: category, filtered_array: filtered_categories } = reducerUtilities.destructorArray(state.categories, category_id);
    const { object: product, filtered_array: filtered_products } = reducerUtilities.destructorArray(category[product_type], product_id, "ProductId");
    const { object: diagram, filtered_array: filtered_diagrams } = reducerUtilities.destructorArray(product.Product.ProductPartsDiagrams, diagram_id);
    const new_part = {
        id: 'temp-part',
        ...part_from
    };
    diagram.SpareParts = [ ...diagram?.SpareParts, new_part ];
    product.Product.ProductPartsDiagrams = [ ...filtered_diagrams, diagram ];
    category[product_type] = [ ...filtered_products, product ];
    return { 
        ...state, 
        categories: [ ...filtered_categories, category ]
    };
}

function UpdatePart(state, payload, product_type) {
    const { product_id, category_id, diagram_id, new_part } = payload;
    const { object: category, filtered_array: filtered_categories } = reducerUtilities.destructorArray(state.categories, category_id);
    const { object: product, filtered_array: filtered_products } = reducerUtilities.destructorArray(category[product_type], product_id, "ProductId");
    const { object: diagram, filtered_array: filtered_diagrams } = reducerUtilities.destructorArray(product.Product.ProductPartsDiagrams, diagram_id);
    const { filtered_array: filtered_spare_parts } = reducerUtilities.destructorArray(diagram.SpareParts, "temp-part");
    diagram.SpareParts = [ ...filtered_spare_parts , new_part ];
    product.Product.ProductPartsDiagrams = [ ...filtered_diagrams, diagram ];
    category[product_type] = [ ...filtered_products, product ];
    return { 
        ...state, 
        categories: [ ...filtered_categories, category ]
    };
}

function PatchPart(state, payload, product_type) {
    const { product_id, category_id, diagram_id, part_id, field_name, value } = payload;
    const { object: category, filtered_array: filtered_categories } = reducerUtilities.destructorArray(state.categories, category_id);
    const { object: product, filtered_array: filtered_products } = reducerUtilities.destructorArray(category[product_type], product_id, "ProductId");
    const { object: diagram, filtered_array: filtered_diagrams } = reducerUtilities.destructorArray(product.Product.ProductPartsDiagrams, diagram_id);
    const { object: part, filtered_array: filtered_spare_parts } = reducerUtilities.destructorArray(diagram.SpareParts, part_id);
    part[field_name] = value;
    diagram.SpareParts = [ ...filtered_spare_parts , part ];
    product.Product.ProductPartsDiagrams = [ ...filtered_diagrams, diagram ];
    category[product_type] = [ ...filtered_products, product ];
    return { 
        ...state, 
        categories: [ ...filtered_categories, category ]
    };
}

function DeletePart(state, payload, product_type) {
    const { product_id, category_id, diagram_id, part_id } = payload;
    const { object: category, filtered_array: filtered_categories } = reducerUtilities.destructorArray(state.categories, category_id);
    const { object: product, filtered_array: filtered_products } = reducerUtilities.destructorArray(category[product_type], product_id, "ProductId");
    const { object: diagram, filtered_array: filtered_diagrams } = reducerUtilities.destructorArray(product.Product.ProductPartsDiagrams, diagram_id);
    const { filtered_array: filtered_spare_parts } = reducerUtilities.destructorArray(diagram.SpareParts, part_id);
    diagram.SpareParts = [ ...filtered_spare_parts ];
    product.Product.ProductPartsDiagrams = [ ...filtered_diagrams, diagram ];
    category[product_type] = [ ...filtered_products, product ];
    return { 
        ...state, 
        categories: [ ...filtered_categories, category ]
    };
}

const ProductSparePartsFunctions = {
    [ProductSparePartsActions.ADD_SPARE_PART]: AddPart,
    [ProductSparePartsActions.UPDATE_SPARE_PART]: UpdatePart,
    [ProductSparePartsActions.PATCH_SPARE_PART_PROP]: PatchPart,
    [ProductSparePartsActions.DELETE_SPARE_PART]: DeletePart
};

export default ProductSparePartsFunctions;