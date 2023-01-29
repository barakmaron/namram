import ProductDiagramActions from '../../actions/actionConstants/Products/DiagramActionConstants';
import reducerUtilities from '../reducerUtilities';

function AddDiagram(state, payload, product_type) {
    const { product_id, category_id, diagram_form, temp_image_url } = payload;            
    const { object: category, filtered_array: filtered_categories } = reducerUtilities.destructorArray(state.categories, category_id);
    const { object: product, filtered_array: filtered_products } = reducerUtilities.destructorArray(category[product_type], product_id, "ProductId");
    const parsed_diagram_form = Object.fromEntries(diagram_form);
    const diagram = {
        id: "temp-diagram",
        ProductPartsDiagram: {
            id: "temp-diagram",
            ModelName: parsed_diagram_form.model_name,
            Image: temp_image_url[0]
        }
    };
    product.Product.ProductDiagramsLists = [ ...product.Product?.ProductDiagramsLists, diagram ];
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
    const { filtered_array: filtered_diagrams } = reducerUtilities.destructorArray(product.Product.ProductDiagramsLists, "temp-diagram");
    product.Product.ProductDiagramsLists = diagram.id ? [ ...filtered_diagrams, diagram ] : [ ...filtered_diagrams ];
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
    const { object: diagram, filtered_array: filtered_diagrams } = reducerUtilities.destructorArray(product.Product.ProductDiagramsLists, diagram_id, "ProductPartsDiagramId");
    diagram.ProductPartsDiagram.ModelName = value;
    product.Product.ProductDiagramsLists = [ ...filtered_diagrams, diagram ];
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
    const { filtered_array: filtered_diagrams } = reducerUtilities.destructorArray(product.Product.ProductDiagramsLists, diagram_id, "ProductPartsDiagramId");
    product.Product.ProductDiagramsLists = [ ...filtered_diagrams ];
    category[product_type] = [ ...filtered_products, product ];
    return { 
        ...state, 
        categories: [ ...filtered_categories, category ]
    };
}

function GetDiagrams(state, payload) {
    return {
        ...state,
        diagrams: payload
    };
}

const ProductDiagramFunctions = {
    [ProductDiagramActions.ADD_DIAGRAM]: AddDiagram,
    [ProductDiagramActions.UPDATE_DIAGRAM]: UpdateDiagram,
    [ProductDiagramActions.PATCH_DIAGRAM]: PatchDiagram,
    [ProductDiagramActions.DELETE_DIAGRAM]: DeleteDiagram,
    [ProductDiagramActions.GET_DIAGRAMS]: GetDiagrams
};

export default ProductDiagramFunctions;