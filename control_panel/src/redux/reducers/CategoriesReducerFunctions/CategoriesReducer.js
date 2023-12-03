import categoriesAction from '../../actions/actionConstants/Categories/CategoriesActionConstants';
import reducerUtilities from '../reducerUtilities';


function GetCategory(state, payload) {
    return {
        ...state,
        categories: payload
    };
}

function AddCategory(state, payload) {
    return {
        ...state,
        categories: [ ...state.categories, {
            ...payload, 
            SaleProducts: []
        }]
    };
}

function DeleteCategory(state, payload) {
    const { filtered_array: filtered_categories } = reducerUtilities.destructorArray(state.categories, payload.id);
    return { 
        ...state, 
        categories: [ ...filtered_categories ]
    };
}

function UpdateCategory(state, payload) {
    const { filtered_array: filtered_categories } = reducerUtilities.destructorArray(state.categories);
    return {
        ...state,
        categories: payload.category ? [ ...filtered_categories, payload.category ] : [ ...filtered_categories ]
    };
}

function EditCategory(state, payload) {
    const { object: category, filtered_array: filtered_categories } = reducerUtilities.destructorArray(state.categories, payload.id);
    category.Name = payload.name;
    return { 
        ...state, 
        categories: [ ...filtered_categories, category ]
    };
}


const CategoriesFunctions = {
    [categoriesAction.GET_CATEGORY]: GetCategory,
    [categoriesAction.ADD_CATEGORY]: AddCategory,
    [categoriesAction.DELETE_CATEGORY]: DeleteCategory,
    [categoriesAction.UPDATE_CATEGORY]: UpdateCategory,
    [categoriesAction.EDIT_CATEGORY]: EditCategory
};

export default CategoriesFunctions;