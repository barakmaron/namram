import ACTIONS from "../../actions/actionConstants/Products/ScheduledServiceConstants";
import reducerUtilities from "../reducerUtilities";

function AddService(state, payload) {
    const { category_id, product_id, form } = payload;
    const { object: category, filtered_array: filtered_categories } = reducerUtilities.destructorArray(state.categories, category_id);
    const { object: product, filtered_array: filtered_products } = reducerUtilities.destructorArray(category.RentProducts, product_id);
    product.ScheduledServices = [ ...product.ScheduledServices, form ];
    const products_arr = [ product, ...filtered_products ];
    category.RentProducts = products_arr;
    return { 
        ...state, 
        categories: [ ...filtered_categories, category ]
    };
}

function UpdateService(state, payload) {
    const { category_id, product_id, service } = payload;
    const { object: category, filtered_array: filtered_categories } = reducerUtilities.destructorArray(state.categories, category_id);
    const { object: product, filtered_array: filtered_products } = reducerUtilities.destructorArray(category.RentProducts, product_id);
    const { filtered_array: filtered_services } = reducerUtilities.destructorArray(product.ScheduledServices);
    product.ScheduledServices = service?.id ? [ ...filtered_services, service ] : [ ...filtered_services ];
    const products_arr = [ product, ...filtered_products ];
    category.RentProducts = products_arr;
    return { 
        ...state, 
        categories: [ ...filtered_categories, category ]
    };
}

function PatchService(state, payload) {
    const { service_id, category_id, product_id, param, value } = payload;
    const { object: category, filtered_array: filtered_categories } = reducerUtilities.destructorArray(state.categories, category_id);
    const { object: product, filtered_array: filtered_products } = reducerUtilities.destructorArray(category.RentProducts, product_id);
    const { object: service, filtered_array: filtered_services } = reducerUtilities.destructorArray(product.ScheduledServices, service_id);
    service[param] = value;
    product.ScheduledServices = [ ...filtered_services, service ];
    const products_arr = [ product, ...filtered_products ];
    category.RentProducts = products_arr;
    return { 
        ...state, 
        categories: [ ...filtered_categories, category ]
    };
}

function DeleteService(state, payload) {
    const { service_id, category_id, product_id } = payload;
    const { object: category, filtered_array: filtered_categories } = reducerUtilities.destructorArray(state.categories, category_id);
    const { object: product, filtered_array: filtered_products } = reducerUtilities.destructorArray(category.RentProducts, product_id);
    const { filtered_array: filtered_services } = reducerUtilities.destructorArray(product.ScheduledServices, service_id);
    product.ScheduledServices = [ ...filtered_services ];
    const products_arr = [ product, ...filtered_products ];
    category.RentProducts = products_arr;
    return { 
        ...state, 
        categories: [ ...filtered_categories, category ]
    };
}

const ProductScheduledServiceReducerFunctions = {
    [ACTIONS.ADD_SCHEDULED_SERVICE]: AddService,
    [ACTIONS.UPDATE_SCHEDULED_SERVICE]: UpdateService,
    [ACTIONS.PATCH_SCHEDULED_SERVICE]: PatchService,
    [ACTIONS.DELETE_SCHEDULED_SERVICE]: DeleteService
};

export default ProductScheduledServiceReducerFunctions;