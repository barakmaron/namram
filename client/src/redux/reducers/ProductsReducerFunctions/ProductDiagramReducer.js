import ProductDiagramActions from '../../actions/actionConstants/Products/DiagramActionConstants';
import reducerUtilities from '../reducerUtilities';

function AddDiagram(state, payload, product_type) {
    const { product_id, category_id, diagram_form, temp_image_url } = payload;            
    const { object: category, filtered_array: filtered_categories } = reducerUtilities.destructorArray(state.categories, category_id);
    const { object: product, filtered_array: filtered_products } = reducerUtilities.destructorArray(category[product_type], product_id, "ProductId");
    const parsed_diagram_form = Object.fromEntries(diagram_form);
    const diagram = {
        id: "temp-diagram",
        ModelName: parsed_diagram_form.model_name,
        Image: temp_image_url[0]
    };
    product.Product.ProductPartsDiagrams = [ ...product.Product?.ProductPartsDiagrams, diagram ];
    category[product_type] = [ ...filtered_products, product ];
    return { 
        ...state, 
        categories: [ ...filtered_categories, category ]
    };
}

function UpdateDiagram(state, payload, product_type) {
    const { product_id, category_id, diagram } = payload;
    const { object: category, filtered_array: filtered_categories } = reducerUtilities.destructorArray(state.categories, category_id);
    const { object: product, filtered_array: filtered_products } = reducerUtilities.destructorArray(category[product_type], product_id, "ProductId");
    const { filtered_array: filtered_diagrams } = reducerUtilities.destructorArray(product.Product.ProductPartsDiagrams, "temp-diagram");
    product.Product.ProductPartsDiagrams = diagram.id ? [ ...filtered_diagrams, diagram ] : [ ...filtered_diagrams ];
    category[product_type] = [ ...filtered_products, product ];
    return { 
        ...state, 
        categories: [ ...filtered_categories, category ]
    };
}

function PatchDiagram(state, payload, product_type) {
    const { product_id, category_id, diagram_id, value } = payload;
    const { object: category, filtered_array: filtered_categories } = reducerUtilities.destructorArray(state.categories, category_id);
    const { object: product, filtered_array: filtered_products } = reducerUtilities.destructorArray(category[product_type], product_id, "ProductId");
    const { object: diagram, filtered_array: filtered_diagrams } = reducerUtilities.destructorArray(product.Product.ProductPartsDiagrams, diagram_id);
    diagram.ModelName = value;
    product.Product.ProductPartsDiagrams = [ ...filtered_diagrams, diagram ];
    category[product_type] = [ ...filtered_products, product ];
    return { 
        ...state, 
        categories: [ ...filtered_categories, category ]
    };
}

function DeleteDiagram(state, payload, product_type) {
    const { product_id, category_id, diagram_id } = payload;
    const { object: category, filtered_array: filtered_categories } = reducerUtilities.destructorArray(state.categories, category_id);
    const { object: product, filtered_array: filtered_products } = reducerUtilities.destructorArray(category[product_type], product_id, "ProductId");
    const { filtered_array: filtered_diagrams } = reducerUtilities.destructorArray(product.Product.ProductPartsDiagrams, diagram_id);
    product.Product.ProductPartsDiagrams = [ ...filtered_diagrams ];
    category[product_type] = [ ...filtered_products, product ];
    return { 
        ...state, 
        categories: [ ...filtered_categories, category ]
    };
}

const ProductDiagramFunctions = {
    [ProductDiagramActions.ADD_DIAGRAM]: AddDiagram,
    [ProductDiagramActions.UPDATE_DIAGRAM]: UpdateDiagram,
    [ProductDiagramActions.PATCH_DIAGRAM]: PatchDiagram,
    [ProductDiagramActions.DELETE_DIAGRAM]: DeleteDiagram
};

export default ProductDiagramFunctions;