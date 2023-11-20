import ProductSparePartsActions from '../../actions/actionConstants/Products/SparePartsActionConstants';
import reducerUtilities from '../reducerUtilities';

function AddPart(state, payload, product_type) {
    const { product_id, category_id, diagram_id, part_from } = payload;
    const { object: category, filtered_array: filtered_categories } = reducerUtilities.destructorArray(state.categories, category_id);
    const { object: product, filtered_array: filtered_products } = reducerUtilities.destructorArray(category[product_type], product_id, "ProductId");
    const { object: diagram, filtered_array: filtered_diagrams } = reducerUtilities.destructorArray(product.Product.ProductDiagramsLists, diagram_id, "ProductPartsDiagramId");
    const new_part = {
        id: 'temp-part',
        ...part_from
    };
    diagram.ProductPartsDiagram.SpareParts = [...diagram?.ProductPartsDiagram?.SpareParts, new_part];
    product.Product.ProductDiagramsLists = [...filtered_diagrams, diagram];
    category[product_type] = [...filtered_products, product];
    return {
        ...state,
        categories: [...filtered_categories, category]
    };
}

function UpdatePart(state, payload, product_type) {
    const { product_id, category_id, diagram_id, new_part } = payload;
    const { object: category, filtered_array: filtered_categories } = reducerUtilities.destructorArray(state.categories, category_id);
    const { object: product, filtered_array: filtered_products } = reducerUtilities.destructorArray(category[product_type], product_id, "ProductId");
    const { object: diagram, filtered_array: filtered_diagrams } = reducerUtilities.destructorArray(product.Product.ProductDiagramsLists, diagram_id, "ProductPartsDiagramId");
    const { filtered_array: filtered_spare_parts } = reducerUtilities.destructorArray(diagram?.ProductPartsDiagram?.SpareParts, "temp-part");
    diagram.ProductPartsDiagram.SpareParts = new_part?.id ? [...filtered_spare_parts, new_part] : [...filtered_spare_parts];
    product.Product.ProductDiagramsLists = [...filtered_diagrams, diagram];
    category[product_type] = [...filtered_products, product];
    return {
        ...state,
        categories: [...filtered_categories, category]
    };
}

function PatchPart(state, payload, product_type) {
    const { product_id, category_id, diagram_id, part_id, field_name, value, newDiagramId } = payload;
    const { object: category, filtered_array: filtered_categories } = reducerUtilities.destructorArray(state.categories, category_id);
    const { object: product, filtered_array: filtered_products } = reducerUtilities.destructorArray(category[product_type], product_id, "ProductId");
    const { object: diagram, filtered_array: filtered_diagrams } = reducerUtilities.destructorArray(product.Product.ProductDiagramsLists, diagram_id, "ProductPartsDiagramId");
    const { object: part, filtered_array: filtered_spare_parts } = reducerUtilities.destructorArray(diagram?.ProductPartsDiagram?.SpareParts, part_id);
    if (field_name === 'Diagram') {
        diagram.ProductPartsDiagram.SpareParts = [...filtered_spare_parts];
        const { object: newDiagram, filtered_array: filteredDiagrams } = reducerUtilities.destructorArray(product.Product.ProductDiagramsLists, newDiagramId, "ProductPartsDiagramId");
        const { filtered_array: newDiagramFilteredSpareParts } = reducerUtilities.destructorArray(newDiagram?.ProductPartsDiagram?.SpareParts, part_id);
        const diagramsWithoutNewDiagram = filteredDiagrams.filter(diagram => diagram.id !== newDiagram.id)
        newDiagram.ProductPartsDiagram.SpareParts = [...newDiagramFilteredSpareParts, part];
        product.Product.ProductDiagramsLists = [...diagramsWithoutNewDiagram, newDiagram];
    } else {        
        product.Product.ProductDiagramsLists = [...filtered_diagrams, diagram];
    }    
    part[field_name] = value;
    category[product_type] = [...filtered_products, product];
    return {
        ...state,
        categories: [...filtered_categories, category]
    };
}

function DeletePart(state, payload, product_type) {
    const { product_id, category_id, diagram_id, part_id } = payload;
    const { object: category, filtered_array: filtered_categories } = reducerUtilities.destructorArray(state.categories, category_id);
    const { object: product, filtered_array: filtered_products } = reducerUtilities.destructorArray(category[product_type], product_id, "ProductId");
    const { object: diagram, filtered_array: filtered_diagrams } = reducerUtilities.destructorArray(product.Product.ProductDiagramsLists, diagram_id, "ProductPartsDiagramId");
    const { filtered_array: filtered_spare_parts } = reducerUtilities.destructorArray(diagram?.ProductPartsDiagram?.SpareParts, part_id);
    diagram.ProductPartsDiagram.SpareParts = [...filtered_spare_parts];
    product.Product.ProductDiagramsLists = [...filtered_diagrams, diagram];
    category[product_type] = [...filtered_products, product];
    return {
        ...state,
        categories: [...filtered_categories, category]
    };
}

const ProductSparePartsFunctions = {
    [ProductSparePartsActions.ADD_SPARE_PART]: AddPart,
    [ProductSparePartsActions.UPDATE_SPARE_PART]: UpdatePart,
    [ProductSparePartsActions.PATCH_SPARE_PART_PROP]: PatchPart,
    [ProductSparePartsActions.DELETE_SPARE_PART]: DeletePart
};

export default ProductSparePartsFunctions;